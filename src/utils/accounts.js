const KEY = "cashbook_accounts";
const CURRENT = "current_account";

export function getAccounts() {
  return JSON.parse(localStorage.getItem(KEY)) || [
    {
      name: "Cashbook",
      created: "29 Dec 2025 10:35 PM"
    }
  ];
}

export function saveAccounts(accounts) {
  localStorage.setItem(KEY, JSON.stringify(accounts));
}

export function addAccount(name) {
  const accounts = getAccounts();
  accounts.push({
    name,
    created: new Date().toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    })
  });
  saveAccounts(accounts);
}

export function getCurrentAccount() {
  return localStorage.getItem(CURRENT) || "Cashbook";
}

export function setCurrentAccount(name) {
  localStorage.setItem(CURRENT, name);
}
