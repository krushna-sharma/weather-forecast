
import { IReducerActionType } from 'interfaces';
import { actionTypes } from 'actions/actionTypes';

const selectedCardReducer = (state=0,action:IReducerActionType) => {
    switch (action.type) {
        case actionTypes.CHANGE_SELECTED_CARD_NO:
            state=action.payload
            return state;
    
        default:
            return state;
    }
}

export default selectedCardReducer