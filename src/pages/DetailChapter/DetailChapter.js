import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function DetailChapter() {
    const [chapter, setChapter] = useState();
    // const navigate = useNavigate();

    const token = localStorage.getItem('token');

    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:3000/chapters/${id}`, { Authorization: `Bearer ${token}` })
            .then((response) => {
                const data = response.data;
                setChapter(data);
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id, token]);
    console.log(chapter);
    if (chapter) {
        return (
            <div>
                <h2>{chapter.chapter_des}</h2>

                <ul>
                    {chapter.content.map((imageContent, index) => (
                        <li key={index}>
                            <img src={imageContent} alt={chapter.title} />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
    return <div>Loading...</div>;
}
