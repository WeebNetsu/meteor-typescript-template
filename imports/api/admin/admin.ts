import { Mongo } from 'meteor/mongo';
import { AvailableCollectionNames } from '../utils/models';
import AdminModel from './models';

const AdminCollection = new Mongo.Collection<AdminModel>(AvailableCollectionNames.ADMIN);

export default AdminCollection;
