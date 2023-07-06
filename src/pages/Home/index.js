import { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.scss';
export default function Home() {

    const beURL = process.env.REACT_APP_BE_URL;

    const [comics, setComics] = useState([]);

    const token = localStorage.getItem('token');

    useEffect(() => {
        axios
            .get(`${beURL}comics/home/all-comics`)
            .then((response) => {
                const data = response.data;
                setComics(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [token, beURL]);

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
                                src={comic.image_detail.path}
                                title={comic.title}
                            />
                        </a>
                        <div className="info">
                            <a href={`/comic/${comic._id}`} className="title">
                                {comic.title}
                            </a>
                            <a
                                className="chapter"
                                href={`/chapter/${
                                    comic.chapters[comic.chapters.length - 1]
                                        .chapter_id
                                }`}
                            >
                                {'Chapter ' +
                                    comic.chapters.length +
                                    `: ${
                                        comic.chapters[
                                            comic.chapters.length - 1
                                        ].chapter_des
                                    }`}
                            </a>
                            <p className="des">{comic.description}</p>
                            <p className="views">
                                {'Lượt xem: ' + comic.reads}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
