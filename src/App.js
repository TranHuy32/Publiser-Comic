// import MainRoutes from '~/routes';
import { AuthProvider } from 'react-auth-kit';
import MainRoutes from '~/routes/index';
function App() {
    return (
        <AuthProvider authType={'localstorage'} authName={'token'}>
            <MainRoutes />
        </AuthProvider>
    );
}

export default App;
