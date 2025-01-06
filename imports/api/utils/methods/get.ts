import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import AdminCollection from '../../admin/admin';
import AdminModel from '../../admin/models';
import { AvailableCollectionNames, MethodUtilMethodsFindCollectionModel } from '../models';
import { MongoDBSelector } from '/imports/types/interfaces';
import { internalServerError } from '/imports/utils/serverErrors';

Meteor.methods({
    'utilMethods.findCollection': async function ({
        collection,
        onlyOne,
        selector = {},
        options = {},
        includeDeleted = false,
    }: MethodUtilMethodsFindCollectionModel) {
        const collectionMap = {
            [AvailableCollectionNames.ADMIN]: AdminCollection,
            [AvailableCollectionNames.USERS]: Meteor.users,
        };

        const collectionInstance = collectionMap[collection];

        if (!collectionInstance) {
            return internalServerError('Collection provided does not exist');
        }

        let query: MongoDBSelector = {
            _id: selector,
            $or: [
                {
                    deleted: false,
                },
                {
                    deleted: {
                        $exists: false,
                    },
                },
            ],
        };

        if (typeof selector === 'object') {
            query = {
                $and: [
                    {
                        ...selector,
                    },
                    {
                        $or: [
                            {
                                deleted: false,
                            },
                            {
                                deleted: {
                                    $exists: false,
                                },
                            },
                        ],
                    },
                ],
            };
        }

        if (onlyOne) {
            // we specify it as AdminModel because TypeScript is just being a big baby an doesn't
            // like to mix user model with the common folk
            const res = await (collectionInstance as Mongo.Collection<AdminModel, AdminModel>).findOneAsync(
                includeDeleted ? selector : query,
                {
                    ...options,
                    transform: undefined,
                },
            );

            return res;
        }

        const res = await collectionInstance.find(includeDeleted ? selector : query, options).fetchAsync();
        return res;
    },
});
