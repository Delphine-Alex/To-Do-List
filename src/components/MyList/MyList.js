import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Header from '../Header/Header';

import { Box, Button, TextField, Typography } from '@mui/material';
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
  const [lists, setLists] = useState([]);
  const [task, setTask] = useState("");
  const classes = useStyles();

  useEffect(() => {
    const getDatas = async () => {
      const token = await localStorage.getItem('token');
      try {
        const result = await axios({
          method: 'GET',
          url: 'https://api-nodejs-todolist.herokuapp.com/task',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        });
        setLists(result.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDatas();
  }, []);

  const submitTask = async (e) => {
    e.preventDefault();
    const token = await localStorage.getItem('token');

    console.log('task', task);

    try {
      await axios({
        method: 'POST',
        url: 'https://api-nodejs-todolist.herokuapp.com/task',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: { description: task },
      });
    } catch (error) {
      console.log(error)
    }
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
          </form>
        </Box>

        {
          lists ?
            lists && lists.map((list) => {
              return (
                <div key={list._id}>
                  <p>{list.description}</p>
                </div>
              )
            })
            : ''
        }
      </Box>

    </Box >
  );
}

export default MyList;
