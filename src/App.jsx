
import {  RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'

import { Navbar } from './Navbar/Navbar'
import Footer from './Footer/Footer'
import CreatePost from './CreatePost/CreatePost'
import Media from './Media/Media'
import Home from '../src/Home/Home'
import AboutMe from './AboutMe/AboutMe'
import Login from './login/Login'
import PrivateRoute from './routes/PrivateRoute'
import ErrorPage from './ErrorPage/ErrorPage'


function App() {
  const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
       <Navbar></Navbar>
        <Home></Home>
        <Footer></Footer>
      </>
    ),
    },
    {
       path:'/',
       element: <Home></Home>
    },
    {
       path:'/home',
       element: <Home></Home>
    },
    {
       path:'/createpost',
       element: <PrivateRoute><CreatePost></CreatePost></PrivateRoute>
    },
    {
       path:'/media',
       element: <PrivateRoute><Media></Media></PrivateRoute>
    },
    {
       path:'/aboutme',
       element: <PrivateRoute><AboutMe></AboutMe></PrivateRoute>
    },
    {
       path:'/errorPage',
       element: <ErrorPage></ErrorPage>
    },
    {
       path:'/login',
       element: <Login></Login>
    },
   

  

   ])

  return (
  <div className="">
     <RouterProvider router={router}></RouterProvider>
  </div>
  )
}

export default App
