import { emailRegex } from '@netsu/js-utils';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { MethodSetUserCreateModel, MethodSetUserUpdateProfileModel, UserProfileModel } from '../models';
import { clientContentError, noAuthError, notFoundError } from '/imports/utils/serverErrors';
import { currentUserAsync } from '/server/utils/meteor';

Meteor.methods({
    'set.user.create': async function ({ email, password, firstName, lastName }: MethodSetUserCreateModel) {
        const cleanedEmail = email.trim();

        if (!emailRegex.test(cleanedEmail)) {
            return clientContentError('Email is invalid');
        }

        if (password.length < 8) {
            return clientContentError('Password is too short');
        }

        await Accounts.createUserAsync({
            email,
            password,
        });

        const newUser = await Meteor.users.findOneAsync({ 'emails.address': email });

        if (!newUser) return notFoundError('new user');

        const profile: UserProfileModel = {
            firstName,
            lastName,
        };

        await Meteor.users.updateAsync(newUser._id, {
            $set: {
                profile,
            },
        });
    },
    'set.user.updateProfile': async function ({ userId, update }: MethodSetUserUpdateProfileModel) {
        check(userId, String);

        const currentUser = await currentUserAsync();

        if (!currentUser) return noAuthError();

        const updateUser = await Meteor.users.findOneAsync(userId);

        if (!updateUser) return notFoundError('user');

        await Meteor.users.updateAsync(userId, {
            $set: {
                profile: update,
            },
        });
    },
});
