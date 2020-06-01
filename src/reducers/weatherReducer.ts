import { IReducerActionType } from "interfaces";
import { actionTypes } from "actions/actionTypes";

// let initialState = {
//     data:[]
// }

const weatherReducer = (state = [],action:IReducerActionType) => {

    switch (action.type) {
        case actionTypes.ADD_WEATHER_DATA:{
            let weatherData = action.payload
            state = weatherData
            return state
        }

        case actionTypes.WEATHER_DATA : {
            return state
        }

        case actionTypes.GET_WEATHER_DATA : {
            return state;
        }
    
        default:
            return state;
    }

}

export default weatherReducer;