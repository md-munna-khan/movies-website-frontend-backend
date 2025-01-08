import { useEffect } from "react";
import { useLoaderData, Link } from "react-router-dom";

const MovieDetails = () => {
    const movieData = useLoaderData();
    
    useEffect(() => {
        console.log('Movie Data:', movieData);
    }, [movieData]);

    if (!movieData || typeof movieData !== 'object') {
        return <div>Error: Invalid data format</div>;
    }

    return (
        <div className="w-11/12 mx-auto my-10">
            <h2 className="text-4xl text-center my-4">Movie Details</h2>
            <div className="bg-base-200 items-center justify-center shadow-md p-4">
                <img className="w-[400px] lg:h-[600px] mx-auto object-cover" src={movieData.poster} alt={movieData.title} />
                <div className="p-4 text-center">
                    <h3 className="text-2xl font-semibold">{movieData.title}</h3>
                    <p className="text-sm text-gray-600">Genre: {movieData.genre}</p>
                    <p className="text-sm text-gray-600">Duration: {movieData.duration} minutes</p>
                    <p className="text-sm text-gray-600">Release Year: {movieData.releaseYear}</p>
                    <p className="text-sm text-gray-600">Rating: {movieData.rating}</p>
                    <p className="text-sm text-gray-600">Details: {movieData.summary}</p>
                   
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
