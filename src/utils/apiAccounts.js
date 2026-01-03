// API-based accounts utility (replaces localStorage version)
import { accountsAPI } from '../services/api';

let accountsCache = null;
let currentAccountCache = null;

export async function getAccounts() {
  try {
    if (!accountsCache) {
      const response = await accountsAPI.getAll();
      accountsCache = response.transactions || response; // Handle different response formats
    }
    return accountsCache;
  } catch (error) {
    console.error('Error fetching accounts:', error);
    // Fallback to default
    return [
      {
        name: "Cashbook",
        created: new Date().toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
        })
      }
    ];
  }
}

export async function saveAccounts(accounts) {
  // This is handled by individual create/update calls
  accountsCache = accounts;
}

export async function addAccount(name) {
  try {
    const newAccount = await accountsAPI.create(name);
    accountsCache = null; // Clear cache
    return newAccount;
  } catch (error) {
    console.error('Error creating account:', error);
    throw error;
  }
}

export async function updateAccount(id, name) {
  try {
    const updated = await accountsAPI.update(id, name);
    accountsCache = null; // Clear cache
    return updated;
  } catch (error) {
    console.error('Error updating account:', error);
    throw error;
  }
}

export async function deleteAccount(id) {
  try {
    await accountsAPI.delete(id);
    accountsCache = null; // Clear cache
  } catch (error) {
    console.error('Error deleting account:', error);
    throw error;
  }
}

export function getCurrentAccount() {
  return currentAccountCache || localStorage.getItem("current_account") || "Cashbook";
}

export function setCurrentAccount(name) {
  currentAccountCache = name;
  localStorage.setItem("current_account", name);
}

// Clear cache when needed
export function clearAccountsCache() {
  accountsCache = null;
}


