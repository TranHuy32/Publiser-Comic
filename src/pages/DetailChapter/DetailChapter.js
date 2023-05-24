import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './DetailChapter.scss';
export default function DetailChapter() {
    const [chapter, setChapter] = useState();
    const beURL = process.env.REACT_APP_BE_URL;

    // const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const { id } = useParams();
    useEffect(() => {
        axios
            .get(`${beURL}chapters/${id}`, { Authorization: `Bearer ${token}` })
            .then((response) => {
                const data = response.data;
                setChapter(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id, token, beURL]);
    if (chapter) {
        return (
            <div className="detailChapterWrapper">
                <h2>{chapter.chapter_des}</h2>

                <ul>
                    {chapter.content.map((imageContent, index) => (
                        <li key={index}>
                            <img src={imageContent.path} alt={chapter.title} />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
    return <div>Loading...</div>;
}
