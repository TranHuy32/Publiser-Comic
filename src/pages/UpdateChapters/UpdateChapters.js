import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
// import { FireBaseContext } from '~/App';
import '../CreateChapter/CreateChapter.scss';
const UpdateChapter = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const beURL = process.env.REACT_APP_BE_URL;
    const [chapterIsExisted, setChapterIsExisted] = useState(false);
    const [state, setState] = useState({
        chapter_des: '',
        chapter_number: '',
        image_thumnail: null,
        images_content: [null],
    });

    // const fireBaseToken = useContext(FireBaseContext);
    const { chapter_id } = useParams();

    const changeHandler = (e) => {
        if (e.target.name === 'image_thumnail') {
            const file = e.target.files[0];
            if (file && isImageFile(file)) {
                setState({ ...state, [e.target.name]: e.target.files[0] });
            } else {
                alert('Vui lòng chọn một tệp ảnh có định dạng hợp lệ.');
            }
        } else if (e.target.name === 'images_content') {
            const file = e.target.files[0];
            if (file && isImageFile(file)) {
                const files = e.target.files;
                const imagesContentArray = [];
                for (let i = 0; i < files.length; i++) {
                    imagesContentArray.push(files[i]);
                }
                setState({ ...state, images_content: imagesContentArray });
            } else {
                alert('Vui lòng chọn một tệp ảnh có định dạng hợp lệ.');
            }
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
        formData.append('chapter_des', state.chapter_des);
        formData.append('chapter_number', state.chapter_number);
        formData.append('image_thumnail', state.image_thumnail);
        for (let i = 0; i < state.images_content.length; i++) {
            formData.append('images_content', state.images_content[i]);
        }
        axios
            .put(`${beURL}chapters/update/${chapter_id}`, formData, config)
            .then((response) => {
                if (response.data === 'Chapter number existed') {
                    setChapterIsExisted(true);
                } else {
                    navigate(`/comic/${response.data.comic_id}`);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const { chapter_des, chapter_number } = state;

    return (
        <div className="wrapperCreateChapters">
            <form className="createChapterForm" onSubmit={submitHandler}>
                <div>
                    <label>Tên chapter (chỉnh sửa):</label>
                    <input
                        type="text"
                        placeholder="Tên chapter..."
                        name="chapter_des"
                        value={chapter_des}
                        onChange={changeHandler}
                    />
                </div>
                <div>
                    <label>Chapter số (chỉnh sửa):</label>
                    <input
                        type="number"
                        placeholder="chapter ..."
                        name="chapter_number"
                        value={chapter_number}
                        onChange={changeHandler}
                    />
                </div>
                <div className="uploadChapter">
                    <div>
                        <label
                            htmlFor="image_thumnail"
                            className="uploadChapterLabel"
                        >
                            Thumnail
                        </label>
                        <input
                            className="inputFileChapter"
                            type="file"
                            id="image_thumnail"
                            name="image_thumnail"
                            accept="image/png,image/jpeg,image/jpg"
                            onChange={changeHandler}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="images_content"
                            className="uploadChapterLabel"
                        >
                            Truyện
                        </label>
                        <input
                            className="inputFileChapter"
                            type="file"
                            id="images_content"
                            name="images_content"
                            accept="image/png,image/jpeg,image/jpg"
                            onChange={changeHandler}
                            multiple
                        />
                    </div>
                </div>
                <div className="listCreateChapterBtn">
                    <input
                        className="createChapterSubmitBtn"
                        type="submit"
                        value="Sửa Chapter"
                    />
                </div>
                {chapterIsExisted && (
                    <h2>Chapter {state.chapter_number} đã tồn tại</h2>
                )}
            </form>
        </div>
    );
};

export default UpdateChapter;
