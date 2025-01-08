

import { useContext, useEffect, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component"; // Importing ReactStars for ratings
import DynamicTittle from "../components/DynamicTitle";
import { AuthContext } from "../layouts/AuthProvider";

const AllMovies = () => {
  const { isdark } = useContext(AuthContext);
  const data = useLoaderData();
  const [allMovies, setAllMovies] = useState(data);
  const [search, setSearch] = useState("");

  // Fetching movie data with search functionality
  useEffect(() => {
    fetch(`https://movies-serversite.vercel.app/add?search=${search}`)
      .then((res) => res.json())
      .then((data) => setAllMovies(data))
      .catch((error) => console.error("Error fetching movies:", error));
  }, [search]);

  return (
    <>
      {/* Search Bar */}
      <div className=" lg:w-[400px] md:w-[300px] w-[250px] mx-auto mb-6">
        <DynamicTittle />
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          name="search"
          placeholder="Search for movies..."
          className="input input-bordered w-full p-4 rounded-xl shadow-md transition-all hover:shadow-xl focus:outline-none"
          required
        />
      </div>

      {/* Movies Display */}
      <section className=" w-11/12 mx-auto my-10">
        <h2
          className={`text-4xl  font-bold text-red-600 text-center mb-4 ${
            isdark ? "text-white" : "text-gray-800"
          }`}
        >
          All Movies
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {allMovies.map((movie, index) => (
            <div
              key={movie._id}
              className="shadow-lg rounded-lg overflow-hidden"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              {/* Movie Poster */}
              <img
                className="w-full h-64 object-cover transform transition-transform duration-300 hover:scale-105"
                src={movie.poster}
                alt={`Poster of ${movie.title}`}
              />

              {/* Movie Details */}
              <div className="p-4">
                <h3 className="text-lg font-semibold truncate mb-2">
                  {movie.title}
                </h3>

                {/* Dual Audio Label */}
                <div className="absolute top-0">
                  <span className="inline-block bg-red-500 text-black px-2 py-1 text-xs font-bold rounded">
                    Dual Audio ORG
                  </span>
                </div>

                {/* Details */}
                <div className="text-sm mb-4">
                  <p>Genre: {movie.genre}</p>
                  <p>Release Year: {movie.release}</p>
                  <div className="absolute top-0 right-0 text-white px-2 py-1 bg-gray-800">
                    <p>{movie.duration} mins</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <span className="bg-yellow-400 text-black px-2 py-1 rounded-md text-xs font-bold mr-2">
                    {movie.rating}
                  </span>
                  <ReactStars
                    count={5}
                    value={parseFloat(movie.rating)}
                    size={22}
                    edit={false}
                    activeColor="#ffd700"
                  />
                </div>

                {/* View Details Button */}
                <Link
                  to={`/detail/${movie._id}`}
                  className="inline-block bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-2 rounded hover:from-red-600 hover:to-red-800 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default AllMovies;
