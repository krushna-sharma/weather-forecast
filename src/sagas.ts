import { call, put, takeEvery } from "redux-saga/effects"
import { actionTypes } from './actions/actionTypes';
import { Api, Method } from "helpers/apiHelper/webcall2";
import { apiList } from 'helpers/apiHelper/apiList';
import { IReducerActionType } from "interfaces";
import { showLoader, hideLoader } from "actions";

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
        const dataList = yield call(Api, apiList.GET_WEATHER_DATA.replace("{city_name}", action.payload), Method.GET, true)
        yield put(hideLoader())
        yield put({ type: actionTypes.RECENT_API_CALLS, payload: action.payload });
        yield put({ type: actionTypes.ADD_WEATHER_DATA, payload: { cityName: action.payload, data: dataList.list } })
        yield put({ type: actionTypes.CHANGE_CITY, payload: action.payload })
    } catch (err) {
        yield put(hideLoader())
    }
}

function* changeCity(action: IReducerActionType) {
    yield put({ type: actionTypes.CHANGE_CITY, payload: action.payload })
}

function* mySaga() {
    // yield takeEvery(actionTypes.USER_DATA,addUser)
    yield takeEvery(actionTypes.WEATHER_DATA, addWeatherData)
    yield takeEvery(actionTypes.ASYNC_CHANGE_CITY, changeCity)
}

export default mySaga;