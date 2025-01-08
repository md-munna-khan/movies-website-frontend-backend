



import { useNavigate, useLoaderData, Link } from 'react-router-dom';
import ReactStars from 'react-stars'; // Import the ReactStars component
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../layouts/AuthProvider';
import Swal from 'sweetalert2';

const MovieDetail = () => {
    const { user,isdark } = useContext(AuthContext);
    const movieDataFromLoader = useLoaderData();
    const [movieData, setMovieData] = useState(movieDataFromLoader);

    const navigate = useNavigate();

    // Update movie state if movieData is updated from the loader or other actions
    useEffect(() => {
        setMovieData(movieDataFromLoader);
    }, [movieDataFromLoader]);

    const handleDelete = (_id) => {
        fetch(`https://movies-serversite.vercel.app/add/${_id}`, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.deletedCount > 0) {
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'The movie has been deleted.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    navigate('/all-movies');
                }
            });
    };

    const addFavorite = () => {
        const { poster, title, genre, duration, release, summary, rating } = movieData;
        const email = user.email;

        const movieInfo = { poster, title, genre, duration, release, summary, email, rating };

        fetch(`https://movies-serversite.vercel.app/favorites`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieInfo),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Added to Favorites!',
                        text: 'The movie has been added to your favorites.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                }
            });
    };

    return (
        <div className="w-11/12 mx-auto my-10 bg-white shadow-lg rounded-lg ">
            <h2 className={`text-4xl font-bold text-center my-4 ${isdark? 'text-black':''}`}>Movie Details</h2>
            <div className="flex flex-col lg:flex-row lg:items-center justify-center shadow-2xl p-4">
                <img
                    className="w-full lg:w-1/2 lg:h-[600px] object-cover mb-4 lg:mb-0"
                    src={movieData.poster}
                    alt={movieData.title}
                />
                <div className="md:ml-8 p-4  md:text-left">
                    <h3 className="md:text-4xl text-gray-600 text-2xl font-bold mb-2">{movieData.title}</h3> {/* Title now has bold font */}
                    <p className="text-2xl text-gray-600 mb-2">Genre: {movieData.genre}</p>
                    <p className="text-2xl text-gray-600 mb-2">Duration: {movieData.duration} minutes</p>
                    <p className="text-2xl text-gray-600 mb-2">Release Year: {movieData.release}</p>
                    <div className="text-2xl text-gray-600 mb-2 flex">
                        Rating:
                        <ReactStars
                            count={5}
                            value={parseInt(movieData.rating)} // Convert rating to an integer
                            size={20}
                            edit={false} // Disable editing the stars
                            activeColor="#ffd700" // Set the active color (gold for rating)
                        />
                    </div>
                    <p className="text-sm text-gray-600 mb-4">Details: {movieData.summary}</p>
                    <div className="space-x-3 mb-4  flex justify-between ">
                        <button onClick={() => handleDelete(movieData._id)} className="p-2  bg-red-600 hover:bg-blue-700 text-white">Delete</button>
                        <button onClick={addFavorite} className="p-2  bg-red-600 hover:bg-blue-700 text-white">Add to Favorite</button>
                       <button className="p-2  bg-red-600 hover:bg-blue-600 text-white" > <Link to={`/update-movies/${movieData._id}`} >Update Movie</Link></button>
                    </div>
                    <button onClick={() => navigate('/all-movies')} className="inline-block w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                        See All Movies
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
