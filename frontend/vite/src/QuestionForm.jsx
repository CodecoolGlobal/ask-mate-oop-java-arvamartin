import React, { useState } from "react";

function QuestionForm({ onPostSuccess }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function handlePost(event) {
    event.preventDefault();

    const formData = { title, description };
    const response = await fetch('/api/question/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const responseData = await response.json();
    console.log(responseData);

    if (response.ok) {
      onPostSuccess(); // Hívjuk az onPostSuccess callbacket az új kérdés postolása után
    }
  }

  return (
    <div>
      <form onSubmit={handlePost}>
        <label>Your question:</label>
        <input placeholder="Question" onChange={(event) => setTitle(event.target.value)} />
        <input placeholder="Description" onChange={(event) => setDescription(event.target.value)} />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default QuestionForm;
