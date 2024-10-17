import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import store from './app/store'
import { Provider } from 'react-redux'
// import Layout, { loader as layoutLoader } from "./app/components/layout";
// @ts-ignore
import Layout from "./app/components/Layout";
import ErrorPage from "./app/pages/404";
// import Contact from "./app/routes/contact";


import "./index.css";
import Login from "./app/features/auth/components/Login";
import Dashboard from "./app/pages/Dashboard";
// import Cart from "./app/features/cart/components/Cart";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        // loader: layoutLoader,
        children: [
            {
                path: "/",
                element: <Dashboard />,
            },
            // {
            //     path: "contacts/:contactId",
            //     element: <Contact />,
            // },
            // {
            //     path: "cart",
            //     element: <Cart name="test" />
            //
            // }
        ],
    },
    {
        path: "/auth",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
        ]
    }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
