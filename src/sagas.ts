import { call, put, takeEvery } from "redux-saga/effects"
import { actionTypes } from './actions/actionTypes';
import { Api, Method } from "helpers/apiHelper/webcall2";
import { apiList } from 'helpers/apiHelper/apiList';
import { IReducerActionType } from "interfaces";
import { showLoader, hideLoader } from "actions";
// import { addUserData } from './actions/index';

// function delay(time:number){
//     return new Promise((resolve,reject)=>{
//         setTimeout(() => {
//             resolve()
//         }, time);
//     })
// }

// function* addUser(action:any){
//     console.log("Here")
//     yield put(addUserData(action))
// }

function* addWeatherData(action: IReducerActionType) {
    // yield delay(1000)
    try {
        yield put(showLoader())
        const data = yield call(Api, apiList.GET_WEATHER_DATA.replace("{city_name}", action.payload), Method.GET, true)
        yield put(hideLoader())
        console.log(data)
        yield put({ type: actionTypes.ADD_WEATHER_DATA, payload: data.list })
    } catch (err) {
        yield put(hideLoader())
    }
}

function* changeCity(action: IReducerActionType) {
    yield put({ type: actionTypes.GET_CITY, payload: action.payload })
}

function* mySaga() {
    // yield takeEvery(actionTypes.USER_DATA,addUser)
    yield takeEvery(actionTypes.WEATHER_DATA, addWeatherData)
    yield takeEvery(actionTypes.CHANGE_CITY, changeCity)
}

export default mySaga;