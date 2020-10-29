import { combineReducers } from 'redux';
import todo from './todo';
import category from './category';


export default combineReducers({
    todo,
    category
});