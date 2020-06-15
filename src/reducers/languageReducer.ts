import { IReducerActionType } from '../interfaces/index';


const languageReducer = (state="hi",actions:IReducerActionType) => {
    switch (actions.type) {
        case "CHANGE_LANGUAGE":{
            state = actions.payload;
            return state;
        }
                
        default:
            return state;
    }
}

export default languageReducer;

