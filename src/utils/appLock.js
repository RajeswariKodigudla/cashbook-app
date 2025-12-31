const KEY = "cashbook_app_lock";

export function getLock() {
  return JSON.parse(localStorage.getItem(KEY)) || {
    enabled: false,
    password: null,
    question: null,
    answer: null,
    fingerprint: false
  };
}

export function saveLock(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}
