import React from 'react';

function QuestionTable({ questions, onDeleteQuestion, onSeeAnswers }) {
  return (
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
              <button onClick={() => onSeeAnswers(question.id, question.title)}>See answers</button>
              <button onClick={() => onDeleteQuestion(question.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default QuestionTable;
