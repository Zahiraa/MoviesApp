import {createStore} from 'redux';
import {persistCombineReducers} from 'redux-persist';
import toggleFavorite from './Reducers/favoriteReducer';
import avatarPic from './Reducers/avatarReducer';
//import storage from 'redux-persist/lib/storage';
import { AsyncStorage } from 'react-native';



const rootPersistConfig={
 key: 'root',
 storage:AsyncStorage
}
export default createStore(persistCombineReducers(rootPersistConfig,{toggleFavorite,avatarPic}))
