import React, { useState } from 'react';
import Todo from '../todo/Todo';
import NewTodoForm from '../newTodoForm/NewTodoForm';
import { v4 as uuidv4 } from 'uuid';
import './TodoList.css';

const TodoList = (props) => {
  console.log('Receving the first PROPS >>>>>>', { props });
  const [todo, setTodo] = useState({
    items: props.items,
  });
  const [completion, setCompletion] = useState({
    completed: props.completed,
  });

  const create = (newTodo) => {
    setTodo({ items: [...todo.items, newTodo] });
    setCompletion({ completed: false });
  };

  const update = (id, updatedTask) => {
    const updatedTodos = todo.items.map((todo) => {
      if (todo.id === id) {
        return { ...todo, name: updatedTask };
      }
      return todo;
    });
    setTodo({ items: updatedTodos });
  };

  const remove = (id) => {
    setTodo({ items: todo.items.filter((el) => el.id !== id) });
    let counter = 0;
    const arrLength = todo.items.length - 1;
    todo.items.map((todo) => {
      if (todo.checked) counter++;
      if (counter === arrLength) {
        setCompletion({ completed: true });
      } else {
        setCompletion({ completed: false });
      }
      return todo;
    });
  };

  const toggleCompletion = (id) => {
    let counter = 0;
    const arrLength = todo.items.length;
    const updatedTodos = todo.items.map((todo) => {
      if (todo.id === id) {
        !todo.checked && counter++;
        if (counter === arrLength) {
          if (!completion.completed) setCompletion({ completed: true });
        } else {
          setCompletion({ completed: false });
        }
        return { ...todo, checked: !todo.checked };
      }
      if (todo.checked) counter++;
      if (counter === arrLength) {
        if (!completion.completed) setCompletion({ completed: true });
      } else {
        setCompletion({ completed: false });
      }
      return todo;
    });
    setTodo({ items: updatedTodos });
  };

  const todos = todo.items.map((todo) => {
    return (
      <Todo
        key={todo.id}
        id={todo.id}
        name={todo.name}
        quantity={todo.quantity}
        checked={todo.checked}
        removeTodo={(id) => remove(id)}
        updateTodo={update}
        toggleTodo={toggleCompletion}
      />
    );
  });
  return (
    <div className={completion.completed ? 'TodoList completed' : 'TodoList'}>
      <h1>
        {props.title}
        <span>{props.type}</span>
      </h1>

      <ul>{todos}</ul>
      <NewTodoForm createTodo={create} />
    </div>
  );
};

export default TodoList;
