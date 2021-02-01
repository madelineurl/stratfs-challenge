import React from "react";
import PropTypes from "prop-types";

export const NewRow = ({ handleChange }) => {
  return (
    <tr>
      <th></th>
      <td>
        <input
          type="text"
          placeholder="Creditor name"
          name="creditorName"
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="firstName"
          placeholder="First name"
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="lastName"
          placeholder="Last name"
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="minPaymentPercentage"
          placeholder="Min payment percentage"
          onChange={handleChange}
        />
        </td>
      <td>
        <input
          type="text"
          name="balance"
          placeholder="balance"
          onChange={handleChange}
        />
      </td>
    </tr>
  );
};

NewRow.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
