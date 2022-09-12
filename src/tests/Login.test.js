import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
// import Login from '../pages/Login';
import renderWith from './helpers/renderWith';
// import mockData from './helpers/mockData';
const TEST_EMAIL = 'xablau@bol.com';
const TEST_PASSWORD = 'xablau';
const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';

describe('Login page', () => {
  test('If Login route is correct', () => {
    const { history } = renderWith(<App />, { initialEntries: ['/'] });
    expect(history.location.pathname).toBe('/');
  });
  test('If login page renders correctly', () => {
    renderWith(<App />, { initialEntries: ['/'] });
    const title = screen.getByRole('heading', { level: 3 });
    expect(title).toBeInTheDocument();
  });
  test('If login form is showing correctly', () => {
    renderWith(<App />, { initialEntries: ['/'] });
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const loginButton = screen.getByRole('button', { name: 'Entrar' });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
  });
  test('If inputs work as expected', () => {
    renderWith(<App />, { initialEntries: ['/'] });
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);

    userEvent.type(emailInput, TEST_EMAIL);
    userEvent.type(passwordInput, TEST_PASSWORD);

    expect(emailInput).toHaveAttribute('value', TEST_EMAIL);
    expect(passwordInput).toHaveAttribute('value', TEST_PASSWORD);
  });
  test('If button is validated correctly', () => {
    renderWith(<App />, { initialEntries: ['/'] });
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const loginButton = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(emailInput, TEST_EMAIL);
    userEvent.type(passwordInput, TEST_PASSWORD);

    expect(loginButton).not.toBeDisabled();
  });
  test('If button routes to the correct page upon being clicked', () => {
    const { history } = renderWith(<App />, { initialEntries: ['/'] });
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    const passwordInput = screen.getByTestId(PASSWORD_INPUT);
    const loginButton = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(emailInput, TEST_EMAIL);
    userEvent.type(passwordInput, TEST_PASSWORD);
    expect(loginButton).not.toBeDisabled();

    userEvent.click(loginButton);

    expect(history.location.pathname).toBe('/carteira');
  });
});
