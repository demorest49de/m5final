import {renderItems} from './render.js';

export const getStorage = (appName) => {
  return JSON.parse(localStorage.getItem(appName)) || {};
};

export const saveStorge = (storage, appName) => {
  localStorage.setItem(appName, JSON.stringify(storage));
};

const handleStorage = ($) => {
  const storage = getStorage($.appName);
  getUser(storage, $.userName)
  if (storage.data.length === 0) return;
  renderItems(storage, $.userName);
};

const getUser = (storage, userName) => {
  Object.entries(storage).forEach((key, value) => {
    console.log(': ',key, value);
  });
};

export default {
  handleStorage,
};