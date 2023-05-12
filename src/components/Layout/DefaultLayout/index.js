
import './DefaultLayout.scss'
import { useNavigate } from 'react-router-dom';
import { useSignOut } from 'react-auth-kit';
import { useEffect, useState } from 'react';


function DefaultLayout({ children }) {

    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        const accessToken = localStorage.getItem('token');
        if (accessToken === null) {
            setIsLogin(false)
        } else {
            setIsLogin(true)
        }
    }, [])

    const singOut = useSignOut();
    const navigate = useNavigate();

    const logout = () => {
        singOut();
        navigate('/');
    };

    return (
        <div className='comics-wrapper'>
            <div className='comics-comics'>
                {/* <div className='comics-body' /> */}
                <header className='header'>
                    <div className='overHeader'>
                        <div className='frame'>
                            <div className='overGroup '>
                                <div>
                                    <a href='/' ><h1 className='textLogo'>Comics</h1></a>
                                </div>
                                <div className='listFunc'>
                                    <div className='home'>
                                        <a href='/'>Trang chủ</a>
                                    </div>
                                    <div className='myComic'>
                                        <a href='/comic/mycomic'>Truyện của tôi</a>
                                    </div>
                                    <div className='upComic'>
                                        <a href='/comic/create'> Đăng truyện</a>
                                    </div>
                                    {!isLogin &&
                                        <div>
                                            <div className='login'>
                                                <a href='/publisher/login'> Đăng nhập</a>
                                            </div>
                                            <div className='register'>
                                                <a href='/publisher/register'> Đăng ký</a>
                                            </div>
                                        </div>
                                    }
                                    {isLogin && <div className='logout'>
                                        <a href='/' onClick={logout}>Đăng xuất</a>
                                    </div>}
                                </div>

                            </div>
                        </div>
                    </div>
                </header>
                {/* End header */}
                <div className='comics-body'>
                    <div className='bodyWrapper'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
