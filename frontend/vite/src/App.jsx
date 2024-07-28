import React, { useState, useEffect } from 'react';
import './App.css';
import QuestionForm from './form/QuestionForm';
import AnswerTable from './tables/AnswerTable';
import QuestionTable from './tables/QuestionTable';

function App() {
  const [questions, setQuestions] = useState(null);
  const [postQuestion, setPostQuestion] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [showNewUserForm, setShowNewUserForm] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [selectedQuestionTitle, setSelectedQuestionTitle] = useState(null);
  const [newUserCreated, setNewUserCreated] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

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

  async function handleCreateUser() {
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
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create user.');
      }

      setNewUserName('');
      setShowNewUserForm(false);
      setNewUserCreated(true); 
      console.log('User created successfully.');
    } catch (error) {
      console.error('Error creating user:', error.message);
    }
  }

  function handlePostQuestionSuccess() {
    setPostQuestion(false);
    fetchQuestions();
  }

  function handleCloseAnswerTable() {
    setSelectedQuestionId(null);
  }

  function handleSeeQuestions(id, title) {
    setSelectedQuestionId(id);
    setSelectedQuestionTitle(title);
  }

  function handleNewUserButtonClick() {
    setShowNewUserForm(true);
  }

  function handleNewUserNameChange(event) {
    setNewUserName(event.target.value);
  }

  return (
    <div className="app">
      <h1>QuestionHub</h1>

      {postQuestion ? (
        <QuestionForm onPostSuccess={handlePostQuestionSuccess} />
      ) : (
        <div>
          {newUserCreated ? (
            <button onClick={() => setPostQuestion(true)}>Post new question</button>
          ) : (
            <button onClick={handleNewUserButtonClick}>{newUserName ? newUserName : 'New User'}</button>
          )}

          {showNewUserForm && (
            <div>
              <input type="text" value={newUserName} onChange={handleNewUserNameChange} />
              <button onClick={handleCreateUser}>Create</button>
            </div>
          )}

          {questions ? (
            <QuestionTable
              questions={questions}
              onDeleteQuestion={handleDeleteQuestion}
              onSeeAnswers={handleSeeQuestions}
            />
          ) : (
            <p>Loading questions...</p>
          )}
        </div>
      )}

      {selectedQuestionId && (
        <AnswerTable
          questionId={selectedQuestionId}
          questionTitle={selectedQuestionTitle}
          onClose={handleCloseAnswerTable}
        />
      )}
    </div>
  );
}

export default App;