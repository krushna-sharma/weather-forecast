import { IReducerActionType } from "interfaces";
import { actionTypes } from "actions/actionTypes";

// let initialState = {
//     data:[]
// }

const weatherReducer = (state = {}, action: IReducerActionType) => {

    switch (action.type) {
        case actionTypes.ADD_WEATHER_DATA: {
            let { cityName, data } = action.payload
            // console.log(cityName,data)
            let dataObj = {
                [cityName]:[data]
            }

            state = Object.assign({},state,dataObj);
            // let weatherData: any = state
            // weatherData[cityName] =  { data: data } 
            // console.log(weatherData)
            // state = action.payload.data
            return state
            // return weatherData
        }

        case actionTypes.WEATHER_DATA: {
            return state
        }

        default:
            return state;
    }

}

export default weatherReducer;