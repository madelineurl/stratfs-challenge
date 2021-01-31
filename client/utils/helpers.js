// utility function to check if a row is selected
// the return value will help keep the checkbox in sync with selected state
export function checkIfSelected(rowData, selected) {
  const exists = selected.filter(row => row.id === rowData.id);
  return exists.length > 0;
}

export function getTotalBalance(selected) {
  let total = 0;
  selected.forEach(rowData => {
    total += rowData.balance;
  });
  return total;
}

export function roundTwoDecimals(num) {
  return (Math.round(num * 100) / 100).toFixed(2);
}
