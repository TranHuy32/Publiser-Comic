


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


    return (
        <div className='wrapper'>
            <h1>NewComics</h1>
            {/* {isAuthenticated() ? <p>{message}</p> : <p>Please log in.</p>} */}
        </div>
    );
}
