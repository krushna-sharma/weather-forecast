import { combineReducers } from 'redux';
import userReducer from './userReducer';
import weatherReducer from './weatherReducer';
import cityReducer from './cityReducer';
import loadingReducer from './loadingReducer';
import selectedCardReducer from './selectedCardReducer'

const allReducers = combineReducers({
    user: userReducer,
    weather:weatherReducer,
    city:cityReducer,
    loading:loadingReducer,
    dataNo:selectedCardReducer,
});

export default allReducers;
