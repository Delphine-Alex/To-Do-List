import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [register, setRegister] = useState("");

    const submitRegister = async (e) => {
        e.preventDefault();

        console.log('register', register);

        const url = "https://api-nodejs-todolist.herokuapp.com/user/register";
        try {
            const result = await axios.post(url, register);
            console.log('result', result);
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div>
            <form onSubmit={(e) => submitRegister(e)}>
                <input
                    name='name'
                    id='name'
                    type='name'
                    required={true}
                    placeholder='Your name'
                    onChange={(e) => setRegister({ ...register, name: e.target.value })}
                />
                <input
                    name='email'
                    id='email'
                    type='email'
                    required={true}
                    placeholder='Your email'
                    onChange={(e) => setRegister({ ...register, email: e.target.value })}
                />
                <input
                    name='password'
                    id='password'
                    type='password'
                    required={true}
                    placeholder='Your password'
                    onChange={(e) => setRegister({ ...register, password: e.target.value })}
                />
                <input
                    name='age'
                    id='age'
                    type='number'
                    required={true}
                    placeholder='Your age'
                    onChange={(e) => setRegister({ ...register, age: e.target.value })}
                />
                <button type='submit'>Send</button>
            </form>
        </div>
    );
}

export default Register;
