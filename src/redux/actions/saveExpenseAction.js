import { SAVE_EXPENSE, FAILED_REQUEST } from '.';
import fetchCurrencyData from '../../api';

const saveExpense = (expense) => ({
  type: SAVE_EXPENSE,
  payload: expense,
});

const failedRequest = (error) => ({
  type: FAILED_REQUEST,
  payload: error,
});

const saveExpenseAction = (expense) => async (dispatch) => {
  try {
    const exchangeRates = await fetchCurrencyData();
    // const currentState = getState();
    const payload = { ...expense, exchangeRates };

    if (!exchangeRates) throw new Error('Não foi possível recuperar os dados');
    dispatch(saveExpense(payload));
  } catch (error) {
    dispatch(failedRequest(error.message));
  }
};

export default saveExpenseAction;
