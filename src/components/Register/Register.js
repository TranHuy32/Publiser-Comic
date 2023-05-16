import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import './Register.scss';

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
            <h1 className="registerText">Đăng ký</h1>
            <form onSubmit={handleRegister}>
                <label className="labelRegisterName">
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
                <label className="labelRegisterPublisherName">
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
                <label className="labelRegisterPass">
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
                <label className="labelRegisterCornfirmPass">
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
                        <h2 className="isCreated">Tạo thành công</h2>
                    </>
                )}
                {isExisted && (
                    <h2 className="isExisted">Tài khoản đã tồn tại</h2>
                )}
                {!passwordsIsMatch && (
                    <h2 className="errPassCornfirmWrong">
                        Password doesn't match
                    </h2>
                )}
                {isEmpty && (
                    <h2 className="errRegisterEmpty">Hãy điền tất cả thông tin</h2>
                )}

                <div>
                    <button className="buttonRegister" type="submit">
                        Đăng ký
                    </button>
                    <button
                        className="buttonRegisterLogin"
                        onClick={handleLogin}
                    >
                        Đăng nhập
                    </button>
                </div>
            </form>
        </div>
    );
}
