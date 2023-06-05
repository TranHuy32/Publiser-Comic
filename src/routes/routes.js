import Home from '~/pages/Home';
import PublisherComics from '~/pages/PublisherComics';
import Login from '~/components/Login/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DefaultLayout } from '~/components/Layout';
import { RequireAuth } from 'react-auth-kit';
import CreateComic from '~/pages/CreateComics/CreateComic';
import Register from '~/components/Register/Register';
import DetailComic from '~/pages/DetailComic/DetailComic';
import CreateChapter from '~/pages/CreateChapter/CreateChapter';
import DetailChapter from '~/pages/DetailChapter/DetailChapter';
import UpdateComic from '~/pages/UpdateComics/UpdateComics';
import UpdateChapter from '~/pages/UpdateChapters/UpdateChapters';
import PushNotiTopic from '~/components/PushNotiTopic/PushNotiTopic';
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
                    path={'/comic/:comic_id'}
                    element={
                        <DefaultLayout>
                            <DetailComic />
                        </DefaultLayout>
                    }
                    exact
                />
                <Route
                    path={'/comic/update/:comic_id'}
                    element={
                        <RequireAuth loginPath={'/publisher/login'}>
                            <DefaultLayout>
                                <UpdateComic />
                            </DefaultLayout>
                        </RequireAuth>
                    }
                    exact
                />

                {/* Route chapter  */}
                <Route
                    path={'/chapter/create/:comic_id'}
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
                        <DefaultLayout>
                            <DetailChapter />
                        </DefaultLayout>
                    }
                    exact
                />
                <Route
                    path={'/chapter/update/:chapter_id'}
                    element={
                        <RequireAuth loginPath={'/publisher/login'}>
                            <DefaultLayout>
                                <UpdateChapter />
                            </DefaultLayout>
                        </RequireAuth>
                    }
                    exact
                />
                {/* Firebase */}
                <Route
                    path={'/firebase/push_noti_topic'}
                    element={
                        <RequireAuth loginPath={'/publisher/login'}>
                            <DefaultLayout>
                                <PushNotiTopic />
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
