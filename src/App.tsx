import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signin from './signin'
import Layout from './layout'
import Signup from './signup'


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout />
    )
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
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
