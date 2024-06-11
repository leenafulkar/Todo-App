import React from 'react';
import { IconButton, Box, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

export const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" p={2} border={1} borderRadius={4} mb={2}>
      <Typography
        variant="body1"
        className={`${task.completed ? "completed" : "incompleted"}`}
        onClick={() => toggleComplete(task.id)}
        style={{ textDecoration: task.completed ? 'line-through' : 'none', cursor: 'pointer' }}
      >
        {task.task}
      </Typography>
      <Box>
        <IconButton onClick={() => editTodo(task.id)} aria-label="edit">
          <FontAwesomeIcon icon={faPenToSquare} />
        </IconButton>
        <IconButton onClick={() => deleteTodo(task.id)} aria-label="delete">
          <FontAwesomeIcon icon={faTrash} />
        </IconButton>
      </Box>
    </Box>
  );
};
