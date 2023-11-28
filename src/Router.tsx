import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from "./App";
import Home from './route/home';
import Signin from './route/Signin';
import Signup from './route/Signup';
import Product from './route/product';
import List from './route/List';
import Cart from './route/Cart';
import QnA from './route/Qna';
import Search from './route/search';
import Order from './route/order';
import Notice from './route/Notice';
import Kakao from './route/Kakao';
import Buy from './route/Buy';




const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "signin",
        element: <Signin />
      },
      {
        path: "signup",
        element: <Signup />
      },
      {
        path: "product/:id",
        element: <Product />
      },
      {
        path: "list/:number",
        element: <List />
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "question",
        element: <QnA />
      },
      {
        path: "search",
        element: <Search />
      },
      {
        path: "order/:id",
        element: <Order />
      },
      {
        path: "notice",
        element: <Notice />
      },
      {
        path: "user/kakao-login",
        element: <Kakao />
      },
      {
        path: "buy",
        element: <Buy />
      }
    ]
  },
]);

export default router;