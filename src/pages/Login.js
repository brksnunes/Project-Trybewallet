import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import loginAction from '../redux/actions/loginAction';

class Login extends React.Component {
  state = {
    inputEmail: '',
    inputPassword: '',
    submitted: false,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { inputEmail } = this.state;
    const { dispatch } = this.props;
    dispatch(loginAction(inputEmail));
    this.setState({ submitted: true });
  };

  buttonValidator = () => {
    const { inputEmail, inputPassword } = this.state;
    const MIN_PASS_LENGTH = 6;
    const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    return inputEmail.match(EMAIL_REGEX) && inputPassword.length >= MIN_PASS_LENGTH;
  };

  render() {
    const { inputEmail, inputPassword, submitted } = this.state;
    if (submitted) return <Redirect to="/carteira" />;
    return (
      <div>
        <h3>Login</h3>

        <form>

          <fieldset>

            <label htmlFor="email-input">
              E-MAIL
              <input
                type="text"
                data-testid="email-input"
                name="inputEmail"
                id="email-input"
                onChange={ this.handleChange }
                value={ inputEmail }
              />
            </label>

            <label htmlFor="password-input">
              SENHA
              <input
                type="password"
                data-testid="password-input"
                name="inputPassword"
                id="password-input"
                onChange={ this.handleChange }
                value={ inputPassword }
              />
            </label>

            <button
              type="submit"
              disabled={ !this.buttonValidator() }
              onClick={ this.handleClick }
            >
              Entrar
            </button>

          </fieldset>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
