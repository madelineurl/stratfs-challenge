import React from "react";
import PropTypes from "prop-types";

export const NewRow = ({ handleChange, newRow }) => {
  return (
    <tr>
      <th></th>
      <td>
        <input
          type="text"
          placeholder="Creditor name"
          name="creditorName"
          value={newRow.creditorName}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="firstName"
          placeholder="First name"
          value={newRow.firstName}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="lastName"
          placeholder="Last name"
          value={newRow.lastName}
          onChange={handleChange}
        />
      </td>
      <td>
        <input
          type="text"
          name="minPaymentPercentage"
          placeholder="Min payment %"
          value={newRow.minPaymentPercentage}
          onChange={handleChange}
        />
        </td>
      <td>
        <input
          type="text"
          name="balance"
          placeholder="balance"
          onChange={handleChange}
          value={newRow.balance}
        />
      </td>
    </tr>
  );
};

NewRow.propTypes = {
  handleChange: PropTypes.func.isRequired,
  newRow: PropTypes.object.isRequired
};
