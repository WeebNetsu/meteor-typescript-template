/* eslint-disable import/prefer-default-export */
import { Meteor } from 'meteor/meteor';
import { MethodSetUserCreateModel } from '/imports/api/users/models';

export const createDefaultAdminAccount = async () => {
    const dataAdmin: MethodSetUserCreateModel = {
        email: 'admin@gmail.com',
        password: 'password',
        firstName: 'Admin',
        lastName: 'Account',
    };

    await Meteor.callAsync('set.user.create', dataAdmin);
};
