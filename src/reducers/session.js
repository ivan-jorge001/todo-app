import * as types from '../actions/types';
import initialState from './initialState';

export default function sessionReducer(state = initialState.session, action) {
  switch (action.type) {
    case types.LOGIN:
			return { ...state, email: action.email };

    case types.SIGNUP:
      return {
				...state,
				email: action.email,
				firstName: action.firstName,
				lastName: action.lastName
			};

    default:
      return state;
  }
}