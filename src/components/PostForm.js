import React, { useState } from 'react';
import axios from 'axios';

const PostForm = () => {
    const [state, setState] = useState({
        description: '',
        title: '',
        author: '',
        year: '',
        reads: '',
        categories: [],
        image_detail: null,
        image_thumnail_square: null,
        image_thumnail_rectangle: null,
    });

    const changeHandler = (e) => {
        if (e.target.type === 'file') {
            // Handle file input separately
            setState({ ...state, [e.target.name]: e.target.files[0] });
        } else if (e.target.name === 'categories') {
            const categoriesArray = e.target.value
                .split(',')
                .map((category) => category.trim());
            setState({ ...state, [e.target.name]: categoriesArray });
        } else {
            setState({ ...state, [e.target.name]: e.target.value });
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('description', state.description);
        formData.append('title', state.title);
        formData.append('author', state.author);
        formData.append('year', state.year);
        formData.append('reads', state.reads);
        formData.append('categories', state.categories);
        formData.append('image_detail', state.image_detail);
        formData.append('image_thumnail_square', state.image_thumnail_square);
        formData.append(
            'image_thumnail_rectangle',
            state.image_thumnail_rectangle,
        );

        axios
            .post('http://localhost:3000/comics/create/test', formData)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const { description, title, author, year, reads, categories } = state;

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div>
                    <input
                        type="text"
                        placeholder="title"
                        name="title"
                        value={title}
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="description"
                        name="description"
                        value={description}
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="author"
                        name="author"
                        value={author}
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <input
                        type="number"
                        placeholder="year"
                        name="year"
                        value={year}
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <input
                        type="number"
                        placeholder="reads"
                        name="reads"
                        value={reads}
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="categories"
                        name="categories"
                        value={categories.join(', ')}
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <input
                        type="file"
                        name="image_detail"
                        accept="image/png, image/jpeg"
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <input
                        type="file"
                        name="image_thumnail_square"
                        accept="image/png, image/jpeg"
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <input
                        type="file"
                        name="image_thumnail_rectangle"
                        accept="image/png, image/jpeg"
                        onChange={changeHandler}
                    />
                </div>
                <input type="submit" value="submit" />
            </form>
        </div>
    );
};

export default PostForm;
