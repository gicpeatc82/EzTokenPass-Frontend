export default {
  setItem(key: string, value: string | number) {
    value = JSON.stringify(value);
    window.localStorage.setItem(key, value);
  },
  getItem(key: string) {
    const value = window.localStorage.getItem(key) || '';
    try {
      return JSON.parse(value);
    } catch {}
  },
  removeItem(key: string) {
    window.localStorage.removeItem(key);
  },
  clear() {
    window.localStorage.clear();
  },
};
