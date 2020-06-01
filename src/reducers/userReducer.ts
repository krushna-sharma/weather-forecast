import { IReducerActionType } from '../interfaces/index';
import LocalStorage, { IUserData } from '../helpers/LocalStorage/LocalStorageHelper';
import { actionTypes } from 'actions/actionTypes';

let initialState:IUserData = {
    name:"",
    password:""
}

const userReducer = (state = initialState, action:IReducerActionType) => {
	switch (action.type) {
		case actionTypes.ADD_NEW_USER: {
            state = action.payload
            localStorage.setItem("loggedInUser",JSON.stringify(state))
			return state;
        }
        case actionTypes.USER_DATA: {
			return state;
        }
        case actionTypes.DELETE_USER:{
            state = initialState
            new LocalStorage().clear()
            return state
        }
		default:
			return state;
	}
};

export default userReducer;
