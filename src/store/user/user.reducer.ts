import {AnyAction} from 'redux';
import { USER_ACTION_TYPES } from './user.types';
import { SignInFailed, signUpFailed, signOutFailed, signOutSuccess, signInSuccess, signInFailed } from './user.action';
import { UserData } from '../../utils/firebase/firebase.util';

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
}

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {

  if(signInSuccess.match(action)) {
    return { ...state, currentUser: action.payload };
  }

  if(signOutSuccess.match(action)) {
    return { ...state, currentUser: null };
  }

  if(signOutFailed.match(action) || signInFailed.match(action) || signUpFailed.match(action)) {
    return { ...state, error: action.payload };
  }

  return state;
};
// redux is based on memory. every single action is run on every reducer, but the way that
// we tell the redux that this specific reducer doesn't change is by returning the state by default
// when the state has been returned it means that the final and initial values were the same
// hence don't update