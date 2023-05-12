import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSignIn } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import './Login.scss'

export default function Login() {
    const signIn = useSignIn();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ publisherName: '', password: '' });
    const [isWrongCredentials, setIsWrongCredentials] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);


    useEffect(() => {
        setIsWrongCredentials(false)
        setIsEmpty(false)
    }, [formData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/publisherauth/login', formData);
            const { accessToken, refreshToken } = response.data;
            if (
                !formData.publisherName ||
                !formData.password
            ) {
                setIsEmpty(true);
                return;
            }
            if (!response.data) {
                setIsWrongCredentials(true);
                return
            }
            signIn({
                token: accessToken,
                tokenType: 'Bearer',
                expiresIn: 10,
                authState: { publisherName: formData.publisherName },
                refreshToken: refreshToken,
                refreshTokenExpireIn: 10
            });
            navigate('/');
            window.location.reload()
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setIsWrongCredentials(true);
                console.log(error.response);
                return
            } else {
                console.log(error);

                return error
            }
        }
    };

    return (
        <div className="login-wrapper">
            <h2 className='loginText'>Đăng nhập</h2>
            <form onSubmit={handleSubmit}>
                <label className='labelName'>
                    <p>Tài khoản:</p>
                    <input type="text" onChange={(e) => setFormData({ ...formData, publisherName: e.target.value })} />
                </label>
                <label className='labelPass'>
                    <p>Mật khẩu:</p>
                    <input type="password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                </label>
                {isWrongCredentials && <p className='errWrongAuth'>Sai tài khoản hoặc mật khẩu</p>}
                {isEmpty && <p className='errEmpty'>Hãy điền đầy đủ thông tin đăng nhập!!!</p>}
                <div>
                    <button className='buttonLogin' type="submit">Đăng nhập</button>
                </div>
            </form>
        </div>
    );
}
