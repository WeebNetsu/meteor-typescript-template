import React from 'react';
import { ToastContainer } from 'react-toastify';
import SiteRouter from './components/SiteRouter';
import UserContextProvider from './components/UserContextProvider';

const App: React.FC = () => {
    return (
        // make sure that we can access the user id
        <UserContextProvider>
            <SiteRouter />
            <ToastContainer />
        </UserContextProvider>
    );
};

export default App;
