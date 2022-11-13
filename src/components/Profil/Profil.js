import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';

import Header from '../Header/Header';

import { Box, Button, Card, CardContent, Divider, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  profil__container: {
    margin: '2%',
  },
  profil__content: {
    textAlign: 'center',
    margin: '4%',
  },
  profil__containerbtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profil__backbtn: {
    textDecoration: 'none',
  },
  profil__title: {
    color: 'black',
    paddingBottom: 20
  },
  profil__divider: {
    backgroundColor: 'var(--blue-color)',
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

        <Box className={classes.profil__containerbtn}>
          <Button variant="outlined" className={classes.profil__backbtn}><Link to={'/task'}>Back to My list</Link></Button>
          <Button variant="contained" onClick={submitLogout} className={classes.profil__disconnectbtn}>Disconnect</Button>
        </Box>


        <Box className={classes.profil__content}>
          <Typography variant="h6" sx={{ flexGrow: 1 }} className={classes.profil__title}>
            MY PROFIL
          </Typography>

          <Divider className={classes.profil__divider} />

          <Card className={classes.profil__card}>
            <CardContent>
              <Typography>My name: {profil.name}</Typography>
              <Typography>My mail: {profil.email}</Typography>
              <Typography>My age: {profil.age}</Typography>

            </CardContent>
          </Card>
        </Box>

        {/* <Button variant="contained" onClick={submitLogout} className={classes.profil__disconnectbtn}>Disconnect</Button> */}
      </Box>

    </Box>
  );
}

export default Profil;
