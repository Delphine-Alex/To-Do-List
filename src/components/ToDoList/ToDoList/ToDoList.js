import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ToDoList = () => {
  const [lists, setLists] = useState([]);

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

  return (
    <div>
      {lists ?
        lists && lists.map((list) => {
          return (
            <div key={list._id}>
              <p>{list.description}</p>
            </div>
          )
        })
        : 'Add a new task'
      }
    </div>
  );
}

export default ToDoList;
