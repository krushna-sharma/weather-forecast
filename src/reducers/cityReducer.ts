import { IReducerActionType } from "interfaces";
import { actionTypes } from "actions/actionTypes";

const cityReducer = (state="Akola",action:IReducerActionType) => {
        switch (action.type) {
            case actionTypes.GET_CITY:{
                state = action.payload
                return state
            }
            case actionTypes.CHANGE_CITY:{
                return state
            }       
            default:
                return state;
        }
}

export default cityReducer;