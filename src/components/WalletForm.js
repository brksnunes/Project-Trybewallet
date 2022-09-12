import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchCurrencyAction from '../redux/actions/currencyAction';
import saveExpenseAction from '../redux/actions/saveExpenseAction';
import { PAYMENT_METHODS, CATEGORIES } from '../data';

class WalletForm extends Component {
  state = {
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    description: '',
    id: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencyAction());
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { id } = this.state;
    const { dispatch } = this.props;

    dispatch(saveExpenseAction(this.state));

    const counter = id + 1;

    this.setState({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      id: counter,
    });
  };

  render() {
    const { value, currency, method, tag, description } = this.state;
    const { currencies } = this.props;

    const setOptions = (array) => array.map((item) => (
      <option key={ item } value={ item }>
        { item }
      </option>));

    return (
      <div>
        <h1>WalletForm</h1>
        <form>
          <label htmlFor="value-input">
            Valor
            <input
              type="text"
              data-testid="value-input"
              name="value"
              id="value-input"
              min="0"
              onChange={ this.handleChange }
              value={ value }
            />
          </label>

          <label htmlFor="description-input">
            Descrição da despesa
            <input
              type="text"
              name="description"
              id="description-input"
              data-testid="description-input"
              onChange={ this.handleChange }
              value={ description }
            />
          </label>
          <select
            name="currency"
            id="currency-input"
            label="Moeda"
            value={ currency }
            data-testid="currency-input"
            onChange={ this.handleChange }
          >
            { setOptions(currencies) }
          </select>
          <select
            name="method"
            id="method-input"
            label="Método de pagamento"
            value={ method }
            data-testid="method-input"
            onChange={ this.handleChange }
          >
            { setOptions(PAYMENT_METHODS) }
          </select>
          <select
            name="tag"
            id="tag-input"
            label="Categoria da despesa"
            value={ tag }
            data-testid="tag-input"
            onChange={ this.handleChange }
          >
            { setOptions(CATEGORIES) }
          </select>

          <button
            type="button"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>

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
