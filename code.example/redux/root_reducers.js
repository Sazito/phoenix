import {combineReducers} from 'redux';
import userReducer from './user/reducers';

export default combineReducers({
  user: userReducer
});
