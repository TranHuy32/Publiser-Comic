import axios from 'axios';
import { useState, useEffect } from 'react';
import './PublisherComics.scss';

export default function PublisherComics() {
    const beURL = process.env.REACT_APP_BE_URL;

    const [comics, setComics] = useState([]);
    // const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };

    // const handleUpChapter = () => {
    //     navigate(`/chapter/create/${comic._id}`);
    // };

    useEffect(() => {
        axios
            .get(`${beURL}comics/publisher/comics`, config)
            .then((response) => {
                const data = response.data;
                console.log(data);
                setComics(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [token]);
    if (comics) {
        return (
            <div className="wrapper">
                {comics.map((comic, index) => (
                    <div className="comics-publisher-info" key={index}>
                        <div className="comic-publisher-info">
                            <a
                                href={`/comic/${comic._id}`}
                                className="img-publisher-thumnail"
                            >
                                <img
                                    src={comic.image_detail_path}
                                    title={comic.title}
                                />
                            </a>
                            <div className="publisher-info">
                                <a
                                    href={`/comic/${comic._id}`}
                                    className="publisher-title"
                                >
                                    {comic.title}
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
    return <div>Loading...</div>;
}
