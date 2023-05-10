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

//Public routes
const MainRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path={'/login'}
                    element={
                        <DefaultLayout>
                            <Login />
                        </DefaultLayout>
                    }
                    exact
                />
                <Route
                    path={'/'}
                    element={
                        <RequireAuth loginPath={'/login'}>
                            <DefaultLayout>
                                <Home />
                            </DefaultLayout>
                        </RequireAuth>
                    }
                    exact
                />
                <Route
                    path={'/comic'}
                    element={
                        <RequireAuth loginPath={'/login'}>
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
                        <RequireAuth loginPath={'/login'}>
                            <DefaultLayout>
                                <CreateComic />
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
