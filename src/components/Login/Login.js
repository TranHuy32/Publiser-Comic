import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

async function LoginPublisher(credentials) {
    return axios
        .post('http://localhost:3000/publisherauth/login', credentials, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.data);
}

export default function Login({ setToken }) {
    const [publisherName, setPublisherName] = useState();
    const [password, setPassword] = useState();
    const [isWrongCredentials, setIsWrongCredentials] = useState(false);

    useEffect(()=>{
        setIsWrongCredentials(false)

    },[publisherName, password])
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await LoginPublisher({
            publisherName,
            password,
        });
        if (token === false) {
            setIsWrongCredentials(true); 
        } else {
            console.log(token);
            setIsWrongCredentials(false);
            setToken(token);
        }
    };

    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>PublisherName</p>
                    <input
                        type="text"
                        onChange={(e) => setPublisherName(e.target.value)}
                    />
                </label>
                <label>
                    <p>Password</p>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                {isWrongCredentials && <p>Sai tài khoản hoặc mật khẩu</p>}
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired,
};
