// import LoginPages from '~/pages/Login';
import Home from '~/pages/Home';
import PublisherComics from '~/pages/PublisherComics';
// import Profile from '~/pages/Profile';
// import Upload from '~/pages/Upload';
// import Search from '~/pages/Search';
// import { HeaderOnly } from '~/Components/Layout';

//Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/publisher/publisherComics', component: PublisherComics },
    // { path: '/login', component: LoginPages },
    //   { path: '/upload', component: Upload, layout: HeaderOnly },
    //   { path: '/search', component: Search, layout: null },
];

const privateRoutes = {};
export { publicRoutes, privateRoutes };
