import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './DetailComic.scss'

export default function DetailComic() {
    const [comic, setComic] = useState();
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const { id } = useParams();

    const handleUpChapter = () => {
        navigate(`/chapter/create/${comic._id}`);
    };

    useEffect(() => {
        axios
            .get(`http://localhost:3000/comics/${id}`, { Authorization: `Bearer ${token}` })
            .then((response) => {
                const data = response.data;
                setComic(data);
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id, token]);
    if (comic) {
        return (
            <div className='detailComic'>
                <h2>{comic.title}</h2>
                <div className='detailComicInfo'>
                    <img className='detailComicThumnail' src={comic.image_detail_path} alt={comic.title} />
                    <div className='detailComicText'>
                        <ul className='listInfo'>
                            <li>
                                <p >Tác giả:</p>
                                <p > {comic.author}</p>
                            </li>
                            <li>
                                <p >Categories:</p>
                                <p >{comic.categories.join(', ')}</p>
                            </li>
                            <li>
                                <p >Lượt xem:</p>
                                <p >{comic.reads}</p>
                            </li>
                            <li><button onClick={handleUpChapter}>Đăng chapter</button>
                            </li>
                        </ul>

                    </div>
                </div>
                <div className='detailComicDes'>
                    <p>Mô tả:</p>
                    <p className='detaiDes'>{comic.description}</p>
                </div>
                <div className='detailComicListChapter'>
                    <p >Dang sách chương: </p>
                    <ul>
                        {comic.chapters.map((chapter, index) => (
                            <li key={index} className='detailComicChapter'>

                                <a href={`/chapter/${chapter.chapter_id}`}>{`Chapter ${index + 1}: ${chapter.chapter_des
                                    }`}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div >

        );
    }
    return <div>Loading...</div>;
}
