


import { useEffect, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ReactStars from 'react-stars';  // Import ReactStars component

const UpdateMovies = () => {
    const { id } = useParams();
    const [rating, setRating] = useState(0); // Store the rating as a number
    const [updateData, setUpdateData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://movies-serversite.vercel.app/add/${id}`)
            .then(res => res.json())
            .then(data => {
                setUpdateData(data);
                setRating(data?.rating || 0); // Set the initial rating value
            })
            .catch((error) => toast.error('Error fetching movie details.'));
    }, [id]);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const poster = e.target.poster.value;
        const title = e.target.title.value;
        const genre = e.target.genre.value;
        const duration = e.target.duration.value;
        const release = e.target.release.value;
        const summary = e.target.summary.value;
        const movieInfo = { poster, title, genre, duration, release, summary, rating };

        // Validation checks
        if (!/^https?:\/\/.*\.(jpg|jpeg|png|gif)$/.test(poster)) {
            toast.error('Poster must be a valid URL.');
            return;
        }
        if (title.length < 2) {
            toast.error('Title must have at least 2 characters.');
            return;
        }
        if (!genre) {
            toast.error('Genre must be selected.');
            return;
        }
        if (isNaN(duration) || duration <= 60) {
            toast.error('Duration must be a number greater than 60.');
            return;
        }
        if (!release) {
            toast.error('Release Year must be selected.');
            return;
        }
        if (rating === 0) {
            toast.error('Rating must be selected.');
            return;
        }
        if (summary.length < 10) {
            toast.error('Summary must have at least 10 characters.');
            return;
        }

        // Submit movie data
        fetch(`https://movies-serversite.vercel.app/add/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieInfo),
        })
            .then(res => res.json())
            .then(data => {
                Swal.fire({
                    icon: 'success',
                    title: 'Movie updated successfully!',
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate('/movies'); // Redirect to movies list page
            })
            .catch(err => {
                toast.error('Error updating movie.');
            });

        e.target.reset();
        setRating(0); // Reset rating after form submission
    };

    const genres = ['Comedy', 'Drama', 'Horror', 'Action', 'Romance'];
    const years = [2024, 2023, 2022, 2021, 2020];

    if (!updateData) {
        return <div>Loading...</div>; // Return a loading message until data is fetched
    }

    return (
        <div className="mx-auto my-10 p-10 bg-base-200">
            <h2 className="text-center text-3xl lg:text-5xl">Update Movie Form</h2>
            <Toaster />
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Movie Poster</span>
                    </label>
                    <input
                        type="text"
                        defaultValue={updateData?.poster}
                        placeholder="Movie poster"
                        name="poster"
                        className="input input-bordered"
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Movie Title</span>
                    </label>
                    <input
                        type="text"
                        defaultValue={updateData?.title}
                        placeholder="Title"
                        name="title"
                        className="input input-bordered"
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Movie Genre</span>
                    </label>
                    <select
                        name="genre"
                        className="input input-bordered"
                        defaultValue={updateData?.genre}
                        required
                    >
                        <option value="">Select Genre</option>
                        {genres.map((genre, index) => (
                            <option key={index} value={genre}>{genre}</option>
                        ))}
                    </select>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Movie Duration (minutes)</span>
                    </label>
                    <input
                        type="number"
                        placeholder="Duration"
                        defaultValue={updateData?.duration}
                        name="duration"
                        className="input input-bordered"
                        required
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Release Year</span>
                    </label>
                    <select
                        name="release"
                        defaultValue={updateData?.release}
                        className="input input-bordered"
                        required
                    >
                        <option value="">Select Year</option>
                        {years.map((year, index) => (
                            <option key={index} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Rating</span>
                    </label>
                    <ReactStars
                        count={5}
                        value={rating || updateData?.rating}
                        size={24}
                        edit={true}  // Allows the user to edit
                        activeColor="#ffd700"
                        onChange={(newRating) => setRating(newRating)}  // Update rating state
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Summary</span>
                    </label>
                    <textarea
                        placeholder="Summary"
                        defaultValue={updateData?.summary}
                        name="summary"
                        className="input input-bordered"
                        required
                    />
                </div>
                <button className="btn my-4 btn-warning w-full md:col-span-2 lg:col-span-2" type="submit">
                    Update Movie
                </button>
            </form>
        </div>
    );
};

export default UpdateMovies;
