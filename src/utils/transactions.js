const STORAGE_KEY = "cashbook_transactions";

/* Get all data */
export function getTransactions() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
}

/* Get single day */
export function getDayData(dateKey) {
  const data = getTransactions();
  return data[dateKey] || { income: 0, expense: 0 };
}

/* Save income / expense */
export function saveTransaction(dateKey, type, amount) {
  const data = getTransactions();

  if (!data[dateKey]) {
    data[dateKey] = { income: 0, expense: 0 };
  }

  data[dateKey][type] += amount;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
