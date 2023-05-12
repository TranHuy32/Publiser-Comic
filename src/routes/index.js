// import LoginPages from '~/pages/Login';
import Home from '~/pages/Home';
import PublisherComics from '~/pages/PublisherComics';
// import { HeaderOnly } from '~/Components/Layout';
// import PostForm from '~/pages/CreateComics/PostForm';
import Login from '~/components/Login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DefaultLayout } from '~/components/Layout';
import { RequireAuth } from 'react-auth-kit';
import CreateComic from '~/pages/CreateComics/CreateComic';
import Register from '~/components/Register/Register';
import DetailComic from '~/pages/DetailComic/DetailComic';
import CreateChapter from '~/pages/CreateChapter/CreateChapter';
import DetailChapter from '~/pages/DetailChapter/DetailChapter';
//Public routes
const MainRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Home */}
                <Route
                    path={'/'}
                    element={
                        // <RequireAuth loginPath={'/publisher/login'}>
                        <DefaultLayout>
                            <Home />
                        </DefaultLayout>
                        // </RequireAuth>
                    }
                    exact
                />
                {/* Route publisher */}
                <Route
                    path={'/publisher/login'}
                    element={
                        <DefaultLayout>
                            <Login />
                        </DefaultLayout>
                    }
                    exact
                />
                <Route
                    path={'/publisher/register'}
                    element={
                        <DefaultLayout>
                            <Register />
                        </DefaultLayout>
                    }
                    exact
                />
                {/* Route comic */}
                <Route
                    path={'/comic/mycomic'}
                    element={
                        <RequireAuth loginPath={'/publisher/login'}>
                            <DefaultLayout>
                                <PublisherComics />
                            </DefaultLayout>
                        </RequireAuth>
                    }
                    exact
                />
                <Route
                    path={'/comic/create'}
                    element={
                        <RequireAuth loginPath={'/publisher/login'}>
                            <DefaultLayout>
                                <CreateComic />
                            </DefaultLayout>
                        </RequireAuth>
                    }
                    exact
                />
                <Route
                    path={'/comic/:id'}
                    element={
                        <RequireAuth loginPath={'/publisher/login'}>
                            <DefaultLayout>
                                <DetailComic />
                            </DefaultLayout>
                        </RequireAuth>
                    }
                    exact
                />

                {/* Route chapter  */}
                <Route
                    path={'/chapter/create/:id'}
                    element={
                        <RequireAuth loginPath={'/publisher/login'}>
                            <DefaultLayout>
                                <CreateChapter />
                            </DefaultLayout>
                        </RequireAuth>
                    }
                    exact
                />
                <Route
                    path={'/chapter/:id'}
                    element={
                        <RequireAuth loginPath={'/publisher/login'}>
                            <DefaultLayout>
                                <DetailChapter />
                            </DefaultLayout>
                        </RequireAuth>
                    }
                    exact
                />
            </Routes>
        </BrowserRouter>
    );
};

export default MainRoutes;
