/* eslint-env jest */

import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import App from "../app";
import { fetchData } from "../utils/fetch-data";

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
    expect(await screen.findByText('Jane')).toBeInTheDocument();
    expect(await screen.findByText(/Total Row Count: 3/i)).toBeInTheDocument();
  });

  it('renders an error if data cannot be loaded', async () => {
    const message = "TEST_ERROR_MESSAGE";

    fetchData.mockRejectedValueOnce({message});

    render(<App />);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent(/Loading/i);

    await waitFor(() => expect(alert).toHaveTextContent(message));
  });

  it('a user can check/uncheck a single row', async () => {
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
    await waitFor(() => {
      expect(options[0]).not.toBeChecked();
    });
    expect(await screen.findByText('Check Row Count: 0')).toBeInTheDocument();
    expect(await screen.findByTestId('total-balance')).toHaveTextContent('0.00');
  });

  it('a user can check/uncheck all rows', async () => {
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

    userEvent.click(selectAll);

    options.forEach(option => {
      expect(option).not.toBeChecked();
    });
  });


});


// describe('Totals', () => {
//   it('renders the total balance of selected rows', () => {
//     const selected = [sampleData[0]];

//     render(<Totals
//       clientData={sampleData}
//       selected={selected}
//       getTotalBalance={getTotalBalance}
//     />);

//     expect(getTotalBalance).toHaveBeenCalledWith(selected);

//     expect(screen.getByText('Total Balance: 1363')).toBeInTheDocument();
//   });
// });

  // it('renders a message if there is no data to display', async () => {
  //   fetchData.mockRejectedValueOnce({ data: [] });

  //   render(<App />);

  //   const alert = screen.getByRole('alert');
  //   expect(alert).toHaveTextContent(/Loading/i);

  //   await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));

  //   await waitFor(() => {
  //     expect(alert).toHaveTextContent('No data to display');
  //   });
  //});
