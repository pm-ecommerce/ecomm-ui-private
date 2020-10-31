import { combineReducers } from 'redux';
import todo from './todo';
import category from './category';
import userInfo from './userInfo';


export default combineReducers({
    todo,
    category,
    userInfo
});