import { Link } from "react-router-dom";


const Error = () => {
    return (
        <div className="min-h-screen w-full container mx-auto items-center my-10 text-center justify-center space-y-4">
            <h2 className="text-5xl text-red-500">404 page</h2>
            <Link to='/' className="btn btn-warning">Back to Home</Link>
        </div>
    );
};

export default Error;