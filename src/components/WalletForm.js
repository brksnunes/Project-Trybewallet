import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchCurrencyAction from '../redux/actions/currencyAction';
import { PAYMENT_METHODS, CATEGORIES } from '../data';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencyAction());
  }

  render() {
    const { currencies } = this.props;

    const setCurrencyOptions = currencies.map((currency) => (
      <option
        key={ currency }
        value={ currency }
      >
        { currency }
      </option>));

    const setPaymentOptions = PAYMENT_METHODS.map((method) => (
      <option
        key={ method }
        value={ method }
      >
        { method }
      </option>));

    const setCategoryOptions = CATEGORIES.map((category) => (
      <option
        key={ category }
        value={ category }
      >
        { category }
      </option>));

    return (
      <div>
        <h1>WalletForm</h1>
        <form>
          <label htmlFor="value-input">
            Valor
            <input
              type="number"
              data-testid="value-input"
              name="value"
              id="value-input"
              min="0"
              // onChange={ this.handleChange }
              // value={ inputEmail }
            />
          </label>

          <label htmlFor="description-input">
            Descrição da despesa
            <input
              type="text"
              data-testid="description-input"
              name="description"
              id="description-input"
              // onChange={ this.handleChange }
              // value={ inputEmail }
            />
          </label>
          <label htmlFor="currency-input">
            Moeda
            <select
              data-testid="currency-input"
              name="currency"
              id="currency-input"
            >
              { setCurrencyOptions }
            </select>
          </label>

          <label htmlFor="method-input">
            Método de pagamento
            <select
              data-testid="method-input"
              name="method"
              id="method-input"
            >
              { setPaymentOptions }
            </select>
          </label>

          <label htmlFor="tag-input">
            Categoria da despesa
            <select
              data-testid="tag-input"
              name="tag"
              id="tag-input"
            >
              { setCategoryOptions }
            </select>
          </label>

        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
