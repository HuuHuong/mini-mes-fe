interface Storage {
  getItem(key: string, ...args: Array<any>): any;
  setItem(key: string, value: any, ...args: Array<any>): any;
  removeItem(key: string, ...args: Array<any>): any;
}
export const reduxPersistStorage: Storage = {
  setItem: (key, value) => {
    localStorage.setItem(key, value);
    return Promise.resolve(true);
  },
  getItem: (key) => {
    const value = localStorage.getItem(key);
    return Promise.resolve(value);
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};
