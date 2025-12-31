export function deleteAccountPermanently(accountName) {
  // 1️⃣ Remove account from accounts list
  const accounts =
    JSON.parse(localStorage.getItem("accounts")) || [];

  const updatedAccounts = accounts.filter(
    (a) => a !== accountName
  );

  localStorage.setItem(
    "accounts",
    JSON.stringify(updatedAccounts)
  );

  // 2️⃣ Remove transactions of this account
  const transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];

  const updatedTxns = transactions.filter(
    (t) => t.account !== accountName
  );

  localStorage.setItem(
    "transactions",
    JSON.stringify(updatedTxns)
  );

  // 3️⃣ Reset current account
  if (updatedAccounts.length > 0) {
    localStorage.setItem(
      "currentAccount",
      updatedAccounts[0]
    );
  } else {
    localStorage.removeItem("currentAccount");
  }
}
