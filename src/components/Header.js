import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../App.css';

class Header extends Component {
  render() {
    const { email, totalAmount } = this.props;
    return (
      <header className="main-header">
        <p data-testid="email-field">{ email }</p>
        <div>
          <p data-testid="total-field">
            Despesa total: R$
            {' '}
            { totalAmount }
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalAmount: PropTypes.number,
};

Header.defaultProps = {
  totalAmount: 0,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
