import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import movie7 from '../assets/movie7.jpg';
import movie5 from '../assets/movie5.jpg';
import movie6 from '../assets/movie6.jpg';
import { useContext, useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import DynamicTittle from './DynamicTitle';
import ReactStars from "react-stars";
import { AuthContext } from '../layouts/AuthProvider';
import faq from '../../public/FAQs-cuate.png';
import OfferSection from '../movies/OfferSection';
import MovieSeriesSection from '../movies/MovieSeriesSection';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

const Home = () => {
  const { isdark } = useContext(AuthContext);
  const data = useLoaderData();
  const [movies, setMovies] = useState([]);
  const [comingMovies, setComingMovies] = useState([]);

  useEffect(() => {
    setMovies(data);
  }, [data]);

  const sortedMovies = movies.sort((a, b) => b.rating - a.rating).slice(0, 8);

  useEffect(() => {
    fetch('https://movies-serversite.vercel.app/coming-movies')
      .then(res => res.json())
      .then(data => setComingMovies(data));
  }, []);
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in ms
      once: false,    // Whether animation should happen only once
    });
  }, []);
  return (
    <>
      <div className={`w-11/12 mx-auto my-10 overflow-hidden   ${isdark ? 'bg-black text-white' : ''}`}>
        <DynamicTittle></DynamicTittle>

        <section className="banner mx-auto">
          <div className="flex items-center justify-center">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              spaceBetween={50}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log('slide change')}
            >
              <SwiperSlide>
                <div className="relative">
                  <img src={movie7} alt="Movie 1" className="w-full h-64 md:h-96 lg:h-[800px] object-cover" style={{ objectFit: 'cover' }} />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                    <div className="text-left text-white">
                      <h2 className="text-2xl md:text-5xl font-bold">Avengers</h2>
                      <p className="mt-2 text-sm md:text-xl">Superman: Doomsday (2007) BluRay 480p & 720p | GDrive</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="relative">
                  <img src={movie5} alt="Movie 2" className="w-full h-64 md:h-96 lg:h-[800px] object-cover" style={{ objectFit: 'cover' }} />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                    <div className="text-left text-white">
                      <h2 className="text-2xl md:text-5xl font-bold">Captain America</h2>
                      <p className="mt-2 text-sm md:text-xl">Captain America: Civil War (2016) Dual Audio BluRay 480p, 720p & 1080p [Hindi-English] | GDrive</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="relative">
                  <img src={movie6} alt="Movie 3" className="w-full h-64 md:h-96 lg:h-[800px] object-cover" style={{ objectFit: 'cover' }} />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                    <div className="text-left text-white">
                      <h2 className="text-2xl md:text-5xl font-bold">Thor</h2>
                      <p className="mt-2 text-sm md:text-xl">Thor: Love and Thunder (2022) Dual Audio [Hindi ORG & ENG] IMAX WEB-DL 300MB 360p, 480p, 720p, 1080p & 2160p 4K UHD | GDrive</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </section>

      
     
