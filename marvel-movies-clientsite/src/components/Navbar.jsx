

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../layouts/AuthProvider";
import { FaBars, FaUserCircle } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { CiDark } from "react-icons/ci";
import { MdOutlineLightMode } from "react-icons/md";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const { user, logOut, setIsdark, isdark } = useContext(AuthContext);

  const handleToggleUser = () => {
    setIsHidden(!isHidden);
    setIsShow(false);
  };

  const handleToggleBar = () => {
    setIsShow(!isShow);
    setIsHidden(true);
  };

  const handleSignOutUser = () => {
    logOut();
    toast.success("You have logged out successfully!");
    navigate("/");
    window.scrollTo(0, 0);
  };

  const handleDarkModeToggle = () => {
    setIsdark(!isdark); // Toggle dark mode state
  };

  useEffect(() => {
    if (user && user.displayName) {
      toast.success(`Hey! Welcome, ${user.displayName}`);
    }
  }, [user]);

  // Close the mobile menu on link click
  const handleLinkClick = () => {
    setIsShow(false); // Close the mobile menu
    setIsHidden(true); // Hide the user info dropdown (if visible)
  };

  return (
    <header   className="fixed  w-11/12 mx-auto  top-0 z-50 backdrop-blur-sm mb-10">
   <div className="   bg-opacity-50     ">
   <section className={`shadow w-full left-0 my-8  ${isdark ? 'bg-black text-white' : ''} px-4 py-5`}>
        <nav className="flex justify-between items-center">
          <div>
            <Link className="logo flex items-center" to="/">
              <div className="text-xl flex md:text-2xl text-red-500 font-semibold">
                MARVEL MOVIES
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="lg:flex space-x-4 font-bold text-red-500 hidden">
            <NavLink to="/" className="px-4 py-2" onClick={handleLinkClick} activeClassName="text-red-500">Home</NavLink>
            {!user && (
              <>
                <NavLink to="/login" className="px-4 py-2" onClick={handleLinkClick} activeClassName="text-red-500">Login</NavLink>
                <NavLink to="/register" className="px-4 py-2" onClick={handleLinkClick} activeClassName="text-red-500">Register</NavLink>
              </>
            )}
            {user && (
              <>
                <NavLink to="/movies" className="px-4 py-2" onClick={handleLinkClick} activeClassName="text-red-500">Add Movies</NavLink>
                <NavLink to="/favorites" className="px-4 py-2" onClick={handleLinkClick} activeClassName="text-red-500">My Favorites</NavLink>
                <NavLink to="/all-movies" className="px-4 py-2" onClick={handleLinkClick} activeClassName="text-red-500">All Movies</NavLink>
                <NavLink to="/cartoon" className="px-4 py-2" onClick={handleLinkClick} activeClassName="text-red-500">Cartoon Movies</NavLink>
              </>
            )}
          </div>

          {/* User Info and Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <div onClick={handleDarkModeToggle} className="cursor-pointer text-2xl">
              {isdark ? <MdOutlineLightMode /> : <CiDark />}
            </div>

            {/* User Icon for Desktop and Mobile */}
            {user ? (
              <div className="relative">
                {/* Display user photo */}
                {user.photoURL ?  (
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-8 h-8 rounded-full cursor-pointer"
                    onClick={handleToggleUser}
                  />
                
                )
              
                  
                : (
                  <FaUserCircle
                    onClick={handleToggleUser}
                    className={`text-3xl cursor-pointer ${!isHidden ? 'text-blue-500' : 'text-black'}`}
                  />
                )}
                
                <div
                  className={`absolute top-10 right-0  bg-white shadow-lg rounded-md  ${!isHidden ? 'block' : 'hidden'}`}
                >
                  <div className="flex justify-center p-8 flex-col items-center ">
                    <img className="w-24 h-14 rounded-full mb-2" src={user?.photoURL} alt="User" />
                    <p className="text-slate-800 font-light text-sm">{user?.displayName || user?.email}</p>
                    <div onClick={() => setIsHidden(true)} className="absolute top-2 right-2 cursor-pointer text-xl">
                      <RxCross1 />
                    </div>
                  </div>
                  <button
                    onClick={handleSignOutUser}
                    className="w-full text-sm py-2 border bg-red-600  text-white"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="lg:flex space-y-2 gap-4 items-center font-semibold">
                <button className="p-2 btn rounded-sm bg-red-600 text-white">
                  <NavLink to="/login" onClick={handleLinkClick}>Log In</NavLink>
                </button>
                {/* <button className="p-2 btn rounded-sm bg-blue-600 text-white">
                  <NavLink to="/register" onClick={handleLinkClick}>Register</NavLink>
                </button> */}
              </div>
            )}

            {/* Hamburger Menu Icon for Mobile */}
            <div onClick={handleToggleBar} className={`lg:hidden cursor-pointer text-xl ${isdark ? 'text-white' : ''}`}>
              {isShow ? <RxCross1 /> : <FaBars />}
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`absolute top-[80px] left-0 w-full text-white bg-gray-800 py-5 ${isShow ? 'block' : 'hidden'} lg:hidden ${isdark ? 'bg-black text-white' : ''}`}>
          <div className='text-center space-y-5 flex flex-col'>
            <NavLink to="/" className="px-4 py-2" onClick={handleLinkClick} activeClassName="text-red-500">Home</NavLink>
            {!user && (
              <>
                <NavLink to="/login" className="px-4 py-2" onClick={handleLinkClick} activeClassName="text-red-500">Login</NavLink>
                <NavLink to="/register" className="px-4 py-2" onClick={handleLinkClick} activeClassName="text-red-500">Register</NavLink>
              </>
            )}
            {user && (
              <>
                <NavLink to="/movies" className="px-4 py-2" onClick={handleLinkClick} activeClassName="text-red-500">Add Movies</NavLink>
                <NavLink to="/favorites" className="px-4 py-2" onClick={handleLinkClick} activeClassName="text-red-500">My Favorites</NavLink>
                <NavLink to="/all-movies" className="px-4 py-2" onClick={handleLinkClick} activeClassName="text-red-500">All Movies</NavLink>
                <NavLink to="/cartoon" className="px-4 py-2" onClick={handleLinkClick} activeClassName="text-red-500">Cartoon Movies</NavLink>
              </>
            )}
          </div>
        </div>
      </section>
   </div>
    </header>
  );
};

export default Navbar;









{/* <section className={`shadow w-full left-0 my-8 z-50  bg-opacity-70 fixed bg-white -top-[40px]  ${isdark ? 'bg-black text-white' : ''} px-4 py-5`}> */}