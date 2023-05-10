import { useNavigate } from 'react-router-dom';
import { useSignOut } from 'react-auth-kit';

export default function Home() {
    // const { isAuthenticated, getToken } = useAuthUser();
    // const [message, setMessage] = useState('');

    // const fetchData = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:3000/home', {
    //             headers: {
    //                 Authorization: `Bearer ${getToken()}`,
    //             },
    //         });
    //         setMessage(response.data.message);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    // useEffect(() => {
    //     if (isAuthenticated()) {
    //         fetchData();
    //     }
    // }, [isAuthenticated, getToken]);

    const singOut = useSignOut();
    const navigate = useNavigate();

    const logout = () => {
        singOut();
        navigate('/login');
    };

    return (
        <div>
            <h1>Welcome to the Home Page!</h1>
            <button onClick={logout}>Logout</button>
            {/* {isAuthenticated() ? <p>{message}</p> : <p>Please log in.</p>} */}
        </div>
    );
}
