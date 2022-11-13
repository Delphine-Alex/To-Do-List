import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';

const Profil = () => {
  const [profil, setProfil] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getDatas = async () => {
      const token = await localStorage.getItem('token');
      try {
        const result = await axios({
          method: 'GET',
          url: 'https://api-nodejs-todolist.herokuapp.com/user/me',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        });
        setProfil(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDatas();
  }, []);


  const submitLogout = async (e) => {
    const token = await localStorage.getItem('token');
    try {
      await axios({
        method: 'POST',
        url: 'https://api-nodejs-todolist.herokuapp.com/user/logout',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/authentication');
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
      <h1>My Profil</h1>
      <p>{profil.name}</p>
      <p>{profil.email}</p>
      <p>{profil.age}</p>

      <button><Link to={'/task'}>Back to My list</Link></button>
      <button onClick={submitLogout}>Disconnect</button>
    </div>
  );
}

export default Profil;
