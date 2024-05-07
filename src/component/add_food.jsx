import axios from "axios";

function Add_Food() {

    const addFood = async() => {
        const food_name = document.getElementById('food_name').value;
        const price = document.getElementById('price').value;
        await axios.post('http://localhost:8080/food', {
            food_name: food_name,
            price: price
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold mb-4">Add Food</h1>
            </div>
            <div className="flex flex-col space-y-4">
                <div className="flex space-x-4">
                    <div className="flex flex-col space-y-2">
                        <input type="text" id="food_name" placeholder="Food Name" 
                        className="input input-bordered w-full max-w-xs items-center" />
                    </div>
                    <div className="flex flex-col space-y-2">
                        <input type="number" id="price" placeholder="Price" 
                        className="input input-bordered w-full max-w-xs items-center" />
                    </div>
                    <div className="flex flex-col space-y-2">         
                        <button className="btn btn-outline btn-md" onClick={addFood}>Add</button>
                    </div>
                </div>
                <div className="flex justify-end"></div>

                </div>
        </div>
        </>
    )
}

export default Add_Food;