<section className="py-10">
  <h2 className="lg:text-4xl bg-red-600 text-3xl text-center my-4">Featured Movies</h2>
  <div className="grid relative grid-cols-1 md:grid-cols-3 lg:grid-cols-4 items-start gap-6 shadow-md">
    {sortedMovies.map((movie, index) => (
      <div
        className="  shadow-lg rounded-lg overflow-hidden"
        key={movie._id}
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
          <h3 className="text-lg font-semibold truncate mb-2">{movie.title}</h3>

          {/* Dual Audio Label */}
          <div className=" absolute  top-0">
            <span className="inline-block  bg-red-500 text-black px-2 py-1 text-xs font-bold rounded">
              Dual Audio ORG
            </span>
          </div>

          {/* Details */}
          <div className="text-sm  mb-4">
            <p>Genre: {movie.genre}</p>
            <p>Release Year: {movie.release}</p>
          <div className='absolute top-0 right-0 text-white px-2 py-1 bg-gray-800'>  <p>{movie.duration} mins</p></div>
          </div>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <span className="bg-yellow-400 text-black px-2 py-1 rounded-md text-xs font-bold mr-2">
              {movie.rating}
            </span>
            <ReactStars
              count={5}
              value={parseInt(movie.rating)}
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



        <div className="mx-auto text-center">
          <Link to="/all-movies" className="mt-4 inline-block specialGradient text-white py-2 px-4 rounded hover:bg-blue-700 transition">
            See All Movies
          </Link>
        </div>

        <section className="my-10" data-aos="zoom-in-up">
          <h2 className="lg:text-5xl text-3xl text-center text-red-600 mb-8">Coming Soon Movies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shadow-md p-2 text-white">
            {comingMovies.map(coming => (
              <div className="relative bg-black text-bg-black shadow-lg rounded-lg overflow-hidden" key={coming._id}>
                <img src={coming.Poster} alt={coming.Title} className="w-full h-64 object-cover transform transition-transform duration-300 hover:scale-105" />
                <div className="absolute top-0 left-0 bg-red-500 text-bg-black px-2 py-1 text-xs font-bold">
                  Dual Audio ORG
                </div>
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 ">
                  <h3 className="text-lg font-semibold truncate">{coming.Title}</h3>
                  <p className="text-sm">{coming.ReleaseYear}</p>
                  <div className="flex items-center mt-2">
                    <span className="bg-yellow-400 text-black px-2 py-1 rounded-md text-xs font-bold mr-2"> Rating {coming.Rating}</span>
                    <span className="text-xs">{coming.ReleaseYear}</span>
                  </div>
                  <div className="flex justify-between items-center p-2">
                    <p className="mt-2 text-sm">Genre: {coming.Genre}</p>
                    <p className="mt-1 text-sm">Duration: {coming.Duration} mins</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
  {/* offer section */}
  <OfferSection></OfferSection>
        <MovieSeriesSection></MovieSeriesSection>
        <div className="grid grid-cols-12 my-10"data-aos="slide-left">
          <div className="md:col-span-5 col-span-12 "  data-aos="slide-right">
            <img src={faq} alt="" />
          </div>
          <section className={`py-10 col-span-12 md:col-span-7 shadow-2xl text-bg-black p-4 rounded-md ${isdark? 'text-red': ''}`}>
      <h2 className="text-4xl text-center text-red-500 my-6">Movies Related Questions</h2>

      <div className="collapse collapse-plus text-bg-black">
        <input type="radio" name="my-accordion" id="faq-1" defaultChecked />
        <div className="collapse-title text-xl font-medium">
          What is the difference between a movie's genre and its rating?
        </div>
        <div className="collapse-content">
          <p>
            A movie's genre refers to its category based on its content, such as action, drama, comedy, thriller, etc.
            The rating, on the other hand, represents how suitable the movie is for different audiences based on content like violence, language, or nudity.
          </p>
        </div>
      </div>

      <div className="collapse collapse-plus text-bg-black">
        <input type="radio" name="my-accordion" id="faq-2" />
        <div className="collapse-title text-xl font-medium">
          How are movie release dates determined?
        </div>
        <div className="collapse-content">
          <p>
            Movie release dates are often decided based on factors like production schedules, marketing strategies, and
            competition with other film releases. Studios may choose to release movies during holidays or specific seasons
            to attract a larger audience.
          </p>
        </div>
      </div>

      <div className="collapse collapse-plus bg-base-2">
        <input type="radio" name="my-accordion" id="faq-3" />
        <div className="collapse-title text-xl font-medium">
          What does Dual Audio mean for a movie?
        </div>
        <div className="collapse-content">
          <p>
            Dual Audio refers to a version of a movie that offers two different audio tracks, typically one in the original
            language and the other dubbed in a secondary language. This allows viewers to choose their preferred language when
            watching the movie.
          </p>
        </div>
      </div>

      <div className="collapse collapse-plus text-bg-black">
        <input type="radio" name="my-accordion" id="faq-4" />
        <div className="collapse-title text-xl font-medium">
          How do movie ratings affect viewing choices?
        </div>
        <div className="collapse-content">
          <p>
            Movie ratings, such as PG, PG-13, R, or NC-17, provide guidance on the suitability of the film for different age
            groups. For example, PG-rated movies are generally suitable for all audiences, while R-rated films may contain
            mature content that is more appropriate for adults or older teens.
          </p>
        </div>
      </div>

      <div className="collapse collapse-plus text-bg-black">
        <input type="radio" name="my-accordion" id="faq-5" />
        <div className="collapse-title text-xl font-medium">
          What should I look for in a movie’s summary?
        </div>
        <div className="collapse-content">
          <p>
            A movie summary typically provides a brief description of the plot, key characters, and setting. It helps you decide
            whether you're interested in the film based on its storyline, theme, or genre. It's a quick way to understand the
            essence of the movie without giving away too many spoilers.
          </p>
        </div>
      </div>

      <div className="collapse collapse-plus text-bg-black">
        <input type="radio" name="my-accordion" id="faq-6" />
        <div className="collapse-title text-xl font-medium">
          Why are some movies longer than others?
        </div>
        <div className="collapse-content">
          <p>
            The length of a movie depends on its story, pacing, and production choices. Movies with complex plots, multiple
            subplots, or detailed character development tend to be longer, while films with a simpler storyline may be shorter.
            Directors and producers decide the runtime based on what best serves the story they want to tell.
          </p>
        </div>
      </div>
    </section>
        </div>

      
      </div>
    </>
  );
};

export default Home;





