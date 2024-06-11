import React, { useState } from 'react';
import { Typography, Container, TextField, Box, Button, Grid, Modal, Paper } from '@mui/material';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';
import './App.css';

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setAllTodos] = useState(JSON.parse(localStorage.getItem('todolist')) || []);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [completedTodos, setCompletedTodos] = useState(JSON.parse(localStorage.getItem('completedTodos')) || []);
  const [currentEdit, setCurrentEdit] = useState('');
  const [currentEditedItem, setCurrentEditedItem] = useState({ title: '', description: '' });
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const handleAddTodo = () => {
    if (!newTitle || !newDescription) {
      alert('Please provide both title and description.');
      return;
    }

    const newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    setAllTodos(prevTodos => {
      const updatedTodoArr = [...prevTodos, newTodoItem];
      localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));
      return updatedTodoArr;
    });

    setNewTitle('');
    setNewDescription('');
  };

  const handleDeleteTodo = index => {
    setCurrentEdit(index);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmed = () => {
    const reducedTodo = [...allTodos];
    reducedTodo.splice(currentEdit, 1);
    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setAllTodos(reducedTodo);
    setCurrentEdit('');
    setDeleteConfirmationOpen(false);
  };

  const handleComplete = index => {
    const now = new Date();
    const completedOn = now.toLocaleString();

    const filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    setCompletedTodos(prevCompletedTodos => {
      const updatedCompletedArr = [...prevCompletedTodos, filteredItem];
      localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedArr));
      return updatedCompletedArr;
    });

    handleDeleteConfirmed();
  };

  const handleEdit = (ind, item) => {
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
  };

  const handleUpdateTitle = value => {
    setCurrentEditedItem(prev => {
      return { ...prev, title: value };
    });
  };

  const handleUpdateDescription = value => {
    setCurrentEditedItem(prev => {
      return { ...prev, description: value };
    });
  };

  const handleUpdateToDo = () => {
    const newToDo = [...allTodos];
    newToDo[currentEdit] = currentEditedItem;
    setAllTodos(newToDo);
    setCurrentEdit('');
  };

  const handleDeleteCompletedTodo = index => {
    const reducedTodo = [...completedTodos];
    reducedTodo.splice(index, 1);
    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  };

  return (
    <div className="App">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop : '80px',
          bgcolor: '#1f1e1e',
        }}
      >
        <Container maxWidth="lg" sx={{ bgcolor: 'grey', padding: 4, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'black' }}>
            My Todos
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <div className="todo-input">
                <TextField
                  fullWidth
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="What's the task title?"
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'solid grey', // Default border color
                      },
                      '&:hover fieldset': {
                        borderColor: 'black', // Border color when hovering
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'black', // Border color when focused
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'black', // Label color
                    },
                    '& .MuiInputBase-input': {
                      color: 'black', // Text color
                    },
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className="todo-input">
                <TextField
                  fullWidth
                  value={newDescription}
                  onChange={e => setNewDescription(e.target.value)}
                  placeholder="What's the task description?"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'solid grey', // Default border color
                      },
                      '&:hover fieldset': {
                        borderColor: 'black', // Border color when hovering
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'black', // Border color when focused
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'black', // Label color
                    },
                    '& .MuiInputBase-input': {
                      color: 'black', // Text color
                    },
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: 'green', color: 'black', '&:hover': {
                    bgcolor: 'darkgreen', // Change this to the desired hover color
                  },
                }}
                onClick={handleAddTodo}
              >
                Add
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: 'green', color: 'black', '&:hover': {
                    bgcolor: 'darkgreen', // Change this to the desired hover color
                  },
                  marginLeft: 2,
                }}
                onClick={() => setIsCompleteScreen(!isCompleteScreen)}
              >
                {isCompleteScreen ? 'Show All Todos' : 'Show Completed Todos'}
              </Button>
            </Grid>
          </Grid><br/>

          {/* Todo list */}
          <div className="todo-list">
            {isCompleteScreen === false &&
              allTodos.map((item, index) => {
                if (currentEdit === index) {
                  return (
                    <div className="edit__wrapper" key={index}>
                      <input
                        placeholder="Updated Title"
                        onChange={e => handleUpdateTitle(e.target.value)}
                        value={currentEditedItem.title}
                      />
                      <textarea
                        placeholder="Updated Description"
                        rows={4}
                        onChange={e => handleUpdateDescription(e.target.value)}
                        value={currentEditedItem.description}
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpdateToDo}
                      >
                        Update
                      </Button>
                    </div>
                  );
                } else {
                  return (
                    <div className="todo-list-item" key={index}>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                      </div>

                      <div>
                        <AiOutlineDelete
                          className="icon"
                          onClick={() => handleDeleteTodo(index)}
                          title="Delete?"
                        />
                        <BsCheckLg
                          className="check-icon"
                          onClick={() => handleComplete(index)}
                          title="Complete?"
                        />
                        <AiOutlineEdit
                          className="check-icon"
                          onClick={() => handleEdit(index, item)}
                          title="Edit?"
                        />
                      </div>
                    </div>
                  );
                }
              })}

            {isCompleteScreen === true &&
              completedTodos.map((item, index) => {
                return (
                  <div className="todo-list-item" key={index}>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <p>
                        <small>Completed on: {item.completedOn}</small>
                      </p>
                    </div>

                    <div>
                      <AiOutlineDelete
                        className="icon"
                        onClick={() => handleDeleteCompletedTodo(index)}
                        title="Delete?"
                      />
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Delete confirmation modal */}
          <Modal
            open={deleteConfirmationOpen}
            onClose={() => setDeleteConfirmationOpen(false)}
          >
            <Container maxWidth="sm">
              <Paper elevation={3} style={{ padding: '2rem' }}>
                <Typography variant="h6" gutterBottom>
                  Are you sure you want to delete this todo?
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleDeleteConfirmed}
                >
                  Delete
                </Button>
              </Paper>
            </Container>
          </Modal>
        </Container>
      </Box>
    </div>
  );
}

export default App;
