import React, { useState } from 'react';
import axios from 'axios';

const Authentication = () => {
    const [authentication, setAuthentication] = useState("");

    const submitAuthentication = async (e) => {
        e.preventDefault();

        const url = "https://api-nodejs-todolist.herokuapp.com/user/login";
        try {
            const result = await axios.post(url, authentication);
            console.log('result', result);

            const token = result.data.token;

            if (result && result.data && result.data.token) {
                await localStorage.setItem('token', token);
            }

        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div>
            <form onSubmit={(e) => submitAuthentication(e)}>
                <input
                    name='email'
                    id='email'
                    type='email'
                    required={true}
                    placeholder='Your email'
                    onChange={(e) => setAuthentication({ ...authentication, email: e.target.value })}
                />
                <input
                    name='password'
                    id='password'
                    type='password'
                    required={true}
                    placeholder='Your password'
                    onChange={(e) => setAuthentication({ ...authentication, password: e.target.value })}
                />
                <button type='submit'>Send</button>
            </form>
        </div>
    );
}

export default Authentication;
