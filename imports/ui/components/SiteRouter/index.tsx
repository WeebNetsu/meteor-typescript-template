import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Route, Switch } from 'wouter';
import RouteRenderer from '../RouteRenderer';
import UserContextProvider, { useUserContext } from '../UserContextProvider';
import { protectedRoutes, publicRoutes } from '/imports/utils/constants/routes';

const SiteRouter: React.FC = () => {
    const { userId } = useUserContext();

    // user is not logged in
    if (userId === null) {
        // you can add any config providers here to cover all public routes
        return (
            <div>
                <Switch>
                    {Object.values(publicRoutes).map((route) => (
                        <Route key={route.path} path={route.path}>
                            {route.element}
                        </Route>
                    ))}
                </Switch>

                <ToastContainer />
            </div>
        );
    }

    // still loading data from backend
    if (!userId) return <p>Loading</p>;

    // you can add any config providers here to cover all protected routes
    return (
        <UserContextProvider>
            <Switch>
                {Object.values(protectedRoutes).map((route) => (
                    <Route key={route.path} path={route.path}>
                        <RouteRenderer>{route.element}</RouteRenderer>
                    </Route>
                ))}
            </Switch>

            <ToastContainer />
        </UserContextProvider>
    );
};

export default SiteRouter;
