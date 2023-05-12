import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [formData, setFormData] = React.useState({
        publisherName: '',
        password: '',
        name: '',
    });
    const navigate = useNavigate();
    const [isCreated, setIsCreated] = useState(false);
    const [isExisted, setIsExisted] = useState(false);
    const [passwordsIsMatch, setPasswordsIsMatch] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);

    useEffect(() => {
        setIsCreated(false);
        setIsExisted(false);
        setPasswordsIsMatch(true);
        setIsEmpty(false);
    }, [formData]);

    console.log(formData);
    const handleRegister = (e) => {
        e.preventDefault();
        if (
            !formData.publisherName ||
            !formData.password ||
            !formData.name ||
            !formData.confirmPassword
        ) {
            setIsEmpty(true);
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setPasswordsIsMatch(false);
            return;
        }
        axios
            .post('http://localhost:3000/publisherauth/register', formData)
            .then((response) => {
                console.log(response);
                if (!response.data) {
                } else if (response.data === 'PublisherName Existed!') {
                    setIsExisted(true);
                    console.log('Existed');
                } else {
                    setIsCreated(true);
                    console.log('Created');
                }
            });
    };
    const handleLogin = () => {
        navigate('/publisher/login');
    };

    return (
        <div className="register-wrapper">
            <h1>Đăng ký</h1>
            <button onClick={handleLogin}>Đăng nhập</button>
            <form onSubmit={handleRegister}>
                <label>
                    <p>Name</p>
                    <input
                        type="text"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                name: e.target.value,
                            })
                        }
                    />
                </label>
                <label>
                    <p>PublisherName</p>
                    <input
                        type="text"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                publisherName: e.target.value,
                            })
                        }
                    />
                </label>
                <label>
                    <p>Password</p>
                    <input
                        type="password"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            })
                        }
                    />
                </label>
                <label>
                    <p>Confirm Password</p>
                    <input
                        type="password"
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                confirmPassword: e.target.value,
                            })
                        }
                    />
                </label>
                {isCreated && (
                    <>
                        <h2>Tạo thành công</h2>
                        <button onClick={handleLogin}> Đăng nhập </button>
                    </>
                )}
                {isExisted && <h2>Tài khoản đã tồn tại</h2>}
                {!passwordsIsMatch && <h2>Password doesn't match</h2>}
                {isEmpty && <h2>Hãy điền tất cả thông tin</h2>}

                <div>
                    <button type="submit">Đăng ký</button>
                </div>
            </form>
        </div>
    );
}
