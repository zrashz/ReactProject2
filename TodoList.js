import React, { useState } from 'react';

const TodoList = ({ tasks, completeTask }) => {
  const [userAnswers, setUserAnswers] = useState({});

  const handleInputChange = (e, index) => {
    setUserAnswers({ ...userAnswers, [index]: e.target.value });
  };

  const handleSubmitAnswer = (index, task) => {
    let isCorrect = false;
    if (task.type === 'math') {
      const [num1, num2] = task.question.match(/\d+/g).map(Number);  // Extract numbers
      isCorrect = parseInt(userAnswers[index]) === num1 + num2;
    } else if (task.type === 'fillWord') {
      isCorrect = userAnswers[index].toLowerCase() === 'blue';  // Correct answer for word task
    }

    completeTask(index, isCorrect);  // Pass whether the answer was correct
  };

  return (
    <ul>
      {tasks.map((task, index) => (
        <li key={index}>
          {task.question} - Time Left: {task.timeLeft} seconds
          <input
            type="text"
            onChange={(e) => handleInputChange(e, index)}
            placeholder="Your answer"
          />
          <button onClick={() => handleSubmitAnswer(index, task)}>Submit Answer</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
