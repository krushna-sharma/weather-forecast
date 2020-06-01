import { combineReducers } from 'redux';
import userReducer from './userReducer';
import weatherReducer from './weatherReducer';
import cityReducer from './cityReducer';

const allReducers = combineReducers({
    user: userReducer,
    weather:weatherReducer,
    city:cityReducer
});

export default allReducers;
