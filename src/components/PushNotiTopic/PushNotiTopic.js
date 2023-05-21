import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../pages/CreateComics/CreateComic.scss';
const PushNotiTopic = () => {
    const token = localStorage.getItem('token');
    const beURL = process.env.REACT_APP_BE_URL;
    const [isSucees, setIsSucess] = useState(false);
    const [state, setState] = useState({
        topic: '',
        title: '',
        body: '',
    });
    const changeHandler = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    useEffect(() => {
        setIsSucess(false);
    }, [state]);

    const submitHandler = (e) => {
        e.preventDefault();
        axios
            .post(`${beURL}push-notification/topic`, state, config)
            .then((response) => {
                console.log(response);
                setIsSucess(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const { topic, title, body } = state;

    return (
        <div className="wrapperCreateComics">
            <form className="CreateComicForm" onSubmit={submitHandler}>
                <div>
                    <label>Topic:</label>
                    <input
                        type="text"
                        placeholder="Topic ...."
                        name="topic"
                        value={topic}
                        onChange={changeHandler}
                        pattern="[a-zA-Z0-9-_.~%]+"
                        title="Không sử dụng dấu câu"
                        required
                    />
                </div>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        placeholder="Title ...."
                        name="title"
                        value={title}
                        onChange={changeHandler}
                        required
                    />
                </div>{' '}
                <div>
                    <label>Body:</label>
                    <input
                        type="text"
                        placeholder="Body ...."
                        name="body"
                        value={body}
                        onChange={changeHandler}
                        required
                    />
                </div>
                {isSucees && (
                    <h2 className="jc-center mb-15">
                        Push notification thành công
                    </h2>
                )}
                <input
                    className="createSubmitBtn"
                    type="submit"
                    value="Push Noti"
                />
            </form>
        </div>
    );
};

export default PushNotiTopic;
