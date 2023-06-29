import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
    currentUser: null
}

export const userReducer = (state = INITIAL_STATE, action) => {
    const {type, payload} = action;

    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        default:
            return state;
    }
}
// redux is based on memory. every single action is run on every reducer, but the way that
// we tell the redux that this specific reducer doesn't change is by returning the state by default
// when the state has been returned it means that the final and initial values were the same
// hence don't update