// import MainRoutes from '~/routes';
import { AuthProvider } from 'react-auth-kit';
import MainRoutes from '~/routes/index';
import refreshApi from './components/RefreshToken/RefreshToken';
function App() {
    return (
        <AuthProvider authType={'localstorage'} authName={'token'} refresh={refreshApi}>
            <MainRoutes />
        </AuthProvider>
    );
}

export default App;
