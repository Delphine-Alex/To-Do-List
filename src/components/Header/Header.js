import React from 'react';

import { Link } from 'react-router-dom';

import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core';

import AccountCircle from '@mui/icons-material/AccountCircle';


const useStyles = makeStyles(() => ({
  header__bar: {
    backgroundColor: 'var(--blue-color)',
  },
  header__title: {
    color: 'var(--white-color)',
  },
  header__avatar: {
    color: 'var(--white-color)',
  }
}));

const Header = () => {
  const classes = useStyles();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className={classes.header__bar}>
          <Typography variant="h6" sx={{ flexGrow: 1 }} className={classes.header__title}>
            MY LIST
          </Typography>
          <IconButton>
            <Link to={'/profil'}>
              <AccountCircle className={classes.header__avatar} />
            </Link>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
