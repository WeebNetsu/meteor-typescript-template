import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { UserModel } from '../api/users/models';

/**
 * Get a users email.
 *
 * NOTE: This will return the users *first* email, so it may return unexpected
 * results if the user has multiple emails
 *
 * @param user Meteor user model
 * @returns user email
 */
export const getUserEmail = (user: UserModel | undefined) => {
    return _.first(user?.emails)?.address;
};

/**
 * This will find a user by their ID, equivalent to
 * `Meteor.users.findOne(userId) as unknown as UserModel | undefined`
 *
 * @param userId ID of user to find
 * @returns user
 */
export const getUserById = (userId: string) => {
    return Meteor.users.findOne(userId) as unknown as UserModel | undefined;
};
