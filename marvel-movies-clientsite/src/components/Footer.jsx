import { useContext } from "react";
import { AuthContext } from "../layouts/AuthProvider";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const { isdark } = useContext(AuthContext);

  return (
    <footer className={`footer mt-2 border text-base-content p-10 ${isdark ? 'bg-black text-white' : ''}`}>
      <div className="container mx-auto lg:grid lg:grid-cols-2 lg:gap-10 space-y-8 lg:space-y-0">
        
        {/* Left Column: Marvel Movies Info and Social Links */}
        <div className="space-y-6 flex flex-col lg:space-y-8">
          <p className="text-red-500 text-4xl font-semibold uppercase">Marvel Movies</p>
          <p className="text-lg">Providing thrilling cinematic experiences since 1992</p>

          {/* Our Story */}
          <div className="our-story text-sm text-white-600">
            <h6 className=" text-xl text-red-600 font-semibold">Our Story</h6>
            <p>
              Marvel Movies has been at the forefront of action-packed storytelling for over three decades.
              From iconic superheroes to epic sagas, we continue to create cinematic experiences that captivate audiences worldwide.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="social-icons flex gap-6 text-xl text-white-600">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </a>
          </div>

          {/* Copyright */}
          <div className="footer-bottom mt-8 text-center lg:text-left text-sm text-white-600">
            <p>&copy; 2024 Marvel Movies. All rights reserved.</p>
          </div>
        </div>

        {/* Right Column: Upcoming Releases and Join the Community */}
        <div className={`space-y-6 flex flex-col hidden md:block lg:space-y-8`}>
          {/* Upcoming Releases Section */}
          <div className="upcoming-releases  text-sm text-white-600">
            <h6 className=" text-xl text-red-500 font-semibold">Upcoming Releases</h6>
            <p>
              Get ready for the next big cinematic release! Stay tuned for the upcoming Marvel blockbusters, featuring your favorite superheroes.
            </p>
          </div>

          {/* Join the Community Section */}
          <div className="join-community text-sm text-white-600">
            <h6 className=" text-xl text-red-500 font-semibold">Join the Community</h6>
            <p>
              Be part of the Marvel Universe! Connect with fellow fans, discuss the latest movies, and share your love for Marvel on our official forums.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;