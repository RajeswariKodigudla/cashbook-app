const KEY = "cashbook_settings";

const defaultSettings = {
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

export function getSettings() {
  return JSON.parse(localStorage.getItem(KEY)) || defaultSettings;
}

export function saveSettings(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}
