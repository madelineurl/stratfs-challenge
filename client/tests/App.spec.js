/* eslint-env jest */

import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor, act } from "@testing-library/react";
// import { userEvent } from "@testing-library/user-event";
import React from "react";
import App from "../app";
import axios from "axios";
import { fetchData } from "../utils/fetch-data";

// jest.mock('axios');

const sampleData = [
  {
    id: 1,
    creditorName: "CBNA",
    firstName: "Suman",
    lastName: "Tester79",
    minPaymentPercentage: 2,
    balance: 1363
  },
  {
    id: 2,
    creditorName: "AMEX",
    firstName: "Suman",
    lastName: "Tester79",
    minPaymentPercentage: 2,
    balance: 2763
  },
  {
    id: 3,
    creditorName: "AMEX",
    firstName: "Suman",
    lastName: "Tester79",
    minPaymentPercentage: 2,
    balance: 429
  },
];

// describe('fetchData function', () => {
//   it('returns an array of client data', async () => {
//     axios.get.mockResolvedValue({
//       data: sampleData
//     });

//     const { data } = await fetchData();

//     expect(data).toHaveLength(3);
//     expect(data[0].firstName).toEqual('Suman');
//   });
// });

describe('App', () => {
  // beforeEach(() => {
  //   render(<App />);
  // });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches data from the provided api on initial mount', async () => {
    // axios.get.mockResolvedValue({
    //   data: sampleData
    // });
    render(<App />);


    expect(await screen.findAllByRole('rowgroup')).toHaveLength(4);

    // await waitForElementToBeRemoved(() => screen.getByText(/saving/i))
    // await act(() => fetchData());
  });
});
