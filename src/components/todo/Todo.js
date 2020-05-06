import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import './Todo.css';

const Todo = (props) => {
  const [editing, setEditing] = useState({ isEditing: false });
  const [task, setTask] = useState({ name: props.name });
  const handleRemove = () => {
    props.removeTodo(props._id);
  };
  const toggleForm = () => {
    setEditing({ isEditing: !editing.isEditing });
  };
  const handleUpdate = (evt) => {
    evt.preventDefault();
    // take new task data and pass up to parent
    //console.log('Inside Handle Update', task.name);
    props.updateTodo(props._id, task.name);
    setEditing({ isEditing: false });
  };
  const handleChange = (evt) => {
    setTask({
      [evt.target.name]: evt.target.value,
    });
  };
  const handleToggle = (evt) => {
    props.toggleTodo(props._id);
  };
  let result;
  if (editing.isEditing) {
    result = (
      <div className="Todo">
        <form className="Todo-edit-form" onSubmit={handleUpdate}>
          <input
            type="text"
            value={task.name}
            name="name"
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<FontAwesomeIcon icon={faSave} />}
          >
            Save
          </Button>
        </form>
      </div>
    );
  } else {
    result = (
      <div className="Todo">
        <li className={props.checked ? 'Todo-task' : ''} onClick={handleToggle}>
          {props.name}
        </li>
        <div className="Todo-buttons">
          <button onClick={toggleForm}>
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button onClick={handleRemove}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    );
  }

  return <>{result}</>;
};

export default Todo;
