import {renderItems} from './render.js';
import {getUser} from './handleUser.js';

export const getStorage = (appName) => JSON.parse(localStorage.getItem(appName)) || {data: []};

export const saveStorge = (storage, appName) => {
  localStorage.setItem(appName, JSON.stringify(storage));
};

const handleStorage = ($) => {
  const storage = getStorage($.appName);
  const userName = $.app.querySelector('.todo__title');
  userName.textContent += `, ${$.userName}`;
  const user = getUser(storage, $);
  $.user = user;
  if (user.tasks.length > 0) renderItems(user.tasks, $);
};

export default {
  handleStorage,
};
