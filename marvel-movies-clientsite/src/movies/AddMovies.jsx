


import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Toaster } from "react-hot-toast";
import DynamicTitle from "../components/DynamicTitle";
import { AuthContext } from "../layouts/AuthProvider";
import ReactStars from "react-stars";

const AddMovies = () => {
  const { isdark } = useContext(AuthContext);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [rating, setRating] = useState(0);

  const genres = [
    "Comedy", "Drama", "Action", "Thriller", "Horror", "Romance", 
    "Documentary", "Sci-Fi", "Animation", "Adventure"
  ];
  const years = [2024, 2023, 2022, 2021, 2020];

  const onSubmit = (data) => {
    const movieInfo = { ...data, rating };

    fetch('https://movies-serversite.vercel.app/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movieInfo),
    })
      .then(res => res.json())
      .then(response => {
        if (response.insertedId) {
          Swal.fire({
            title: 'Success!',
            text: 'Movie added successfully!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          reset();
          setRating(0);
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to add the movie. Please try again.',
            icon: 'error',
            confirmButtonText: 'Retry'
          });
        }
      });
  };

  return (
    <div className={`min-h-screen ${isdark ? "bg-gray-800" : "bg-gray-100"} p-8`}>
      <DynamicTitle title="Add Movies" />
      <Toaster />
      <h2 className={`text-center text-3xl font-bold ${isdark ? "text-white" : "text-gray-900"} mb-6`}>
        Add a New Movie
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto">
        {/* Movie Poster */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Movie Poster (Image URL)</span>
          </label>
          <input
            type="url"
            {...register("poster", {
              required: "Poster URL is required",
              pattern: {
                value: /^https?:\/\/.*\.(jpg|jpeg|png|gif)$/i,
                message: "Enter a valid image URL"
              },
            })}
            className="input input-bordered"
            placeholder="https://example.com/poster.jpg"
          />
          {errors.poster && <p className="text-red-500">{errors.poster.message}</p>}
        </div>

        {/* Movie Title */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Movie Title</span>
          </label>
          <input
            type="text"
            {...register("title", {
              required: "Title is required",
              minLength: { value: 2, message: "Title must be at least 2 characters long" }
            })}
            className="input input-bordered"
            placeholder="Enter movie title"
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>

        {/* Movie Genre */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Genre</span>
          </label>
          <select
            {...register("genre", { required: "Genre is required" })}
            className="input input-bordered"
          >
            <option value="">Select Genre</option>
            {genres.map((genre, idx) => (
              <option key={idx} value={genre}>{genre}</option>
            ))}
          </select>
          {errors.genre && <p className="text-red-500">{errors.genre.message}</p>}
        </div>

        {/* Movie Duration */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Duration (minutes)</span>
          </label>
          <input
            type="number"
            {...register("duration", {
              required: "Duration is required",
              min: { value: 60, message: "Duration must be at least 60 minutes" }
            })}
            className="input input-bordered"
            placeholder="Enter duration in minutes"
          />
          {errors.duration && <p className="text-red-500">{errors.duration.message}</p>}
        </div>

        {/* Release Year */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Release Year</span>
          </label>
          <select
            {...register("release", { required: "Release year is required" })}
            className="input input-bordered"
          >
            <option value="">Select Year</option>
            {years.map((year, idx) => (
              <option key={idx} value={year}>{year}</option>
            ))}
          </select>
          {errors.release && <p className="text-red-500">{errors.release.message}</p>}
        </div>

        {/* Rating */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Rating</span>
          </label>
          <ReactStars
            count={5}
            size={24}
            value={rating}
            onChange={(value) => setRating(value)}
            half={false}
          />
        </div>

        {/* Summary */}
        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text">Summary</span>
          </label>
          <textarea
            {...register("summary", {
              required: "Summary is required",
              minLength: { value: 10, message: "Summary must be at least 10 characters long" }
            })}
            className="textarea textarea-bordered"
            placeholder="Write a short summary"
            rows="4"
          />
          {errors.summary && <p className="text-red-500">{errors.summary.message}</p>}
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary w-full">
            Add Movie
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMovies;






