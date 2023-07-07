import { AuthProvider } from 'react-auth-kit';
import MainRoutes from '~/routes/routes';
import refreshApi from './components/RefreshToken/RefreshToken';
import { createContext } from 'react';
// import { getMessagingToken, onMessageListener } from './firebase.ts';

export const FireBaseContext = createContext();

function App() {
    // const [fireBaseToken, setFireBaseToken] = useState();
    // useEffect(() => {
    //     getMessagingToken().then((data) => {
    //         setFireBaseToken(data);
    //     });
    // }, []);
    // useEffect(() => {
    //     onMessageListener().then((data) => {
    //         console.log('Receive foreground: ', data);
    //     });
    // });

    return (
        <AuthProvider
            authType={'localstorage'}
            authName={'token'}
            refresh={refreshApi}
        >
            {/* <FireBaseContext.Provider value={fireBaseToken}> */}
            <MainRoutes />
            {/* </FireBaseContext.Provider> */}
        </AuthProvider>
    );
}

export default App;
