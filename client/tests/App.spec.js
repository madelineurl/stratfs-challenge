/* eslint-env jest */

import "@testing-library/jest-dom/extend-expect";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React from "react";
import App from "../app";
import nock from "nock";

describe('App', () => {

  it('fetches data from the provided api on initial mount', async () => {
    const scope = nock('https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json')
      .get('/')
      .once()
      .reply(200, {
        data: [
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
          }
        ],
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('AMEX')).toBeInTheDocument();
    });

    // await waitFor(() => {
    //   expect(getRequests()).toHaveBeenCalledTimes(1);
    //   const [getRequest] = getRequests();
    //   expect(getRequest).to.deep.include({ url: "https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json" });
    // });
  });
});
