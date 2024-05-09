import React, { useState, useEffect } from 'react';
import './App.css';
import QuestionForm from './QuestionForm';
import AnswerTable from './AnswerTable';

function App() {
  const [questions, setQuestions] = useState(null);
  const [postQuestion, setPostQuestion] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [showNewUserForm, setShowNewUserForm] = useState(false);
  const [newUserName, setNewUserName] = useState('');

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
      // Válaszok lekérése a kérdéshez
      const response = await fetch(`/api/answer/all/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch answers.');
      }
      const answersData = await response.json();
  
      // Válaszok törlése
      for (const answer of answersData) {
        const deleteAnswerResponse = await fetch(`/api/answer/${answer.id}`, {
          method: 'DELETE',
        });
        if (!deleteAnswerResponse.ok) {
          console.error(`Failed to delete answer with id ${answer.id}.`);
        }
      }
  
      // Kérdés törlése csak a válaszok sikeres törlése után
      const deleteResponse = await fetch(`/api/question/${id}`, {
        method: 'DELETE',
      });
      if (!deleteResponse.ok) {
        throw new Error('Failed to delete question.');
      }
  
      // Kérdések frissítése az állapotban
      const updatedQuestions = questions.filter((question) => question.id !== id);
      setQuestions(updatedQuestions);
    } catch (error) {
      console.error('Error deleting question:', error.message);
    }
  }
  
  const handleCreateUser = async () => {
    try {
      // Make sure the new user name is not empty
      if (!newUserName.trim()) {
        console.error('New user name cannot be empty.');
        return;
      }
  
      // Send a POST request to create a new user
      const response = await fetch('/api/user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newUserName.trim(), // Trim the user name to remove leading and trailing whitespaces
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create user.');
      }
      setNewUserName('');
      setShowNewUserForm(false);
      console.log('User created successfully.');
    } catch (error) {
      console.error('Error creating user:', error.message);
    }
  };
  

  const handlePostQuestionSuccess = () => {
    setPostQuestion(false);
  };

  const handleCloseAnswerTable = () => {
    setSelectedQuestionId(null); // Bezárjuk az AnswerTable-t
  };

  const handleNewUserButtonClick = () => {
    setShowNewUserForm(true); // Show the new user form
  };

  const handleNewUserNameChange = (event) => {
    setNewUserName(event.target.value); // Update the new user name
  };



  return (
    <div className="app">
      <h1>QuestionHub</h1>

      {postQuestion ? (
        <QuestionForm onPostSuccess={handlePostQuestionSuccess} />
      ) : (
        <div>

<button onClick={handleNewUserButtonClick}>New User</button>

{showNewUserForm && (
  <div>
    <input type="text" value={newUserName} onChange={handleNewUserNameChange} />
    <button onClick={handleCreateUser}>Create</button>
  </div>
)}
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
