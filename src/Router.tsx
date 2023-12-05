import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from "./App";
import Home from './route/home';
import Signin from './route/signin';
import Signup from './route/signup';
import Product from './route/product';
import List from './route/list';
import Cart from './route/cart';
import QnA from './route/qna';
import Search from './route/search';
import Order from './route/order';
import Notice from './route/Notice';
import Kakao from './route/Kakao';
import Buy from './route/Buy';
import Profile from './route/Profile';
import ProfileEdit from './route/ProfileEdit';
import Event from './route/Event';
import FirstPurchase from './event/FirstPurchase';
import FindPw from './route/FindPw';
import ChristmasCoupon from './event/ChristmasCoupon';
import Showing from './route/Showing';
import Showing2 from './route/Showing2';




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
            },
            {
                path: "profile",
                element: <Profile />
            },
            {
                path: "profile/user",
                element: <ProfileEdit />
            },
            {
                path: "event",
                element: <Event />,
                children: [
                    {
                        path: "christmas",
                        element: <ChristmasCoupon />
                    },
                    {
                        path: "firstpurchase",
                        element: <FirstPurchase />
                    },
                    {
                        path: "showing",
                        element: <Showing />
                    },
                    {
                        path: "showing2",
                        element: <Showing2 />
                    }
                ]
            },
            {
                path: "find/password",
                element: <FindPw />
            },

        ]
    },
]);

export default router;