
import { IReducerActionType } from 'interfaces';

const loadingReducer = (state=false,action:IReducerActionType) => {
    switch (action.type) {
        case "CHANGE_LOADING_STATUS":
            state=action.payload
            return state;

            case "GET_LOADING_STATUS":
            return state;
    
        default:
            return state;
    }
}

export default loadingReducer