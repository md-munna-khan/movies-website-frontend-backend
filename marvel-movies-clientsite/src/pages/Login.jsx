import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../layouts/AuthProvider";
import DynamicTittle from "../components/DynamicTitle";
import googleImage from '../../public/googleimg.png'

const Login = () => {
  const {signInUser,signInWithGoogle } = useContext(AuthContext)

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

    const handleLogin = e =>{
     
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(email,password)

            // Clear previous messages
    setErrorMessage('');
    setSuccessMessage('');

        signInUser(email,password)
        .then((res)=>{
          console.log(res.user)
        })
        .catch((error)=>{
          console.log(error.message)
        })
    }

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
        });
    };
    return (
        <div>
          <DynamicTittle></DynamicTittle>
                  <div className="min-h-screen my-10 flex justify-center">
       <div className="hero ">
        <div className="hero-content flex-col ">
         
          <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl lg:p-10">
            <form onSubmit={handleLogin} className="card-body lg:w-full ">
            <h1 className="lg:text-5xl md:text-2xl font-bold">Login now!</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" placeholder="email" className="input input-bordered"
                //   value={email}
                //   onChange={(e) => setEmail(e.target.value)}
                required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
               
                <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
                 {/* <label className="label">
                    {email ? (
                      <Link to='/forget/password' state={{ email }} className="label-text-alt link link-hover">Forgot password?</Link>
                    ) : (
                      <span className="label-text-alt text-gray-500 cursor-not-allowed">Forgot password?</span>
                    )}
                  </label> */}
               
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn text-white bg-red-600">Login</button>
              </div>
              <p>You Dont Have An Account Please <Link className="text-red-600" to='/register'>Register</Link></p>

              {/* {
                errorMessage && <p className="text-red-600">{errorMessage}</p>
              }
             {success && <p className="text-green-600">{success}</p>} */}
             
                <button type="button" onClick={handleGoggleSignIn} className=" border flex  justify-center rounded-lg items-center p-2 my-2  font-bold ">
                <img className="w-6 space-x-2" src={googleImage} alt="" />
                  Log In With Google</button>
            </form>
           <Toaster></Toaster>
          </div>
        </div>
      </div>
       </div>

        </div>
    );
};

export default Login;