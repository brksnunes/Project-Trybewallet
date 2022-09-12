import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWith from './helpers/renderWith';

const TEST_EMAIL = 'xablau@bol.com';
const TEST_PASSWORD = 'xablau';
const TEST_VALUE = '67';
const TEST_DESCRIPTION = 'xablau';
const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';

function loginWithCredentials() {
  const emailInput = screen.getByTestId(EMAIL_INPUT);
  const passwordInput = screen.getByTestId(PASSWORD_INPUT);
  const loginButton = screen.getByRole('button', { name: 'Entrar' });

  userEvent.type(emailInput, TEST_EMAIL);
  userEvent.type(passwordInput, TEST_PASSWORD);
  expect(loginButton).not.toBeDisabled();

  userEvent.click(loginButton);
}
function addExpense() {
  const valueInput = screen.getByTestId('value-input');
  const descriptionInput = screen.getByTestId('description-input');
  const addExpenseButton = screen.getByRole('button', { name: 'Adicionar despesa' });
  userEvent.type(valueInput, TEST_VALUE);
  userEvent.type(descriptionInput, TEST_DESCRIPTION);
  userEvent.click(addExpenseButton);
}
describe('Wallet page', () => {
  test('If Wallet route is correct', () => {
    const { history } = renderWith(<App />, { initialEntries: ['/'] });
    loginWithCredentials();
    expect(history.location.pathname).toBe('/carteira');
  });
  test('If header is shown correctly', () => {
    renderWith(<App />, { initialEntries: ['/'] });
    loginWithCredentials();
    const userEmail = screen.getByTestId('email-field');
    expect(userEmail).toHaveTextContent(TEST_EMAIL);
  });
  test('If wallet form is rendered', () => {
    renderWith(<App />, { initialEntries: ['/'] });
    loginWithCredentials();
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
  });
  test('If form can be filled', () => {
    renderWith(<App />, { initialEntries: ['/'] });
    loginWithCredentials();
    addExpense();
  });
  test('If header updates correctly', async () => {
    renderWith(<App />, { initialEntries: ['/'] });
    loginWithCredentials();
    addExpense();
    const headerTotalField = screen.getByTestId('total-field');
    await waitFor(() => expect(headerTotalField).not.toHaveTextContent('0'));
  });
  test('If is possible to delete a expense', async () => {
    renderWith(<App />, { initialEntries: ['/'] });
    loginWithCredentials();
    addExpense();
    const headerTotalField = screen.getByTestId('total-field');
    await waitFor(() => expect(headerTotalField).not.toHaveTextContent('0'));

    const deleteButton = screen.getByTestId('delete-btn');
    userEvent.click(deleteButton);
    await waitFor(() => expect(headerTotalField).toHaveTextContent('0'));
  });
});
