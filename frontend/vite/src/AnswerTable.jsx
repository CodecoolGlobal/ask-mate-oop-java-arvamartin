import React, { useState, useEffect } from 'react';

function AnswerTable({ questionId }) {
  const [answers, setAnswers] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [description, setDescription] = useState('');

  useEffect(() => {
    async function fetchAnswers() {
      try {
        const response = await fetch(`/api/answer/all/${questionId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        setAnswers(data);
        console.log('Fetched answers:', data);
      } catch (error) {
        console.error('Error fetching answers:', error.message);
      }
    }

    if (questionId) {
      fetchAnswers();
    }
  }, [questionId]);

  async function handlePost(event) {
    event.preventDefault();

    const formData = { description, questionId };
    const response = await fetch(`/api/answer/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log('New answer added:', responseData);
      setAnswers([...(answers || []), responseData]); // Új válasz hozzáadása a helyi állapothoz
      setDescription('');
      setShowForm(false);
    } else {
      console.error('Failed to add new answer.');
    }
  }

  return (
    <div>
      <h2>Answers for Question {questionId}</h2>

      {answers ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {answers.map((answer) => (
                <tr key={answer.id}>
                  <td>{answer.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => setShowForm(true)}>Add new Answer</button>
        </div>
      ) : (
        <p>Loading answers...</p>
      )}

      {showForm && (
        <form onSubmit={handlePost}>
          <label>
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default AnswerTable;