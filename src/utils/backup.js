const KEYS = [
  "cashbook_transactions",
  "cashbook_accounts",
  "cashbook_notes"
];

export function createBackup() {
  const data = {};
  KEYS.forEach((k) => {
    data[k] = JSON.parse(localStorage.getItem(k)) || [];
  });

  data.backupTime = new Date().toLocaleString();
  return data;
}

export function restoreBackup(data) {
  KEYS.forEach((k) => {
    if (data[k]) {
      localStorage.setItem(k, JSON.stringify(data[k]));
    }
  });
  localStorage.setItem("last_backup", data.backupTime);
}

export function getLastBackup() {
  return localStorage.getItem("last_backup") || "Never";
}
