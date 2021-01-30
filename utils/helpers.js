 // utility function to check if a row is selected
  // the return value will help keep the checkbox in sync with selected state
  function checkIfSelected(rowData, selected) {
    const exists = selected.filter(row => row.id === rowData.id);
    return exists.length > 0;
  }

  function getTotalBalance(selected) {
    let total = 0;
    selected.forEach(rowData => {
      total += rowData.balance;
    });
    return total;
  }

  module.exports = {
    checkIfSelected,
    getTotalBalance
  };
