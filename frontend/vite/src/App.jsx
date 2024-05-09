import React, { useState, useEffect } from 'react';
import './App.css';
import QuestionForm from './QuestionForm';
import AnswerTable from './AnswerTable';

function App() {
  const [questions, setQuestions] = useState(null);
  const [postQuestion, setPostQuestion] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch('/api/question/all');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        setQuestions(data);
        console.log('Fetched questions:', data);
      } catch (error) {
        console.error(error.message);
      }
    }

    if (!questions) {
      fetchQuestions();
    }
  }, [questions]);


  async function handleDeleteQuestion(id) {
    try {
    
  
      const deleteResponse = await fetch(`/api/question/${id}`, {
        method: 'DELETE',
      });
      if (!deleteResponse.ok) {
        throw new Error('Failed to delete question.');
      }
  
      const updatedQuestions = questions.filter((question) => question.id !== id);
      setQuestions(updatedQuestions);
    } catch (error) {
      console.error('Error deleting question:', error.message);
    }
  }
  
  

  const handlePostQuestionSuccess = () => {
    setPostQuestion(false);
  };

  const handleCloseAnswerTable = () => {
    setSelectedQuestionId(null); // Bezárjuk az AnswerTable-t
  };



  return (
    <div className="app">
      <h1>QuestionHub</h1>

      {postQuestion ? (
        <QuestionForm onPostSuccess={handlePostQuestionSuccess} />
      ) : (
        <div>
          <button onClick={() => setPostQuestion(true)}>Post new question</button>

          {questions ? (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question) => (
                  <tr key={question.id}>
                    <td>{question.title}</td>
                    <td>{question.description}</td>
                    <td>
                      <button onClick={() => setSelectedQuestionId(question.id)}>See answers</button>
                      <button onClick={() => handleDeleteQuestion(question.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Loading questions...</p>
          )}
        </div>
      )}

{selectedQuestionId && (
  <AnswerTable questionId={selectedQuestionId} onPostSuccess={handlePostQuestionSuccess} onClose={handleCloseAnswerTable} />)}
    </div>
  );
}

export default App;
