import { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.scss';
export default function Home() {
    // const { isAuthenticated, getToken } = useAuthUser();
    // const [message, setMessage] = useState('');

    // const fetchData = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:3000/home', {
    //             headers: {
    //                 Authorization: `Bearer ${getToken()}`,
    //             },
    //         });
    //         setMessage(response.data.message);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // useEffect(() => {
    //     if (isAuthenticated()) {
    //         fetchData();
    //     }
    // }, [isAuthenticated, getToken]);

    const [comics, setComics] = useState([]);
    // const navigate = useNavigate();

    const token = localStorage.getItem('token');

    // const handleUpChapter = () => {
    //     navigate(`/comics/${comic._id}`);
    // };

    useEffect(() => {
        axios
            .get(`http://localhost:3000/comics/home/all-comics`)
            .then((response) => {
                const data = response.data;
                console.log(data);
                setComics(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [token]);

    return (
        <div className="wrapper">
            <h1 className="allComics">ALL COMICS</h1>
            {comics.map((comic, index) => (
                <div className="comics-info" key={index}>
                    <div className="comic-info">
                        <a
                            href={`/comic/${comic._id}`}
                            className="img-thumnail"
                        >
                            <img
                                alt={comic.title}
                                src={comic.image_detail_path}
                                title={comic.title}
                            />
                        </a>
                        <div className="info">
                            <a href={`/comic/${comic._id}`} className="title">
                                {comic.title}
                            </a>
                            <a className="chapter">
                                {'Chapter ' +
                                    comic.chapters.length +
                                    `: ${
                                        comic.chapters[
                                            comic.chapters.length - 1
                                        ].chapter_des
                                    }`}
                            </a>
                            <a href="#" className="des">
                                {comic.description}
                            </a>
                            <a href="#" className="views">
                                {'Lượt xem: ' + comic.reads}
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
