import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './NewTodoForm.css';

const NewTodoForm = (props) => {
  const [newTask, setTask] = useState({ name: '', _id: '' });
  const handleChange = (evt) => {
    setTask({
      name: evt.target.value,
    });
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (newTask.name !== '')
      props.createTodo({ ...newTask, _id: uuidv4(), checked: false });
    setTask({ name: '' });
  };

  return (
    <form className="NewTodoForm" onSubmit={handleSubmit}>
      <label htmlFor="task">New Item</label>
      <input
        type="text"
        placeholder="New Item"
        id="task"
        name="task"
        value={newTask.name}
        onChange={handleChange}
      />
      <button>Add</button>
    </form>
  );
};

export default NewTodoForm;
