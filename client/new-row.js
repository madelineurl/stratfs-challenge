import React from "react";
import PropTypes from "prop-types";

export const NewRow = ({ handleChange }) => {
  return (
    <tr>
      <td></td>
      <td><input name="creditorName" onChange={handleChange}/></td>
      <td><input name="firstName" onChange={handleChange}/></td>
      <td><input name="lastName" onChange={handleChange}/></td>
      <td><input name="minPaymentPercentage" onChange={handleChange}/></td>
      <td><input name="balance" onChange={handleChange}/></td>
    </tr>
  );
};

NewRow.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
