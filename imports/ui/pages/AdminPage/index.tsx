import { Meteor } from 'meteor/meteor';
import React, { useEffect, useState } from 'react';
import AdminModel from '../../../api/admin/models';
import { AvailableCollectionNames, MethodUtilMethodsFindCollectionModel } from '/imports/api/utils/models';
import { errorResponse } from '/imports/utils/errors';

// this is an example of how you can decrease the amount of data you need to fetch
// when you start running into data fetching issues in the future due to large data sets
// feel free to use this method
// step 1. Define the model od the data you want
// export if we want to use it in child components
export interface MiniAdminModel extends Pick<AdminModel, '_id' | 'deleted'> {}

// step 2 define the fields
const miniAdminFields = {
    _id: 1,
    deleted: 1,
};

const AdminPage: React.FC = () => {
    const [loading, setLoading] = useState(true);
    // step 3 set the state with the correct data type
    const [admins, setAdmins] = useState<MiniAdminModel[]>([]);

    const fetchData = async (silent = false) => {
        if (!silent) setLoading(true);

        try {
            const data: MethodUtilMethodsFindCollectionModel = {
                collection: AvailableCollectionNames.ADMIN,
                selector: {},
                options: {
                    // step 4 provide fields
                    fields: miniAdminFields,
                },
            };

            const res: MiniAdminModel[] = await Meteor.callAsync('utilMethods.findCollection', data);

            setAdmins(res);
        } catch (error) {
            errorResponse(error as Meteor.Error, 'Could not get admins');
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <p>loading</p>;

    console.log(admins);

    return (
        <div>
            <p>Admins Page (Data fetched in background)</p>
        </div>
    );
};

export default AdminPage;
