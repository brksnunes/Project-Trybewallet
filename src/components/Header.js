import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../App.css';

class Header extends Component {
  calculateTotal = () => {
    const { expenses } = this.props;
    let total = 0;
    if (expenses.length > 0) {
      expenses.forEach((expense) => {
        total += Number(expense.value).toFixed(2)
          * Number(expense.exchangeRates[expense.currency].ask);
      });
    }

    return total.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <header className="main-header">
        <p data-testid="email-field">{ email }</p>
        <div>
          <p>Despesa total: R$</p>
          <p data-testid="total-field">
            { this.calculateTotal() }
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
