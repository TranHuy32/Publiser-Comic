import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function PublisherComics() {
    const [comics, setComics] = useState([]);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    // const config = {
    //     headers: { Authorization: `Bearer ${token}` },
    // };

    // const handleUpChapter = () => {
    //     navigate(`/chapter/create/${comic._id}`);
    // };

    useEffect(() => {
        axios
            .get(`http://localhost:3000/comics/publisher/comics`, { Authorization: `Bearer ${token}` })
            .then((response) => {
                const data = response.data;
                setComics(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [token]);
    console.log(comics);
    if (comics) {
        return (
            <div>
                <h2>Truyện tôi đã đăng</h2>
                <div>
                    <ul>
                        {comics.map((comic, index) => (
                            <li key={index}>
                                <a href='/'>{comic.title}</a>
                                <a href='/'>
                                    <img src={comic.image_detail} alt={comic.title} />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
    return <div>Loading...</div>;
}
