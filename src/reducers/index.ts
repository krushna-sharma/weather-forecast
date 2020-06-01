import { combineReducers } from 'redux';
import userReducer from './userReducer';
import weatherReducer from './weatherReducer';
import cityReducer from './cityReducer';
import loadingReducer from './loadingReducer';

const allReducers = combineReducers({
    user: userReducer,
    weather:weatherReducer,
    city:cityReducer,
    loading:loadingReducer
});

export default allReducers;
