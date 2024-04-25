import { useState ,useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import AuthComponent from '../auth-component/AuthComponent';
import { getUserID, getUsername } from '../auth-component/authProvider';

function Food_Rest_Page() {
    const [food, setFood] = useState([]);
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(true);
          
    const url = 'http://localhost:8080/market/';

    useEffect(() => {
        getFood();
        const fetchUsername = async () => {
            const name = await getUsername();
            setUsername(name);
        };
        fetchUsername();
    }, []);

    const getFood = async() => {
        try {
            const id = await getUserID();
            const response = await axios.get(`${url}${id}`);
            setFood(response.data);
        }
        catch (error) {
            console.log(error);
        }
        setLoading(false);
    }


    return(
        <>
            <div className ="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold mb-4">Food in {username}'s Resterrant</h1>
                    <div className='space-x-2'>
                        <AuthComponent/>
                    </div>
                </div>
                {loading && <span className="loading loading-dots loading-lg"></span>}
                {!loading && <div>
                    <FoodShowComponent food={food}/> {/* Pass the 'food' prop correctly */}
                </div>}
            </div>
        </>
    );
}

export default Food_Rest_Page;

function FoodShowComponent({food}){
    if (food.length === 0){
        return(
            <div role="alert" className="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" 
                fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Don't have any food yet</span>
            </div>  
        )
    }
    else {
        return(
            <ul className="divide-y divide-gray-100">
            {food.map((food) => (
                <li className='flex justify-between gap-x-6 py-5' key={food.id}>
                    {food.food_name}
                </li>
            ))}
            </ul>
        )
    }
}

FoodShowComponent.propTypes = {
    food: PropTypes.array.isRequired
}
