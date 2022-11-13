import React, { useState } from 'react';
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';

import { Box, Button, Card, Container, TextField, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    register__container: {
        backgroundColor: 'var(--blue-color)',
        display: "flex",
        justifyContent: "center",
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0',
        left: '0'
    },
    register__card: {
        textAlign: 'center',
        alignSelf: 'center',
        padding: '60px 100px 60px 100px',
        [theme.breakpoints.down('xs')]: {
            padding: '15px',
            margin: '20px'
        }
    },
    register__form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
        height: "100%",
    },
    register__title: {
        color: 'var(--blue-color)',
    },
    register__input: {
        marginBottom: 20,
    },
    register__description: {
        color: 'var(--blue-color)',
    },
    register__button: {
        height: '50px',
    },
    register__inputContent: {
        display: 'flex',
        flexDirection: 'row',
    }
}));

const Register = () => {
    const [register, setRegister] = useState("");
    const navigate = useNavigate();
    const classes = useStyles();


    const submitRegister = async (e) => {
        e.preventDefault();

        const url = "https://api-nodejs-todolist.herokuapp.com/user/register";
        try {
            await axios.post(url, register);
            navigate('/authentication');
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Box className={classes.register__container}>
            <Card className={classes.register__card} elevation={2} >
                <Typography variant="h6" className={classes.register__title}>Register to My List</Typography>
                <Typography variant="caption">Create a password to start your membership.</Typography>
                <Box>
                    <Typography variant="caption">Just a few more steps and you're done! </Typography>
                    <Typography variant="caption">We hate paperwork, too.</Typography>
                </Box>
                <Container maxWidth="sm" style={{ padding: 0 }}>
                    <form onSubmit={(e) => submitRegister(e)} className={classes.register__form}>

                        <Box className={classes.register__inputContent}>
                            <Box className={classes.register__input}>
                                <TextField
                                    name='name'
                                    id='name'
                                    type='name'
                                    required={true}
                                    label='Your name'
                                    variant="outlined"
                                    onChange={(e) => setRegister({ ...register, name: e.target.value })}
                                />
                            </Box>

                            <Box className={classes.register__input}>
                                <TextField
                                    name='email'
                                    id='email'
                                    type='email'
                                    required={true}
                                    label='Your email'
                                    variant="outlined"
                                    onChange={(e) => setRegister({ ...register, email: e.target.value })}
                                />
                            </Box>
                        </Box>

                        <Box className={classes.register__inputContent}>
                            <Box className={classes.register__input}>

                                <TextField
                                    name='password'
                                    id='password'
                                    type='password'
                                    required={true}
                                    label='Your password'
                                    variant="outlined"
                                    onChange={(e) => setRegister({ ...register, password: e.target.value })}
                                />
                            </Box>


                            <Box className={classes.register__input}>
                                <TextField
                                    name='age'
                                    id='age'
                                    type='number'
                                    required={true}
                                    label='Your age'
                                    variant="outlined"
                                    onChange={(e) => setRegister({ ...register, age: e.target.value })}
                                />
                            </Box>

                        </Box>
                        <Button className={classes.register__button} variant="contained" type='submit'>Send</Button>
                    </form>

                    <Typography variant="caption"> Return to login <Link to={'/authentication'}>Here</Link></Typography>
                </Container>
            </Card>
        </Box >
    );
}

export default Register;
