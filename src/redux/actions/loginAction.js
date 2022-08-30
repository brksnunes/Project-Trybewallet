import { USER_LOGIN } from './index';

const loginAction = (email) => ({
  type: USER_LOGIN,
  payload: email,
});

export default loginAction;
