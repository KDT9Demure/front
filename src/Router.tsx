import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from "./App";
import Home from './route/home';
import Signin from './route/signin';
import Signup from './signup';




const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
    children: [
      {
        path:"",
        element:<Home/>,
      },
      {
        path:"signin",
        element: <Signin/>
      },
      {
        path:"signup",
        element: <Signup/>
      }
    ]
  },
]);

export default router;