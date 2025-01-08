import  { useEffect, useState } from "react";
import DynamicTitle from "../components/DynamicTitle";

const CartoonMovies = () => {
    const [cartoonMovies, setCartoonMovies] = useState([]);

    useEffect(() => {
        fetch('https://movies-serversite.vercel.app/cartoon-movies')
            .then(res => res.json())
            .then(data => setCartoonMovies(data));
    }, []);

    return (
        <> 
        <DynamicTitle></DynamicTitle>
         <h2 className="lg:text-4xl text-3xl py-4 text-red-500 text-center">Marvel Cartoon series</h2>
        <div className="container mx-auto p-4 bg-blue-100 my-10">
          
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {cartoonMovies.map(cartoon => (
                    <div key={cartoon._id} className="bg-white p-4 rounded-lg shadow-lg">
                        <img src={cartoon.poster} alt={cartoon.title} className="w-full h-48 object-cover rounded-md" />
                        <h2 className="text-xl font-semibold mt-4">{cartoon.title}</h2>
                        <p className="text-gray-600 mt-2">Duration: {cartoon.duration} mins</p>
                        <p className="text-gray-600 mt-1">Rating: {cartoon.rating} stars</p>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default CartoonMovies;