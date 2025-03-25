
import { persistCombineReducers } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import user from './modules/user';
import loader from './modules/loader';
import search from './modules/search';

const userPersistConfig = {
    key: 'admin-app',
    storage: storageSession, // Use sessionStorage
    blacklist: ['loader'],
};

export default persistCombineReducers(userPersistConfig, {
    loader,
    user,
    search
});