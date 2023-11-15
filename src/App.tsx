import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signin from './signin'
import Signup from './signup'
import Layout from './layout'
import Home from './Home'



const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout/>
    ),
    children: [
      {
        path:"/home",
        element:<Home/>,
      }
    ]
  },
  {
    path: "/signin",
    element: <Signin />
  },
  {
    path: "/signup",
    element: <Signup />

  }
])

function App() {


  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
