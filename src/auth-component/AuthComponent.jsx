import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './authProvider';

function AuthComponent() {
    const {token} = useAuth();
    const { setToken } = useAuth();

    const nav = useNavigate();

    const Logout = () => {
        setToken(null);
        nav('/');
    }

    if (token) {
        return (
            <div className='space-x-2'>
                {/* <h1>Welcome {setUser.User}</h1> */}
                <button className="btn btn-outline btn-md"
                onClick={Logout}>
                    Logout
                </button>
            </div>
        )
    }
    else {
        return (
            <div className='space-x-2'>
                <Link to='/login'>
                    <button className="btn btn-outline btn-md">
                        Login
                    </button>
                </Link>
            </div>
        )
    }
}

export default AuthComponent;