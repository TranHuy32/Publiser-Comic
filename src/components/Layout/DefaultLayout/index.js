import './DefaultLayout.scss';
import { useNavigate } from 'react-router-dom';
import { useSignOut } from 'react-auth-kit';
import { useEffect, useState, memo } from 'react';
import Footer from '../Footer/Footer';

function DefaultLayout({ children }) {
    const [isLogin, setIsLogin] = useState(true);
    const imagePath = require('../../images/onepiece_banner.jpg');
    useEffect(() => {
        const accessToken = localStorage.getItem('token');
        if (accessToken === null) {
            setIsLogin(false);
        } else {
            setIsLogin(true);
        }
    }, []);

    const singOut = useSignOut();
    const navigate = useNavigate();

    const logout = () => {
        singOut();
        navigate('/');
    };

    return (
        <div className="comics-wrapper">
            <div className="comics-comics">
                {/* <div className='comics-body' /> */}
                <header className="header">
                    <div className="overHeader">
                        <div className="frame">
                            <div className="overGroup ">
                                <div className='textLogo'>
                                    <a href="/">
                                        <h1>Làng Truyện</h1>
                                    </a>
                                </div>
                                <div className='MenuContainer'>
                                <div className="topLeftContainer">
                                    <div className="listFunc">
                                        <div className="home">
                                            <a href="/">Trang chủ</a>
                                        </div>
                                        <div className="myComic">
                                            <a href="/comic/mycomic">
                                                Truyện của tôi
                                            </a>
                                        </div>
                                        <div className="upComic">
                                            <a href="/comic/create">Đăng truyện</a>
                                        </div>
                                        <div className="categories">
                                            <a href="/categories/all">Thể loại</a>
                                        </div>
                                    </div>
                                </div>
                                <div className='topRightContainer'>
                                    {!isLogin && (
                                        <div className='UserInfo'>
                                            <div className="login">
                                                <a href="/publisher/login">
                                                    {' '}
                                                    Đăng nhập
                                                </a>
                                            </div>
                                            <div className="register">
                                                <a href="/publisher/register">
                                                    {' '}
                                                    Đăng ký
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                    {isLogin && (
                                        <div className="logout">
                                            <a href="/" onClick={logout}>
                                                Đăng xuất
                                            </a>
                                        </div>
                                    )}
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="images-banner">
                    <img src={imagePath} alt="publish comic" />
                </div>
                {/* End header */}
                <div className="comics-body">
                    <div className="bodyWrapper">{children}</div>
                </div>
                <footer>
                    <Footer />
                </footer>
            </div>
        </div>
    );
}

export default memo(DefaultLayout);
