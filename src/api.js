const DEFAULT_ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';
// const CURRENCY_NAME_FILTER = 'Dólar Americano/Real Brasileiro Turismo';

// const filterData = (data) => {
//   const currencyArray = data
//     .map(({ code }) => ({ code }))
//     .filter((item) => item !== 'USDT');

//   return currencyArray;
// };

// const filterData = (data) => {
//   const currencyArray = data.filter((item) => item !== 'USDT');

//   return currencyArray;
// };

const fetchCurrencyData = async () => {
  const response = await fetch(DEFAULT_ENDPOINT);
  const data = await response.json();
  return data;
};

export default fetchCurrencyData;
