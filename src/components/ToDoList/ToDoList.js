import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

const ToDoList = () => {
  const [lists, setLists] = useState([]);
  const [task, setTask] = useState("");

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
    <div>
      <button><Link to={'/profil'}>Profil</Link></button>

      <h1>Add a Task</h1>

      <div>
        <form onSubmit={submitTask}>
          <input
            name='description'
            id='description'
            type='text'
            required={false}
            placeholder='Your task'
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />
          <button type='submit'>Send</button>
        </form>
      </div>

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
    </div >
  );
}

export default ToDoList;
