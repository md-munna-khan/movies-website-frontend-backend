import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";


const MainLayout = () => {
    const {isdark}=useContext(AuthContext)
    return (
        <div >
         <nav className="w-11/12 mx-auto ">
<Navbar></Navbar>
         </nav>
         <main className={`w-11/12 mx-auto my-4 ${isdark? 'bg-blue text-white': '' }`}>
            <Outlet></Outlet>
         </main>
       <footer>  <Footer></Footer></footer>
        </div>
    );
};

export default MainLayout;