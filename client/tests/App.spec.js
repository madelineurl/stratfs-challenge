/* eslint-env jest */

import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import App from "../app";
import { fetchData } from "../utils/fetch-data";

/*

the tests below use React Testing Library and Jest to assure the app's functionality from as close to the user's perspective as possible.

i tried to follow best practices for isolating tests and emphasizing more thorough, if fewer, tests rather than 'one assertion per test' (per RTL creator Kent Dodd's advice --> https://kentcdodds.com/blog/write-fewer-longer-tests/)

in the future, i'd like to move away from mocking the client API (perhaps using jest.spyOn and fetch instead) so these tests truly hold up after any type of implementation refactor.

*/

jest.mock('../utils/fetch-data');

afterEach(() => {
  jest.resetAllMocks();
});

const sampleData = [
  {
    id: 1,
    creditorName: "CBNA",
    firstName: "Jane",
    lastName: "Tester78",
    minPaymentPercentage: 2,
    balance: 1363
  },
  {
    id: 2,
    creditorName: "AMEX",
    firstName: "John",
    lastName: "Tester79",
    minPaymentPercentage: 2,
    balance: 2763
  },
  {
    id: 3,
    creditorName: "CAPITAL ONE",
    firstName: "Julie",
    lastName: "Tester80",
    minPaymentPercentage: 2,
    balance: 429
  },
];

describe('App', () => {
  it('fetches and renders client data from the provided api on initial mount', async () => {
    fetchData.mockResolvedValue({
      data: sampleData
    });

    const {container} = render(<App />);

    expect(container).toBeDefined();
    expect(fetchData).toHaveBeenCalledTimes(1);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent(/Loading/i);

    await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));

    expect(await screen.findAllByRole('listitem')).toHaveLength(3);

    expect(await screen.findByText(/Total Row Count: 3/i)).toBeInTheDocument();
  });

  it('renders an error if the data cannot be loaded', async () => {
    const message = "TEST_ERROR_MESSAGE";

    fetchData.mockRejectedValueOnce({message});

    render(<App />);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent(/Loading/i);

    await waitFor(() => expect(alert).toHaveTextContent(message));
  });

  it('a user can check/uncheck a single row, and the total balance updates accordingly', async () => {
    fetchData.mockResolvedValue({
      data: sampleData
    });

    render(<App />);

    const options = await screen.findAllByRole('option');

    userEvent.click(options[0]);

    expect(options[0]).toBeChecked();

    expect(await screen.findByText('Check Row Count: 1')).toBeInTheDocument();

    expect(await screen.findByTestId('total-balance')).toHaveTextContent('1363.00');

    userEvent.click(options[0]);

    expect(options[0]).not.toBeChecked();

    expect(await screen.findByText('Check Row Count: 0')).toBeInTheDocument();

    expect(await screen.findByTestId('total-balance')).toHaveTextContent('0.00');
  });

  it('a user can check/uncheck all rows, and the total balance updates accordingly', async () => {
    fetchData.mockResolvedValue({
      data: sampleData
    });

    render(<App />);

    const selectAll = await screen.findByTestId('select-all');
    const options = await screen.findAllByRole('option');

    userEvent.click(selectAll);

    options.forEach(option => {
      expect(option).toBeChecked();
    });

    expect(await screen.findByTestId('total-balance')).toHaveTextContent('4555.00');

    userEvent.click(selectAll);

    options.forEach(option => {
      expect(option).not.toBeChecked();
    });

    expect(await screen.findByTestId('total-balance')).toHaveTextContent('0.00');
  });

  it('a user can enter values and add a row to the table', async () => {
    fetchData.mockResolvedValue({
      data: sampleData
    });

    render(<App />);
<<<<<<< HEAD

    expect(await screen.findAllByRole('option')).toHaveLength(3);

    const creditorNameInput = await screen.findByPlaceholderText(/Creditor name/i);

    userEvent.type(creditorNameInput, 'AMEX');

    userEvent.click(await screen.findByRole('button', {name: /Add debt/i }));

    expect(await screen.findAllByRole('option')).toHaveLength(4);

    expect(await screen.findByText(/Total Row Count: 4/i)).toBeInTheDocument();
  });

  it('a user can remove rows from the table', async () => {
=======

    expect(await screen.findAllByRole('option')).toHaveLength(3);

    const creditorNameInput = await screen.findByPlaceholderText(/Creditor name/i);

    userEvent.type(creditorNameInput, 'AMEX');

    userEvent.click(await screen.findByRole('button', {name: /Add debt/i }));

    expect(await screen.findAllByRole('option')).toHaveLength(4);

    expect(await screen.findByText(/Total Row Count: 4/i)).toBeInTheDocument();
  });

  it('a user can remove rows from the table', async () => {
    fetchData.mockResolvedValue({
      data: sampleData
    });

    render(<App />);

    const options = await screen.findAllByRole('option');

    expect(await screen.findByText(/Total Row Count: 3/i)).toBeInTheDocument();

    userEvent.click(options[1]);

    userEvent.click(await screen.findByRole('button', {name: /Remove debt/i }));

    expect(await screen.findAllByRole('option')).toHaveLength(2);

    expect(await screen.findByText(/Total Row Count: 2/i)).toBeInTheDocument();
  });

  it('a user cannot add an empty row', async () => {
>>>>>>> 2c0bbf115f9accadad57d8eed1e9c00d8b0cadd1
    fetchData.mockResolvedValue({
      data: sampleData
    });

    render(<App />);

<<<<<<< HEAD
    const options = await screen.findAllByRole('option');

    expect(await screen.findByText(/Total Row Count: 3/i)).toBeInTheDocument();

    userEvent.click(options[1]);

    userEvent.click(await screen.findByRole('button', {name: /Remove debt/i }));

    expect(await screen.findAllByRole('option')).toHaveLength(2);

    expect(await screen.findByText(/Total Row Count: 2/i)).toBeInTheDocument();
  });

  it('a user cannot add an empty row', async () => {
    fetchData.mockResolvedValue({
      data: sampleData
    });

    render(<App />);

    global.alert = jest.fn();

=======
    global.alert = jest.fn();

>>>>>>> 2c0bbf115f9accadad57d8eed1e9c00d8b0cadd1
    userEvent.click(await screen.findByRole('button', {name: /Add debt/i }));

    expect(global.alert).toHaveBeenCalledTimes(1);
  });

  it('a user cannot remove rows without selecting any rows to remove', async () => {
    fetchData.mockResolvedValue({
      data: sampleData
    });

    render(<App />);

    global.alert = jest.fn();

    userEvent.click(await screen.findByRole('button', {name: /Remove debt/i }));

    expect(global.alert).toHaveBeenCalledTimes(1);
  });
});
