import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Header from '../Header/Header';

import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  list__container: {
    textAlign: 'center',
    margin: '4%',
  },
  list__title: {
    color: 'black',
    paddingBottom: 20
  },
  list__search: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 30
  },
  list__button: {
    height: '55px'
  }
}));

const MyList = () => {
  const [loading, setLoading] = useState(false);
  const [lists, setLists] = useState([]);
  const [task, setTask] = useState("");
  const classes = useStyles();

  useEffect(() => {
    getDatas();
  }, []);

  const getDatas = async () => {
    const token = await localStorage.getItem('token');
    setLoading(true);
    axios({
      method: 'GET',
      url: 'https://api-nodejs-todolist.herokuapp.com/task',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    }).then(res => {
      setLists(res.data.data);
      setLoading(false);
    }).catch(err => {
      console.log(err);
      setLoading(false);
    });
  };

  const submitTask = async (e) => {
    e.preventDefault();
    const token = await localStorage.getItem('token');
    setLoading(true);
    axios({
      method: 'POST',
      url: 'https://api-nodejs-todolist.herokuapp.com/task',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: task,
    }).then(res => {
      setLoading(false);
      if (res.data.success) {
        getDatas();
      }
    }).catch(err => {
      console.log(err);
      setLoading(false);
    });
  }

  const deleteTask = async (idTask) => {
    const token = await localStorage.getItem('token');
    setLoading(true);
    axios({
      method: 'DELETE',
      url: `https://api-nodejs-todolist.herokuapp.com/task/${idTask}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    }).then(res => {
      setLoading(false);
      if (res.data.success) {
        getDatas();
      }
    }).catch(err => {
      console.log(err);
      setLoading(false);
    });
  }

  return (
    <Box>

      <Header />

      <Box className={classes.list__container}>

        <Typography variant="h6" className={classes.list__title}>
          ADD A TASK
        </Typography>

        <Box className={classes.list__search}>
          <form onSubmit={submitTask}>
            <TextField
              className={classes.list__input}
              label="Add your task"
              name='description'
              id='description'
              type='text'
              required={false}
              variant="outlined"
              onChange={(e) => setTask({ ...task, description: e.target.value })}
            />
            <Button variant="contained" type='submit' className={classes.list__button}>Send</Button>
            {loading ? <CircularProgress /> : null}

          </form>
        </Box>

        {
          lists ?
            lists && lists.map((list) => {
              return (
                <div key={list._id}>
                  <p>{list.description}</p>
                  <button onClick={() => deleteTask(list._id)}>x</button>
                </div>
              )
            })
            : null
        }
      </Box>

    </Box >
  );
}

export default MyList;
