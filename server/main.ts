import { Meteor } from 'meteor/meteor';
import { createDefaultAdminAccount } from './utils/dummyData';
import '/imports/startup/imports';

Meteor.startup(async () => {
    // Deny all client-side updates to user documents (security layer)
    Meteor.users?.deny({ update: () => true });

    const adminUser = await Meteor.users.findOneAsync({ 'emails.address': 'admin@gmail.com' });

    if (!adminUser) {
        // for development only remove before production
        console.log('Creating default admin account');
        await createDefaultAdminAccount();
        console.log('[DONE] Creating default admin account');

        console.log('All default data has been created');
    }
});
