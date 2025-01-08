import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from './layouts/MainLayout';
import Home from './components/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthProvider from './layouts/AuthProvider';
import Error from './components/Error';

import AddMovies from './movies/AddMovies';
import MyFavorite from './movies/MyFavorites';
import PrivateRoute from './layouts/PrivateRoute';

import AllMovies from './movies/AllMovies';
import MovieDetail from './movies/MovieDetail';
import UpdateMovies from './movies/UpdateMovies';
import CartoonMovies from './movies/CartoonMovies';
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement:<Error></Error>,
    children:[
      {
        path:'/',
        element:<Home></Home>,
        loader:()=> fetch('https://movies-serversite.vercel.app/add')
      },
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/register',
        element:<Register></Register>
      },
      {
        path:'/cartoon',
        element:<CartoonMovies></CartoonMovies>
      },
      {
        path:'/movies',
        element:<PrivateRoute><AddMovies></AddMovies></PrivateRoute>,
      
      },
      {
path:'/update-movies',
element:<PrivateRoute><UpdateMovies></UpdateMovies></PrivateRoute>,
loader:({params})=> fetch(`https://movies-serversite.vercel.app/add/${params.id}`)
      },
      {
        path:'/detail/:id',
        element:<MovieDetail></MovieDetail>,
        loader:({params})=> fetch(`https://movies-serversite.vercel.app/add/${params.id}`)
       },
      {
        path:'/favorites',
        element:<PrivateRoute><MyFavorite></MyFavorite></PrivateRoute>,
       
      },
      {
        path:'/update-movies/:id',
        element:<PrivateRoute><UpdateMovies></UpdateMovies></PrivateRoute>,
      
      },
     {
path:'/all-movies',
element:<AllMovies></AllMovies>,
loader:()=>fetch('https://movies-serversite.vercel.app/add')
     },
   

    //  {
    //   path:'/details/:id',
    //   element:<PrivateRoute><MovieDetails></MovieDetails></PrivateRoute>,
    //   loader:({params})=> fetch(`https://movies-serversite.vercel.app/movies/${params.id}`)
    //  }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
<AuthProvider>
<RouterProvider router={router} />
</AuthProvider>
  </StrictMode>,
)
