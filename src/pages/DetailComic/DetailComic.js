import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './DetailComic.scss';

export default function DetailComic() {
    const [comic, setComic] = useState();
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(false);

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
    useEffect(() => {
        axios
            .get(`http://localhost:3000/comics/${comic_id}`)
            .then((response) => {
                const data = response.data;
                setComic(data);
                if (token) {
                    setIsAuth(true);
                }
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [comic_id, token]);
    if (comic) {
        return (
            <div className="detailComic">
                <h2>{comic.title}</h2>
                <div className="detailComicInfo">
                    <img
                        className="detailComicThumnail"
                        src={comic.image_detail_path}
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
                        {comic.chapters.map((chapter, index) => (
                            <li key={index} className="detailComicChapter">
                                <a
                                    className="chapterNumber"
                                    href={`/chapter/${chapter.chapter_id}`}
                                >{`Chapter ${index + 1}: ${
                                    chapter.chapter_des
                                }`}</a>
                                {isAuth && (
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
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
    return <div>Loading...</div>;
}
