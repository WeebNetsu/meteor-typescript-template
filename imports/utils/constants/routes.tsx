import React from 'react';
import AdminPage from '../../ui/pages/AdminPage';
import EditUserPage from '/imports/ui/pages/EditUserPage';
import HomePage from '/imports/ui/pages/HomePage';
import LoginPage from '/imports/ui/pages/LoginPage';
import NotFoundPage from '/imports/ui/pages/NotFoundPage';
import UsersPage from '/imports/ui/pages/UsersPage';

/**
 * User does not have to be logged in to view these routes
 */
export const publicRoutes = {
    default: {
        path: '*',
        element: (<LoginPage />) as React.ReactNode,
    },
    login: {
        path: '/login',
        element: (<LoginPage />) as React.ReactNode,
    },
    signup: {
        path: '/signup',
        element: (<LoginPage />) as React.ReactNode,
    },
};

/**
 * User has to be logged in to view these routes
 */
export const protectedRoutes = {
    default: {
        path: '*',
        element: (<NotFoundPage />) as React.ReactNode,
    },
    home: {
        path: '/',
        element: (<HomePage />) as React.ReactNode,
    },
    users: {
        path: '/users',
        element: (<UsersPage />) as React.ReactNode,
    },
    editUser: {
        path: '/users/:userId',
        element: (<EditUserPage />) as React.ReactNode,
    },
    admin: {
        path: '/admin',
        element: (<AdminPage />) as React.ReactNode,
    },
};
