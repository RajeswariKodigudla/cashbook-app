// API-based settings utility (replaces localStorage version)
import { settingsAPI } from '../services/api';

let settingsCache = null;

export async function getSettings() {
  try {
    if (!settingsCache) {
      settingsCache = await settingsAPI.get();
    }
    return settingsCache;
  } catch (error) {
    console.error('Error fetching settings:', error);
    // Return default settings
    return {
      language: "English",
      reminder: false,
      currency: "None",
      theme: "Peacock",
      keepScreenOn: false,
      numberFormat: "1,000,000.00",
      timeFormat: "12 Hour",
      firstDay: "Sunday",
      version: "1.4"
    };
  }
}

export async function saveSettings(data) {
  try {
    const updated = await settingsAPI.update(data);
    settingsCache = updated;
    return updated;
  } catch (error) {
    console.error('Error saving settings:', error);
    throw error;
  }
}

export async function setAppLockPassword(password) {
  try {
    await settingsAPI.setAppLock(password);
    return { success: true };
  } catch (error) {
    console.error('Error setting app lock:', error);
    return { success: false, message: error.message };
  }
}

export async function verifyAppLockPassword(password) {
  try {
    await settingsAPI.verifyAppLock(password);
    return { success: true };
  } catch (error) {
    console.error('Error verifying app lock:', error);
    return { success: false, message: error.message };
  }
}

export async function removeAppLockPassword() {
  try {
    await settingsAPI.removeAppLock();
    return { success: true };
  } catch (error) {
    console.error('Error removing app lock:', error);
    return { success: false, message: error.message };
  }
}

export function clearSettingsCache() {
  settingsCache = null;
}




