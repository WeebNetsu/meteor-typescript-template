import { Meteor } from 'meteor/meteor';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage';
import { UserModel } from '/imports/api/users/models';
import { AvailableCollectionNames, MethodUtilMethodsFindCollectionModel } from '/imports/api/utils/models';
import { ComponentProps } from '/imports/types/interfaces';
import { errorResponse } from '/imports/utils/errors';
import { getUserFullName } from '/imports/utils/meteor';

export interface EditUserPageProps extends ComponentProps {}

const EditUserPage: React.FC<EditUserPageProps> = () => {
    const { userId } = useParams();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<UserModel | undefined>();

    const fetchData = async (silent = false) => {
        if (!userId) return;
        if (!silent) setLoading(true);

        try {
            const data: MethodUtilMethodsFindCollectionModel = {
                collection: AvailableCollectionNames.USERS,
                selector: userId,
                onlyOne: true,
            };

            const res: UserModel = await Meteor.callAsync('utilMethods.findCollection', data);

            setUser(res);
        } catch (error) {
            errorResponse(error as Meteor.Error, 'Could not get users');
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!userId) return <p>No user identifier given</p>;
    if (loading) return <p>loading</p>;
    if (!user) return <NotFoundPage message="The user you were looking for could not be found" />;

    return (
        <div>
            <p>Edit page for {getUserFullName(user)}</p>
        </div>
    );
};

export default EditUserPage;
