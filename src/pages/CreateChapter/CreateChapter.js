import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
// import { FireBaseContext } from '~/App';
import './CreateChapter.scss';
const CreateChapter = () => {
    const token = localStorage.getItem('token');
    const [isSucess, setIsSucess] = useState(false);
    const navigate = useNavigate();

    const [state, setState] = useState({
        chapter_des: '',
        image_thumnail: null,
        images_content: [null],
    });

    // const fireBaseToken = useContext(FireBaseContext);
    const { comic_id } = useParams();
    const beURL = process.env.REACT_APP_BE_URL;

    useEffect(() => {
        setIsSucess(false);
    }, [state]);

    const changeHandler = (e) => {
        if (e.target.name === 'image_thumnail') {
            const file = e.target.files[0];
            if (file && isImageFile(file)) {
                setState({ ...state, [e.target.name]: file });
            } else {
                alert('Vui lòng chọn một tệp ảnh có định dạng hợp lệ.');
            }
        } else if (e.target.name === 'images_content') {
            const files = e.target.files;
            const imagesContentArray = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (file && isImageFile(file)) {
                    imagesContentArray.push(file);
                } else {
                    alert('Vui lòng chọn các tệp ảnh có định dạng hợp lệ.');
                }
            }
            setState({ ...state, images_content: imagesContentArray });
        } else {
            setState({ ...state, [e.target.name]: e.target.value });
        }
    };
    const isImageFile = (file) => {
        const acceptedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
        return acceptedFormats.includes(file.type);
    };

    const backToComicHander = () => {
        navigate(`/comic/${comic_id}`);
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
        formData.append('comic_id', comic_id);
        formData.append('chapter_des', state.chapter_des);
        formData.append('image_thumnail', state.image_thumnail);
        for (let i = 0; i < state.images_content.length; i++) {
            formData.append('images_content', state.images_content[i]);
        }
        axios
            .post(`${beURL}chapters/createFile`, formData, config)
            .then((response) => {
                console.log(response);
                setIsSucess(true);
                // console.log('1', fireBaseToken);
                // if (fireBaseToken) {
                //     // fireBaseState.append('token', fireBaseToken);
                //     // fireBaseState.append('title', id);
                //     // fireBaseState.append('body', state.chapter_des);
                //     const fireBaseState = {
                //         token: fireBaseToken,
                //         body: state.chapter_des,
                //         title: id,
                //     };
                //     axios.post(
                //         'http://localhost:3000/push-notification',
                //         fireBaseState,
                //         config,
                //     );
                // }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const { chapter_des } = state;

    return (
        <div className="wrapperCreateChapters">
            <form className="createChapterForm" onSubmit={submitHandler}>
                <div>
                    <label>Tên chapter:</label>
                    <input
                        type="text"
                        placeholder="Tên chapter..."
                        name="chapter_des"
                        value={chapter_des}
                        onChange={changeHandler}
                        required
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
                            required
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
                            required
                        />
                    </div>
                </div>
                <div className="listCreateChapterBtn">
                    <input
                        className="createChapterSubmitBtn"
                        type="submit"
                        value="Đăng Chapter"
                    />
                    <input
                        className="createChapterSubmitBtn"
                        onClick={backToComicHander}
                        value="Back to comic"
                    />
                </div>
            </form>
            {isSucess && <h2>Đăng chapter thành công</h2>}
        </div>
    );
};

export default CreateChapter;
