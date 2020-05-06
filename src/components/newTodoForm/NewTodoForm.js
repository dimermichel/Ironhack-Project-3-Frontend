import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
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
      props.createTodo({
        ...newTask,
        _id: uuidv4(),
        quantity: 1,
        checked: false,
      });
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
      <Button
        type="submit"
        variant="contained"
        color="primary"
        startIcon={<FontAwesomeIcon icon={faPlus} />}
      >
        Add
      </Button>
    </form>
  );
};

export default NewTodoForm;
