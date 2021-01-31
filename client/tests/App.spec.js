/* eslint-env jest */

import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
// import { userEvent } from "@testing-library/user-event";
import React from "react";
import App from "../app";
// import { DataTable } from "../data-table";
import * as utils from "../utils/helpers";

jest.mock('../utils/helpers');

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
    expect(utils.fetchData).toHaveBeenCalledTimes(0);

    utils.fetchData.mockResolvedValue({
      data: sampleData
    });

    const {container} = render(<App />);

    expect(utils.fetchData).toHaveBeenCalledTimes(1);

    expect(container).toBeDefined();

    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent(/Loading/i);

    await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));

    expect(await screen.findAllByRole('row')).toHaveLength(5);

    expect(await screen.findByText('Jane')).toBeInTheDocument();
  });

  it('renders an error if there is a problem loading data', async () => {
    const message = "TEST_ERROR_MESSAGE";

    utils.fetchData.mockRejectedValueOnce({message});

    render(<App />);

    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent(/Loading/i);

    await waitFor(() => expect(alert).toHaveTextContent(message));
  });
});
