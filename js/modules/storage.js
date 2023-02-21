import {renderItems} from './render.js';

export const getStorage = (appName) => {
  return JSON.parse(localStorage.getItem(appName)) || {data: [],};
};

export const saveStorage = (storage, userName) => {
  localStorage.setItem(userName, JSON.stringify(storage));
};

const handleStorage = ($) => {
  const storage = getStorage($.appName);

  if (storage.data.length === 0) return;
  renderItems(storage, $);
};

const getUser = () => {

};

export default {
  handleStorage,
};