import { useEffect, useState } from 'react'
import './App.css'
import Questionform from './QuestionForm';

function App() {

  const [questions, setQuestions] = useState(null);
  const [post, setPost] = useState(false);


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


  async function handleDelete(id){
    await fetch(`/api/question/${id}`,{
      method: 'DELETE',
    })
    const updatedQuestions = questions.filter((question) => question.id !== id);
    setQuestions(updatedQuestions);
  }


  const handlePostSuccess = () => {
    setPost(false);
};

return (
    <div>
      <h1>QuestionHub</h1>
        {post ? (
            <Questionform onPostSuccess={handlePostSuccess} />
      ) : (
        <div>
          <button onClick={() => setPost(true)}>Post new question</button>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {questions?.map((question) => (
                <tr key={question.id}>
                  <td>{question.title}</td>
                  <td>{question.description}</td>
                  <td>
                    <button>See answers</button>
                    <button onClick={()=> handleDelete(question.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App
