import { DELETE_EXPENSE } from './index';

const deleteExpenseAction = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});

export default deleteExpenseAction;
