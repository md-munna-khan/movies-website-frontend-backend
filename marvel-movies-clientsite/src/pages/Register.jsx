

import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../layouts/AuthProvider";
import DynamicTittle from "../components/DynamicTitle";
import googleImage from '../../public/googleimg.png'

const Register = () => {
  const { createNewUser, signInWithGoogle, updateUserProfile, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    
    // Clear previous messages
    setErrorMessage('');
    setSuccessMessage('');

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage("Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.");
      toast.error("Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.");
      return;
    }

    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);

        updateUserProfile({
          displayName: name,
          photoURL: photo
        }).then(() => {
          setSuccessMessage("Your Registration is successful!");
          toast.success("Your Registration is successful!");
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }).catch((error) => {
          setErrorMessage(error.message);
          toast.error(error.message);
        });
      })
      .catch((error) => {
        setErrorMessage(error.message);
        toast.error(error.message);
      });
  };

  const handleGoggleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        setSuccessMessage("Google login successful!");
        toast.success("Google login successful!");
        setTimeout(() => {
          navigate('/');
        }, 2000);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        toast.error(error.message);
        console.log(error)
      });
  };

  return (
    <div>
      <DynamicTittle></DynamicTittle>
      <div className="min-h-screen flex my-10 justify-center">
        <div className="hero shadow-lg">
          <div className="hero-content flex-col">
            <div className="card bg-base-100 my-10 w-full max-w-lg shrink-0 shadow-2xl lg:p-10">
              <form onSubmit={handleRegister} className="card-body w-full pt-5">
                <h1 className="lg:text-5xl md:text-2xl font-bold">Register now!</h1>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input type="text" placeholder="name" name="name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Photo</span>
                  </label>
                  <input type="text" placeholder="photo" name="photo" className="input input-bordered" required />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                </div>
                <div className="form-control mt-6">
                  <button className="btn text-white bg-red-500">Register</button>
                </div>
                <p>Already have an account? Please <Link className="text-red-600" to="/login">Login</Link></p>
              
              
                <button type="button" onClick={handleGoggleSignIn} className="border flex justify-center rounded-lg items-center p-2 my-2 font-bold">
                <img className="w-6 ml-2" src={googleImage} alt="" /> Log In With Google
                 
                </button>
                
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Register;
