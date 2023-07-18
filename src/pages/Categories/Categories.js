import axios from 'axios';
import { useState, useEffect } from 'react';
import './Categories.scss';

export default function Categories() {
    const [isAuth, setIsAuth] = useState(false);
    const [categories, setCategories] = useState();
    const [isDelete, setIsDelete] = useState(false);

    const beURL = process.env.REACT_APP_BE_URL;
    const token = localStorage.getItem('token');
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
            .get(`${beURL}category/all`)
            .then((response) => {
                const data = response.data;
                setCategories(data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [token, beURL, isDelete]);
    const handleDeleteCategories = (category_id) => {
        const confirmDelete = window.confirm("Bạn có muốn xóa thể loại này không?");
        if (confirmDelete) {
            axios
                .delete(`${beURL}category/delete/${category_id}`, config)
                .then((response) => {
                    if (response.data === "Successful delete")
                        setIsDelete(!isDelete);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    if (!categories) {
        return "Loading..."
    } else if (categories === "No categories created") {
        return "No categories created"
    } else {
        return (
            <div>
                <h1 className='allComics allCategories'>All Categories</h1>
                <div className='listCategories'>
                    <ul>
                        {categories.map((category, index) => (
                            <li key={index} className="">
                                <p
                                    className=""
                                >{`${category.name}`}</p>
                                {isAuth && (
                                    <p
                                        className=""
                                        onClick={() =>
                                            handleDeleteCategories(
                                                category._id,
                                            )
                                        }
                                    >
                                        X
                                    </p>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>


        )

    }
}
