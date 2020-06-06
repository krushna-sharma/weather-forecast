import { IReducerActionType } from "interfaces";
import { actionTypes } from "actions/actionTypes";

const cityReducer = (state="Akola",action:IReducerActionType) => {
        switch (action.type) {
            case actionTypes.CHANGE_CITY:{
                state = action.payload
                return state
            }
            case actionTypes.ASYNC_CHANGE_CITY:{
                return state
            }       
            default:
                return state;
        }
}

export default cityReducer; 