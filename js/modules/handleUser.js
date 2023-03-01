import {saveStorge} from "./storage.js";
import storage from "./storage.js";

export const handelYesBtn = ($) => {
  const yesBtn = $.modal.querySelector('.btn[data-button="yes"]');
  console.log(': ',yesBtn);
  yesBtn.addEventListener('click', e => {
    const userName = $.modal.querySelector('input.modal__input').value.trim();
    let textClue = $.modal.querySelector('.modal__text');
    $.userName = authorizeHandler(textClue, userName, e.target);
    if (!$.userName) {
      $.userName = '';
      return;
    }
    storage.handleStorage($);
  });
};

export const handleInput = ($) => {
  const input = $.modal.querySelector('.modal__input');

  input.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      const btn = $.modal.querySelector('.btn[data-button]');
      btn.click();
    }
  });
};

const authorizeHandler = (textClue, userName, yesBtn) => {

  textClue.textContent = '';
  switch (true) {
    case userName.length <= 3:

      textClue.textContent = `введите больше 3 символов`;

      return;
    case userName.includes(' '):
      textClue.textContent = 'в имени не должно быть пробелов';
      return;
    default:
      yesBtn.setAttribute('data-bs-dismiss', 'modal');
      return userName;
  }
};

export const getUser = (storage, $) => {
  let user;
  Object.values(storage.data).forEach(userItem => {

    if (userItem.name === $.userName) {
      user = userItem;
      return;
    }
  });

  if (user) {
    return user;
  } else {
    const newUser = {name: $.userName, tasks: [],};
    storage.data.push(newUser);
    saveStorge(storage, $.appName);
    return newUser;
  }
};