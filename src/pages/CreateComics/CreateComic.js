import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import './CreateComic.scss';
import Categories from './Categories';

const CreateComic = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const beURL = process.env.REACT_APP_BE_URL;

    // const categoryOptions = [
    //     { value: 'Hành động', label: 'Hành động' },
    //     { value: 'Võ thuật', label: 'Võ thuật' },
    //     { value: 'Hàn Quốc', label: 'Hàn Quốc' },
    //     { value: 'Nhật Bản', label: 'Nhật Bản' },
    // ];
    const categoryOptions = Categories.map((category) => ({
        value: category,
        label: category,
    }));

    const [state, setState] = useState({
        description: '',
        title: '',
        author: '',
        year: '',
        categories: [],
        image_detail: null,
        image_thumnail_square: null,
        image_thumnail_rectangle: null,
    });

    const changeHandler = (e) => {
        if (e.target.type === 'file') {
            const file = e.target.files[0];
            if (file && isImageFile(file)) {
                setState({ ...state, [e.target.name]: e.target.files[0] });
            } else {
                alert('Vui lòng chọn một tệp ảnh có định dạng hợp lệ.');
            }
        } else if (e.target.name === 'categories') {
            const categoriesArray = e.target.value
                .split(',')
                .map((category) => category.trim());
            setState({ ...state, [e.target.name]: categoriesArray });
        } else {
            setState({ ...state, [e.target.name]: e.target.value });
        }
    };

    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    const isImageFile = (file) => {
        const acceptedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
        return acceptedFormats.includes(file.type);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('description', state.description);
        formData.append('title', state.title);
        formData.append('author', state.author);
        formData.append('year', state.year);
        formData.append('categories', state.categories);
        formData.append('image_detail', state.image_detail);
        formData.append('image_thumnail_square', state.image_thumnail_square);
        formData.append(
            'image_thumnail_rectangle',
            state.image_thumnail_rectangle,
        );

        axios
            .post(`${beURL}comics/create`, formData, config)
            .then((response) => {
                console.log(response.data._id);
                navigate(`/comic/${response.data._id}`);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const { description, title, author, year } = state;

    return (
        <div className="wrapperCreateComics">
            <form className="CreateComicForm" onSubmit={submitHandler}>
                <div>
                    <label>Tên truyện:</label>
                    <input
                        type="text"
                        placeholder="Tên truyện ...."
                        name="title"
                        value={title}
                        onChange={changeHandler}
                        required
                    />
                </div>
                <div>
                    <label>Nội dung:</label>
                    <textarea
                        placeholder="Mô tả ....................."
                        name="description"
                        value={description}
                        onChange={changeHandler}
                        required
                    ></textarea>
                </div>
                <div>
                    <label>Tác giả:</label>
                    <input
                        type="text"
                        placeholder="Tác giả"
                        name="author"
                        value={author}
                        onChange={changeHandler}
                        required
                    />
                </div>
                <div>
                    <label>Xuất bản năm:</label>
                    <input
                        type="number"
                        placeholder="2001..."
                        name="year"
                        value={year}
                        onChange={changeHandler}
                        required
                    />
                </div>
                <div>
                    <label>Thể loại:</label>
                    <Select
                        options={categoryOptions}
                        isMulti
                        onChange={(selectedOptions) => {
                            const selectedCategories = selectedOptions.map(
                                (option) => option.value,
                            );
                            setState({
                                ...state,
                                categories: selectedCategories,
                            });
                        }}
                    />
                </div>
                <div className="upload">
                    <div>
                        <label className="uploadLabel" htmlFor="image_detail">
                            Thumnail chính
                        </label>
                        <input
                            className="inputFile"
                            type="file"
                            name="image_detail"
                            id="image_detail"
                            accept="image/png,image/jpeg,image/jpg"
                            onChange={changeHandler}
                            required
                        />
                    </div>
                    <div>
                        <label
                            className="uploadLabel"
                            htmlFor="image_thumnail_square"
                        >
                            Thumnail vuông
                        </label>
                        <input
                            className="inputFile"
                            type="file"
                            id="image_thumnail_square"
                            name="image_thumnail_square"
                            accept="image/png,image/jpeg,image/jpg"
                            onChange={changeHandler}
                            required
                        />
                    </div>
                    <div>
                        <label
                            className="uploadLabel"
                            htmlFor="image_thumnail_rectangle"
                        >
                            Thumnail chữ nhật
                        </label>
                        <input
                            className="inputFile"
                            type="file"
                            id="image_thumnail_rectangle"
                            name="image_thumnail_rectangle"
                            accept="image/png,image/jpeg,image/jpg"
                            onChange={changeHandler}
                            required
                        />
                    </div>
                </div>
                <input
                    className="createSubmitBtn"
                    type="submit"
                    value="Tạo truyện"
                />
            </form>
        </div>
    );
};

export default CreateComic;
