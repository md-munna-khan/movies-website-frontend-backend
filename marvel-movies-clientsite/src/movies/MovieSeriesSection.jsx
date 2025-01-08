import React from "react";

const MovieSeriesSection = () => {
    const hindiMovies = ["Gully Boy", "Dangal", "Lagaan", "Kabhi Khushi Kabhie Gham", "PK"];
    const hollywoodMovies = ["Avengers: Endgame", "Inception", "The Dark Knight", "Titanic", "The Matrix"];
    const tollywoodMovies = ["Baahubali", "RRR", "Kshana Kshanam", "Eega", "Arjun Reddy"];

    return (
        <div className="py-16 bg-gray-800 text-white">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-yellow-400 mb-8">Top Movie Series</h2>

                <div className="space-y-10">
                    {/* Hindi Movies Section */}
                    <div className="movie-category">
                        <h3 className="text-2xl font-semibold text-yellow-500 mb-4">Hindi Movies</h3>
                        <marquee behavior="scroll" direction="left" className="text-xl">
                            {hindiMovies.join(" | ")}
                        </marquee>
                    </div>

                    {/* Hollywood Movies Section */}
                    <div className="movie-category">
                        <h3 className="text-2xl font-semibold text-yellow-500 mb-4">Hollywood Movies</h3>
                        <marquee behavior="scroll" direction="left" className="text-xl">
                            {hollywoodMovies.join(" | ")}
                        </marquee>
                    </div>

                    {/* Tollywood Movies Section */}
                    <div className="movie-category">
                        <h3 className="text-2xl font-semibold text-yellow-500 mb-4">Tollywood Movies</h3>
                        <marquee behavior="scroll" direction="left" className="text-xl">
                            {tollywoodMovies.join(" | ")}
                        </marquee>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieSeriesSection;
