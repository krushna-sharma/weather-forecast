import { IReducerActionType } from 'interfaces';
import { actionTypes } from 'actions/actionTypes';
import moment from 'moment';


const recentApiCallsReducer = (state: any = { selectedCities: [], citiesData: {} }, action: IReducerActionType) => {
    switch (action.type) {
        case actionTypes.RECENT_API_CALLS:
            let dataObj = {
                cityName: action.payload,
                timestamp: moment().format('x')
            }

            state.selectedCities.push(action.payload)
            state.citiesData[action.payload] = dataObj
            return state;

        default:
            return state;
    }
}

export default recentApiCallsReducer 