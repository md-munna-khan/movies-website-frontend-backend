
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../layouts/AuthProvider";
import DynamicTittle from "../components/DynamicTitle";
import Swal from 'sweetalert2';

const MyFavorites = () => {
    const { user } = useContext(AuthContext);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetch(`https://movies-serversite.vercel.app/favorites/${user.email}`)
            .then(res => res.json())
            .then(data => setFavorites(data))
            .catch(error => console.error("Error fetching favorite movies:", error));
    }, [user.email]);

    const handleDeleteFavorite = async (_id) => {
        try {
            const response = await fetch(`https://movies-serversite.vercel.app/favorites/${_id}`, { method: "DELETE" });
            const data = await response.json();
            if (data.deletedCount > 0) {
                setFavorites(favorites.filter(movie => movie._id !== _id));
                Swal.fire({
                    title: 'Deleted!',
                    text: 'The movie has been removed from your favorites.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error("Error deleting favorite movie:", error);
        }
    };

    return (
        <div className="w-11/12 mx-auto my-10">
            <DynamicTittle />
            <h2 className="text-4xl text-center text-red-500 my-4">My Favorite Movies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favorites.map(movie => (
                    <div key={movie._id} className="   shadow-md p-4">
                        <img className="w-full h-[300px] object-cover mb-4" src={movie.poster} alt={movie.title} />
                        <h3 className="text-2xl font-semibold mb-2">{movie.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">Genre: {movie.genre}</p>
                        <p className="text-sm text-gray-600 mb-2">Duration: {movie.duration} minutes</p>
                        <p className="text-sm text-gray-600 mb-2">Release Year: {movie.releaseYear}</p>
                        <p className="text-sm text-gray-600 mb-2">Rating: {movie.rating}</p>
                        <button onClick={() => handleDeleteFavorite(movie._id)} className="btn bg-red-600 text-white mt-2">Delete Favorite</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyFavorites;
