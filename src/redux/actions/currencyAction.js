import fetchCurrencyData from '../../api';
import { SAVE_CURRENCY, FAILED_REQUEST } from '.';

const saveCurrency = (currency) => ({
  type: SAVE_CURRENCY,
  payload: currency,
});

const failedRequest = (error) => ({
  type: FAILED_REQUEST,
  payload: error,
});

const fetchCurrencyAction = () => async (dispatch) => {
  try {
    const currency = await fetchCurrencyData();
    if (!currency) throw new Error('Não foi possível recuperar os dados');
    dispatch(saveCurrency(currency));
  } catch (error) {
    dispatch(failedRequest(error.message));
  }
};

export default fetchCurrencyAction;
