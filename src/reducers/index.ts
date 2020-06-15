import { combineReducers } from 'redux';
import userReducer from './userReducer';
import weatherReducer from './weatherReducer';
import cityReducer from './cityReducer';
import loadingReducer from './loadingReducer';
import selectedCardReducer from './selectedCardReducer'
import recentApiCallsReducer from './recentApiCallsReducer'
import languageReducer from './languageReducer';

const allReducers = combineReducers({
    user: userReducer,
    weather:weatherReducer,
    city:cityReducer,
    loading:loadingReducer,
    dataNo:selectedCardReducer,
    recentApiCalls:recentApiCallsReducer,
    language: languageReducer
});

export default allReducers;
