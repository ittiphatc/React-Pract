import { useState,useEffect } from 'react';
import axios from 'axios';
import AuthComponent from '../auth-component/AuthComponent';


function FoodPage() {
    const [food, setFood] = useState([]);
    const [loading, setLoading] = useState(true);
      
    useEffect(() => {
        getFood();
    }, []);
    
    const getFood = async() => {
        await axios.get('http://localhost:8080/food')
        .then((response) => {
            setFood(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
        setLoading(false);
    }     

    // Add your Tailwind CSS classes to your elements
    return(
        <>  
            <div className ="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="flex justify-between items-center mb-4">
                    <div className="text-3xl font-bold">
                        Food
                    </div>
                    <div className='space-x-2'>
                        <AuthComponent/>
                    </div>
                </div>
                {loading && <span className="loading loading-dots loading-lg"></span>}
                {!loading && food.length === 0 &&                         <div role="alert" className="alert alert-error">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" 
                        fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span>Cannot to access</span>
                        </div>
                }
                {!loading && food.length > 0 && <div>
                    <ul className="divide-y divide-gray-100">
                        {food.map((food) => (
                            <div key={food.id}>
                                <div className='flex justify-between gap-x-6 py-5'>
                                    <span>{food.food_name}</span>
                                    <span className='ml-auto'>Price : {food.price} Bath</span>
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
                }
            </div>
        </>
    );
}

export default FoodPage;