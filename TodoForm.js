import React, { useState } from 'react';

const TodoForm = ({ addTask }) => {
  const [task, setTask] = useState(null);
  const [taskType, setTaskType] = useState('');

  const generateTask = () => {
    const taskOptions = [
      { type: 'math', question: generateMathTask() },
      { type: 'fillWord', question: generateWordTask() }
    ];

    const randomTask = taskOptions[Math.floor(Math.random() * taskOptions.length)];
    setTask(randomTask);
    setTaskType(randomTask.type);
    addTask(randomTask);  // Add task to the list
  };

  const generateMathTask = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    return `What is ${num1} + ${num2}?`;  // Example of a math problem
  };

  const generateWordTask = () => {
    return "Fill in the blank: The sky is _____.";  // Example word task
  };

  return (
    <div>
      <h3>Current Task: {task ? task.question : "No task yet"}</h3>
      <button onClick={generateTask}>Get New Task</button>
    </div>
  );
};

export default TodoForm;
