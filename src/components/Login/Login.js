import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
import { useSignIn } from 'react-auth-kit';

export default function Login() {
    const signIn = useSignIn();
    const [formData, setFormData] = React.useState({
        publisherName: '',
        password: '',
    });
    const [isWrongCredentials, setIsWrongCredentials] = useState(false);

    useEffect(() => {
        setIsWrongCredentials(false);
    }, [formData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/publisherauth/login', formData).then((response) => {
            console.log(response);
            if (!response.data) {
                setIsWrongCredentials(true);
            } else {
                console.log('ok');
                if (
                    signIn({
                        token: response.data.accessToken,
                        tokenType: 'Bearer',
                        expiresIn: 100,
                        authState: { publisherName: formData.publisherName },
                    })
                ) {
                }
            }
        });
    };

    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
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
                {isWrongCredentials && <p>Sai tài khoản hoặc mật khẩu</p>}
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
}

// Login.propTypes = {
//     setToken: PropTypes.func.isRequired,
// };
