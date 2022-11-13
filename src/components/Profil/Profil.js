import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';

import Header from '../Header/Header';

import {
  Box, Button, Card, CardContent,
  Divider,
  Typography
} from '@mui/material';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  profil__container: {
    margin: '1%',
  },
  profil__content: {
    textAlign: 'center',
  },
  profil__backbtn: {
    border: '1px solid #113D78',
    color: '#113D78'
  },
  profil__title: {
    color: 'black',
    paddingBottom: 20
  },
  profil__divider: {
    backgroundColor: '#113D78',
    height: "5px",
  },
  profil__card: {
    marginTop: 10,
    marginBottom: 50,
  },
  profil__disconnectbtn: {
    backgroundColor: '#113D78',
  }
}));

const Profil = () => {
  const [profil, setProfil] = useState([]);
  const navigate = useNavigate();
  const classes = useStyles();

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
    <Box>
      <Header />

      <Box className={classes.profil__container}>
        <Button variant="outlined" className={classes.profil__backbtn}><Link to={'/task'}>Back to My list</Link></Button>


        <Box className={classes.profil__content}>
          <Typography variant="h6" sx={{ flexGrow: 1 }} className={classes.profil__title}>
            MY PROFIL
          </Typography>

          <Divider className={classes.profil__divider} />

          <Card className={classes.profil__card}>
            <CardContent>
              <p>{profil.name}</p>
              <p>{profil.email}</p>
              <p>{profil.age}</p>

            </CardContent>
          </Card>
        </Box>

        <Button variant="contained" onClick={submitLogout} className={classes.profil__disconnectbtn}>Disconnect</Button>
      </Box>

    </Box>
  );
}

export default Profil;
