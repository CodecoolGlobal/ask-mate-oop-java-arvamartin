import React, { useState, useEffect } from 'react';
import './App.css';
import QuestionForm from './QuestionForm';
import AnswerTable from './AnswerTable';
import Login from './LogIn';

function App() {
  const [questions, setQuestions] = useState(null);
  const [postQuestion, setPostQuestion] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [showNewUserForm, setShowNewUserForm] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [selectedQuestionTitle, setSelectedQuestionTitle] = useState(null);
  const [newUserCreated, setNewUserCreated] = useState(false);
  const [logInClicked, setLoginClicked] = useState(false);
  const [notLoggedIn, setNotLoggedIn] = useState(true);

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

  useEffect(() => {
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
      setSelectedQuestionId(null);
      setSelectedQuestionTitle(null);
    } catch (error) {
      console.error('Error deleting question:', error.message);
    }
  }

  const handleCreateUser = async () => {
    try {
      if (!newUserName.trim()) {
        console.error('New user name cannot be empty.');
        return;
      }

      const response = await fetch('/api/user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newUserName.trim(),
          password: newUserPassword.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create user.');
      }

      setNewUserName('');
      setShowNewUserForm(false);
      setNewUserCreated(true); // Felhasználó létrehozva
      console.log('User created successfully.');
    } catch (error) {
      console.error('Error creating user:', error.message);
    }
  };

  const handlePostQuestionSuccess = () => {
    setPostQuestion(false);
    // Frissítjük a kérdések állapotát az új kérdés hozzáadása után
    fetchQuestions();
  };

  const handleCloseAnswerTable = () => {
    setSelectedQuestionId(null);
  };

  const handleSeeQuestions = (id, title) => {
    setSelectedQuestionId(id);
    setSelectedQuestionTitle(title);
  };

  const handleNewUserButtonClick = () => {
    setShowNewUserForm(true);
  };

  const handleLoggedIn = () => {
    setNotLoggedIn(false);
  };

  return (
    <div className="app">
      <h1>QuestionHub</h1>
      {notLoggedIn ? (
        <div>
          {logInClicked ? (
            <Login onLogedIn={handleLoggedIn} />
          ) : (
            <>
              <button onClick={handleNewUserButtonClick}>{newUserName ? newUserName : 'New User'}</button>
              <button onClick={() => setLoginClicked(true)}>Log in</button>
            </>
          )}
          {showNewUserForm && (
            <div>
              <input type="text" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} placeholder="Username" />
              <input type="text" value={newUserPassword} onChange={(e) => setNewUserPassword(e.target.value)} placeholder="Password" />
              <button onClick={handleCreateUser}>Create</button>
            </div>
          )}
        </div>
      ) : (
        <>
          {postQuestion ? (
            <QuestionForm onPostSuccess={handlePostQuestionSuccess} />
          ) : (
            <div>
              {newUserCreated ? (
                <button onClick={() => setPostQuestion(true)}>Post new question</button>
              ) : null}

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
                          <button onClick={() => handleSeeQuestions(question.id, question.title)}>See answers</button>
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
        </>
      )}
      {selectedQuestionId && (
        <AnswerTable questionId={selectedQuestionId} questionTitle={selectedQuestionTitle} onClose={handleCloseAnswerTable} />
      )}
    </div>
  );
}

export default App;
