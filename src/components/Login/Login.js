import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const signIn = useSignIn();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ publisherName: '', password: '' });
    const [isWrongCredentials, setIsWrongCredentials] = useState(false);

    useEffect(() => setIsWrongCredentials(false), [formData]);

    // const handleRefreshToken = async (refreshToken) => {
    //     try {
    //         const response = await axios.post('http://localhost:3000/publisherauth/refresh', { refreshToken });
    //         const { accessToken, refreshToken: newRefreshToken } = response.data;
    //         signIn({ token: accessToken, tokenType: 'Bearer', expiresIn: 1, refreshToken: newRefreshToken, refreshTokenExpireIn: 1 });
    //         return
    //     } catch (error) {
    //         return
    //         console.log(error);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/publisherauth/login', formData);
            const { accessToken, refreshToken } = response.data;
            signIn({ token: accessToken, tokenType: 'Bearer', expiresIn: 10, authState: { publisherName: formData.publisherName }, refreshToken: refreshToken, refreshTokenExpireIn: 10 });
            navigate('/');
            window.location.reload()
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setIsWrongCredentials(true);
            } else {
                console.log(error);

                return error
            }
        }
    };
    const handleRegister = () => {
        navigate('/publisher/register');
    };

    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <button onClick={handleRegister}>Đăng ký</button>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>PublisherName</p>
                    <input type="text" onChange={(e) => setFormData({ ...formData, publisherName: e.target.value })} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                </label>
                {isWrongCredentials && <p>Sai tài khoản hoặc mật khẩu</p>}
                <div>
                    <button type="submit">Đăng nhập</button>
                </div>
            </form>
        </div>
    );
}
