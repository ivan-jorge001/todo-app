import * as types from './types';

export default {
  setLoginCred: ({ email, password }) => ({ type: types.LOGIN, email }),
  setSignupCred: (cred) => ({ type: types.SIGNUP, ...cred }),
};
