/* eslint-env jest */

import "@testing-library/jest-dom/extend-expect";
import { render, cleanup } from "@testing-library/react";
import React from "react";
import App from "../app";
// import axios from "axios";

afterEach(cleanup);

describe('App', () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });

  // it('renders a creditor name', () => {
  //   const { getByText } = render(<App />);
  //   expect(getByText('Creditor')).toBeInTheDocument();
  // });
});
