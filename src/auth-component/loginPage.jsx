import { useState } from 'react';
import axios from 'axios';
import { useAuth } from './authProvider'
import { useNavigate } from 'react-router-dom';

// Add your Tailwind CSS classes to your components
function LoginPage() {
    const [cantoClick, setCantoClick] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginFail, setLoginFail] = useState(false);

    const { setToken } = useAuth();

    const navigate = useNavigate();

    const loginClick = async() => {
        await axios.post('http://localhost:8080/login', {
            username: username,
            password: password
        })
        .then((response) => {
            console.log(response.data);
            setToken(response.data.token);
            navigate ("/market", {replace: true});
        })
        .catch((error) => {
            console.log(error);
            setLoginFail(true);
            setCantoClick(true);
        });
    }

    const handleLogin = (event) => {
        event.preventDefault();
        if (cantoClick === true) { 
            setCantoClick(false);        
            loginClick();
        }
    };

    return (     
        <>
            <div className ="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="flex justify-center items-center mb-4">
                    {loginFail &&
                        <div role="alert" className="alert alert-error">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" 
                        fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Error! login Fail</span>
                        </div>          
                    }
                    <br/>
                    <br/>
                </div>
                <div className="flex justify-center items-center mb-4">
                        <div className="text-3xl font-bold">
                            Login
                        </div>
                </div>
                <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                    <form className="space-y-6">
                        <div>
                            <label className="input input-bordered flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" 
                                className="w-4 h-4 opacity-70">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 
                                6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                </svg>
                                <input type="text" className="grow" placeholder="Username" value={username}
                                onChange={(event) => {setUsername(event.target.value)
                                loginFail && setLoginFail(false);} 
                                }/>
                            </label>
                        </div>
                        <div>
                            <label className="input input-bordered flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" 
                                className="w-4 h-4 opacity-70">
                                    <path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 
                                    0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 
                                    0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                <input type="password" className="grow" placeholder="Password"
                                value={password} onChange={(event) => {
                                    setPassword(event.target.value)
                                    loginFail && setLoginFail(false);}
                                    }/>
                            </label>
                        </div>
                        {cantoClick && <div>
                            <button type="submit" className="btn btn-outline btn-md" onClick={handleLogin}>
                                Login
                            </button>
                            </div>
                        }
                        {!cantoClick &&
                            <span className="loading loading-dots loading-md"></span>
                        }
                    </form>
                </div>
            </div>
        </>   
    );
}


export default LoginPage;