import React, { useState, useEffect } from 'react';
import Todo from '../todo/Todo';
import NewTodoForm from '../newTodoForm/NewTodoForm';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './TodoList.css';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
  },
  media: {
    flex: 1,
    paddingTop: '10%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  TodoList: {
    background: 'rgb(240, 240, 240)',
    border: 'none',
  },
  completed: {
    background: '#b2dbd5',
    border: 'none',
  },
  TodoItem: {
    marginTop: '2.6rem',
    listStyle: 'none',
  },
}));

const TodoList = (props) => {
  //console.log('Receving the first PROPS >>>>>>', { props });
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [todo, setTodo] = useState({
    items: props.items,
  });
  const [completion, setCompletion] = useState({
    completed: props.completed,
  });

  useEffect(() => {
    const _id = props._id;
    props.update(_id, todo, completion);
  }, [todo, completion]);

  const create = (newTodo) => {
    setTodo({ items: [...todo.items, newTodo] });
    setCompletion({ completed: false });
  };

  const update = (id, updatedTask) => {
    const updatedTodos = todo.items.map((todo) => {
      if (todo._id === id) {
        return { ...todo, name: updatedTask };
      }
      return todo;
    });
    setTodo({ items: updatedTodos });
  };

  const remove = (id) => {
    setTodo({ items: todo.items.filter((el) => el._id !== id) });
    //console.log({ ITEMS: todo.items });
    let counter = 0;
    const arrLength = todo.items.length - 1;
    //console.log('Inside Remove');
    //console.log({ counter }, { arrLength });
    todo.items.map((todo) => {
      if (todo.checked) counter++;
      //console.log('Inside MAP ARR');
      //console.log(todo);
      //console.log({ counter }, { arrLength });
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
      if (todo._id === id) {
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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const todos = todo.items.map((todo) => {
    return (
      <Todo
        key={todo._id}
        _id={todo._id}
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
    <>
      <Card
        variant="outlined"
        className={
          completion.completed
            ? classes.TodoList && classes.completed
            : classes.TodoList
        }
      >
        <CardMedia
          className={classes.media}
          image={`https://source.unsplash.com/800x600/?${props.title}`}
          title={props.title}
        />
        <CardHeader
          title={props.title}
          subheader={props.type}
          action={
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          }
        />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <ul className={classes.TodoItem}>{todos}</ul>
            <NewTodoForm createTodo={create} />
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
};

export default TodoList;
