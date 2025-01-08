


  



import  { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS

const OfferSection = () => {
    const [offers, setOffers] = useState([
        {
            id: 1,
            title: "Buy One Get One Free",
            description: "Rent one movie, get another one for free! Limited time only.",
            discountPercentage: "50%",
            imageUrl: "https://i.ibb.co.com/wKb2vXn/436209.webp",
            link: "/rentals",
        },
        {
            id: 2,
            title: "Movie Bundle: 3 for $15",
            description: "Get 3 movies for just $15! Choose from a wide range of genres.",
            discountPercentage: "30%",
            imageUrl: "https://i.ibb.co.com/kg4K5fd/HD-wallpaper-pushpa-movie-poster-allu-arjun-indian-actor-stylish-star-thumbnail.jpg",
            link: "/bundles",
        },
        {
            id: 3,
            title: "Subscribe and Save 20%",
            description: "Get a 20% discount on your first month when you subscribe.",
            discountPercentage: "20%",
            imageUrl: "https://i.ibb.co.com/bFZ254x/Oz-The-Great-and-Powerful-full-triptych-poster.jpg",
            link: "/subscribe",
        }
    ]);

    // Initialize AOS on component mount
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    return (
        <div className="w-full my-10 py-16 bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8">Limited-Time Offers</h2>
                <p className="text-lg mb-12">Hurry up! Grab these amazing offers before they expire.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {offers.map((offer) => (
                        <div
                            key={offer.id}
                            className="relative rounded-lg overflow-hidden shadow-lg group hover:scale-105 transition-all"
                            data-aos="fade-up" // AOS animation for fade-up
                        >
                            <img
                                className="w-full px-4 h-64 object-cover transform transition-transform duration-300"
                                src={offer.imageUrl}
                                alt={offer.title}
                            />
                            <div className="absolute inset-0 bg-black opacity-50"></div>
                            <div className="absolute bottom-0 left-0 w-full bg-opacity-70 p-4">
                                <h3 className="text-xl font-semibold">{offer.title}</h3>
                                <p className="text-sm mt-2">{offer.description}</p>
                                <span className="block mt-4 text-xl font-bold text-yellow-400">{offer.discountPercentage} OFF</span>
                                <Link
                                    to={offer.link}
                                    className="inline-block mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default OfferSection;

