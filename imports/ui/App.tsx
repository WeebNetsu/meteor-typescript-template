import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { protectedRoutes, publicRoutes } from '../utils/constants/routes';
import RouteRenderer from './components/RouteRenderer';

const App: React.FC = () => {
    const userId = useTracker(() => Meteor.userId());

    const publicRouter = createBrowserRouter(Object.values(publicRoutes).map((route) => route));

    // user is not logged in
    if (userId === null) {
        // you can add any config providers here to cover all public routes
        return (
            <div>
                <RouterProvider router={publicRouter} />
                <ToastContainer />
            </div>
        );
    }

    // still loading data from backend
    if (!userId) return <p>Loading</p>;

    const protectedRouter = createBrowserRouter(
        Object.values(protectedRoutes).map((route) => ({
            ...route,
            element: <RouteRenderer>{route.element}</RouteRenderer>,
        })),
    );

    // you can add any config providers here to cover all protected routes
    return (
        <div>
            <RouterProvider router={protectedRouter} />
            <ToastContainer />
        </div>
    );
};

export default App;
