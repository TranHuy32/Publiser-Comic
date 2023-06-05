import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../CreateComics/CreateComic.scss';
import { useParams } from 'react-router-dom';
const UpdateComic = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const beURL = process.env.REACT_APP_BE_URL;

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

    const { comic_id } = useParams();
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
    const isImageFile = (file) => {
        const acceptedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
        return acceptedFormats.includes(file.type);
    };

    const config = {
        headers: { Authorization: `Bearer ${token}` },
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
            .put(`${beURL}comics/update/${comic_id}`, formData, config)
            .then((response) => {
                navigate(`/comic/${response.data._id}`);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const { description, title, author, year, categories, reads } = state;

    return (
        <div className="wrapperCreateComics">
            <form className="CreateComicForm" onSubmit={submitHandler}>
                <div>
                    <label>Tên truyện (chỉnh sửa):</label>
                    <input
                        type="text"
                        placeholder="Tên truyện ...."
                        name="title"
                        value={title}
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <label>Nội dung (chỉnh sửa):</label>
                    <textarea
                        placeholder="Mô tả ....................."
                        name="description"
                        value={description}
                        onChange={changeHandler}
                    ></textarea>
                </div>
                <div>
                    <label>Tác giả (chỉnh sửa):</label>
                    <input
                        type="text"
                        placeholder="Tác giả"
                        name="author"
                        value={author}
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <label>Xuất bản năm (chỉnh sửa):</label>
                    <input
                        type="number"
                        placeholder="2001..."
                        name="year"
                        value={year}
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <label>Thể loại (chỉnh sửa):</label>
                    <input
                        type="text"
                        placeholder="Thể loại"
                        name="categories"
                        value={categories.join(', ')}
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <label>Lượt xem (chỉnh sửa):</label>
                    <input
                        type="number"
                        placeholder="Lượt xem"
                        name="reads"
                        value={reads}
                        onChange={changeHandler}
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
                        />
                    </div>
                </div>
                <input
                    className="createSubmitBtn"
                    type="submit"
                    value="Sửa truyện"
                />
            </form>
        </div>
    );
};

export default UpdateComic;
