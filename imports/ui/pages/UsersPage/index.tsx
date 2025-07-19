import React from 'react';
import { useLocation } from 'wouter';
import { useUserContext } from '../../components/UserContextProvider';
import { protectedRoutes } from '/imports/utils/constants/routes';

const UsersPage: React.FC = () => {
    const [location, navigate] = useLocation();
    const { userId } = useUserContext();

    if (!userId) return <p>Please login to view this page</p>;

    return (
        <div style={{ width: '100%' }}>
            <h2>Users Page</h2>

            <p>
                Edit user example:{' '}
                <button
                    onClick={() => {
                        navigate(protectedRoutes.editUser.path.replace(':userId', userId));
                    }}
                    type="button"
                >
                    Go To
                </button>
            </p>
        </div>
    );
};

export default UsersPage;
