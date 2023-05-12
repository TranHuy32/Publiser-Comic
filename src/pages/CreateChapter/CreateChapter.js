import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CreateChapter = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [state, setState] = useState({
        chapter_des: '',
        image_thumnail: null,
        images_content: [null],
    });

    const { id } = useParams();
    const changeHandler = (e) => {
        if (e.target.name === 'image_thumnail') {
            // Handle file input separately
            setState({ ...state, [e.target.name]: e.target.files[0] });
        } else if (e.target.name === 'images_content') {
            const files = e.target.files;
            const imagesContentArray = [];
            for (let i = 0; i < files.length; i++) {
                imagesContentArray.push(files[i]);
            }
            setState({ ...state, images_content: imagesContentArray });
        } else {
            setState({ ...state, [e.target.name]: e.target.value });
        }
        console.log();
    };

    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const submitHandler = (e) => {
        e.preventDefault();
        // if (
        //     !state.title ||
        //     !state.description ||
        //     !state.author ||
        //     !state.year ||
        //     !state.reads ||
        //     state.categories.length === 0 ||
        //     !state.image_detail ||
        //     !state.image_thumnail_square ||
        //     !state.image_thumnail_rectangle
        // ) {
        //     alert('Please fill in all fields');
        //     return;
        // }
        const formData = new FormData();
        formData.append('comic_id', id);
        formData.append('chapter_des', state.chapter_des);
        formData.append('image_thumnail', state.image_thumnail);
        for (let i = 0; i < state.images_content.length; i++) {
            formData.append('images_content', state.images_content[i]);
        }
        axios
            .post('http://localhost:3000/chapters/createFile', formData, config)
            .then((response) => {
                console.log(response);
                // navigate(`/comic/${response.data._id}`);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const { chapter_des } = state;

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div>
                    <input
                        type="text"
                        placeholder="chapter_des"
                        name="chapter_des"
                        value={chapter_des}
                        onChange={changeHandler}
                        required
                    />
                </div>
                <div>
                    <input
                        type="file"
                        name="image_thumnail"
                        accept="image/png, image/jpeg"
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <input
                        type="file"
                        name="images_content"
                        accept="image/png, image/jpeg"
                        onChange={changeHandler}
                        multiple
                    />
                </div>
                <input type="submit" value="submit" />
            </form>
        </div>
    );
};

export default CreateChapter;
