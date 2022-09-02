import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import deleteExpenseAction from '../redux/actions/deleteExpenseAction';

class Table extends Component {
  deleteButtonHandler = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteExpenseAction(id));
  };

  render() {
    const { expenses } = this.props;
    const renderTableData = expenses.map((expense) => {
      const { id, description, tag, method, value, exchangeRates, currency } = expense;

      const valueFixed = Number(value).toFixed(2);
      const currencyName = exchangeRates[currency].name;
      const currencyAsk = Number(exchangeRates[currency].ask).toFixed(2);
      const totalValue = Number(value) * Number(exchangeRates[currency].ask);

      return (
        <tr key={ id }>
          <td>{ description }</td>
          <td>{ tag }</td>
          <td>{ method }</td>
          <td>{valueFixed}</td>
          <td>{currencyName}</td>
          <td>{currencyAsk}</td>
          <td>{totalValue}</td>
          <td>BRL</td>
          <td>
            <button
              type="button"
              data-testid="delete-btn"
              onClick={ () => this.deleteButtonHandler(id) }
            >
              Excluir
            </button>
          </td>
        </tr>
      );
    });
    return (
      <>
        <div>Table</div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {renderTableData}
          </tbody>
        </table>

      </>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
