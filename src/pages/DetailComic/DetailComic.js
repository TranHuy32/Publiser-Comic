import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

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
            <div>
                <h2>{comic.title}</h2>
                <img src={comic.image_detail_path} alt={comic.title} />
                <p>Tác giả : {comic.author}</p>
                <p>Categories: {comic.categories.join(', ')}</p>
                <p>Mô tả: {comic.description}</p>
                <p>Chapter: </p>
                <ul>
                    {comic.chapters.map((chapter, index) => (
                        <li key={index}>

                            <a href={`/chapter/${chapter.chapter_id}`}>{`Chapter ${index + 1}: ${chapter.chapter_des
                                }`}</a>
                        </li>
                    ))}
                </ul>
                <button onClick={handleUpChapter}>Đăng chapter</button>
            </div>
        );
    }
    return <div>Loading...</div>;
}
