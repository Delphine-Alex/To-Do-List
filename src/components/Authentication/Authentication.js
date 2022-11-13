import React, { useState } from 'react';
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';

import { Box, Button, Card, Container, TextField, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    authentication__container: {
        display: "flex",
        justifyContent: "center",
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0',
        left: '0'
    },
    authentication__card: {
        border: '2px solid var(--blue-color)',
        textAlign: 'center',
        alignSelf: 'center',
        padding: '60px',
        [theme.breakpoints.down('xs')]: {
            padding: '15px',
            margin: '20px'
        }
    },
    authentication__form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
        height: "100%",
    },
    authentication__title: {
        color: 'var(--blue-color)',
    },
    authentication__input: {
        marginBottom: 20,
    },
    authentication__description: {
        color: 'var(--blue-color)',
    },
    authentication__button: {
        height: '50px',
    }
}));

const Authentication = () => {
    const [authentication, setAuthentication] = useState("");
    const navigate = useNavigate();
    const classes = useStyles();

    const submitAuthentication = async (e) => {
        e.preventDefault();

        const url = "https://api-nodejs-todolist.herokuapp.com/user/login";
        try {
            const result = await axios.post(url, authentication);

            const token = result.data.token;

            if (result && result.data && result.data.token) {
                await localStorage.setItem('token', token);
            }

            navigate('/task');

        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Box className={classes.authentication__container}>
            <Card className={classes.authentication__card} elevation={2} >
                <Typography variant="h6" className={classes.authentication__title}>Login to My List</Typography>
                <Container maxWidth="sm" style={{ padding: 0 }}>

                    <form onSubmit={(e) => submitAuthentication(e)} className={classes.authentication__form}>

                        <Box className={classes.authentication__input}>
                            <TextField
                                name='email'
                                id='email'
                                type='email'
                                required={true}
                                label='Your email'
                                variant="outlined"
                                onChange={(e) => setAuthentication({ ...authentication, email: e.target.value })}
                            />
                        </Box>

                        <Box className={classes.authentication__input}>
                            <TextField
                                name='password'
                                id='password'
                                type='password'
                                required={true}
                                label='Your password'
                                variant="outlined"
                                onChange={(e) => setAuthentication({ ...authentication, password: e.target.value })}
                            />
                        </Box>

                        <Button variant="contained" type='submit' className={classes.authentication__button}>Send</Button>

                    </form>

                    <Typography variant="caption" className={classes.authentication__description}>New here? <Link to={'/'}>Sign up now</Link></Typography>
                </Container>
            </Card>
        </Box >
    );
}

export default Authentication;
