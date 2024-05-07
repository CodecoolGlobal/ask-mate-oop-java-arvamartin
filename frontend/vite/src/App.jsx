import { useEffect, useState } from 'react'

import './App.css'

function App() {

  const [questions, setQuestions] = useState(null);


  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch('/api/question/all');
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        setQuestions(data)
        console.log('Fetched questions:', data);
      } catch (error) {
        console.error(error.message)

      }
    }
    fetchQuestions()
  }, [questions])




  return (
    <div>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {questions?.map((question) => (
          <tr key={question.id}>
            <td>{question.title}</td>
            <td>{question.description}</td>
            <td>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default App
