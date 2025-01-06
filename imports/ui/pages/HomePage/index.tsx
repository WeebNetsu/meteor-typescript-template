import { Meteor } from 'meteor/meteor';
import React, { useEffect, useState } from 'react';
import NotFoundPage from '../NotFoundPage';
import { UserModel } from '/imports/api/users/models';
import { SITE_NAME } from '/imports/utils/constants';
import { errorResponse } from '/imports/utils/errors';

const HomePage: React.FC = () => {
    const [user, setUser] = useState<UserModel | undefined>();

    const fetchData = async () => {
        try {
            const res: UserModel | undefined = await Meteor.callAsync('get.users.current');

            setUser(res);
        } catch (error) {
            errorResponse(error as Meteor.Error, 'Could not get your account');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!user) return <NotFoundPage message="No Access To This Page" />;

    return (
        <div>
            <p>
                Hello {user.profile.firstName}, welcome to {SITE_NAME}
            </p>

            <div>
                <button onClick={() => Meteor.logout()} type="button">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default HomePage;
