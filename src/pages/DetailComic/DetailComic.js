import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './DetailComic.scss';

export default function DetailComic() {
    const [comic, setComic] = useState();
    const [isDelete, setIsDelete] = useState(false);
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(false);
    const beURL = process.env.REACT_APP_BE_URL;
    const token = localStorage.getItem('token');
    const { comic_id } = useParams();

    const handleUpChapter = () => {
        navigate(`/chapter/create/${comic_id}`);
    };
    const handleUpdateComic = () => {
        navigate(`/comic/update/${comic_id}`);
    };
    const handleUpdateChapter = (chapterId) => {
        navigate(`/chapter/update/${chapterId}`);
    };
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    useEffect(() => {
        if (token) {
            setIsAuth(true);
        } else {
            setIsAuth(false);
        }
        axios
            .get(`${beURL}comics/${comic_id}`)
            .then((response) => {
                const data = response.data;
                setComic(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [comic_id, token, beURL, isDelete]);
    const handleDeleteChapter = (chapterId) => {
        console.log(chapterId);
        const confirmDelete = window.confirm(
            'Bạn có muốn xóa chapter này không?',
        );
        if (confirmDelete) {
            axios
                .delete(`${beURL}chapters/delete/${chapterId}`, config)
                .then((response) => {
                    if (response.data === 'Successful delete') {
                        setIsDelete(!isDelete);
                    } else {
                        window.alert(
                            'Xóa không thành công. Phải để lại ít nhất 1 chapter!!!',
                        );
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    console.log(comic);
    if (comic) {
        return (
            <div className="detailComic">
                <h2>{comic.title}</h2>
                <div className="detailComicInfo">
                    <img
                        className="detailComicThumnail"
                        src={comic.image_detail.path}
                        alt={comic.title}
                    />
                    <div className="detailComicText">
                        <ul className="listInfo">
                            <li>
                                <p>Tác giả:</p>
                                <p> {comic.author}</p>
                            </li>
                            <li>
                                <p>Categories:</p>
                                <p>{comic.categories.join(', ')}</p>
                            </li>
                            <li>
                                <p>Lượt xem:</p>
                                <p>{comic.reads}</p>
                            </li>
                            {isAuth && (
                                <ul className="jc-spacearound">
                                    <li>
                                        <button onClick={handleUpChapter}>
                                            Đăng chapter
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={handleUpdateComic}>
                                            Chỉnh sửa truyện
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="detailComicDes">
                    <p>Mô tả:</p>
                    <p className="detaiDes">{comic.description}</p>
                </div>
                <div className="detailComicListChapter">
                    <p>Dang sách chương: </p>
                    <ul>
                        {comic?.chapters.map((chapter, index) => {
                            // Chuyển giá trị chapter_number thành chuỗi
                            const formattedChapterNumber =
                                chapter.chapter_number.toString();

                            // Tách phần nguyên và phần thập phân
                            const [integerPart, decimalPart] =
                                formattedChapterNumber.split('.');

                            return (
                                <li key={index} className="detailComicChapter">
                                    <a
                                        className="chapterNumber"
                                        href={`/chapter/${chapter.chapter_id}`}
                                    >
                                        {`Chapter ${integerPart}${
                                            decimalPart ? ',' + decimalPart : ''
                                        }: ${chapter.chapter_des}`}
                                    </a>
                                    {isAuth && (
                                        <>
                                            <p
                                                className="chapterUpdate"
                                                onClick={() =>
                                                    handleUpdateChapter(
                                                        chapter.chapter_id,
                                                    )
                                                }
                                            >
                                                Chỉnh sửa
                                            </p>
                                            <p
                                                className="chapterDelete"
                                                onClick={() =>
                                                    handleDeleteChapter(
                                                        chapter.chapter_id,
                                                    )
                                                }
                                            >
                                                Xóa
                                            </p>
                                        </>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
    return <div>Loading...</div>;
}
