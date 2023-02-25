import {saveStorge} from "./storage.js";
import storage from "./storage.js";


export const openAuthorizeWindow = ($) => {

  const userModal = new bootstrap.Modal('#userEnterModal');
  userModal.show();
  $.userModal = userModal;
};
export const handelYesBtn = ($) => {
  const yesBtn = $.authModal.querySelector('.btn[data-button="yes"]');
  yesBtn.addEventListener('click', e => {
    const userName = $.authModal.querySelector('input.modal__input').value.trim();
    let textClue = $.authModal.querySelector('.modal__text');
    $.userName = authorizeHandler(textClue, userName, e.target);
    if (!$.userName) {
      $.userName = '';
      return;
    }
    $.userModal.hide();
    storage.handleStorage($);
  });
};

export const handleInput = ($) => {
  const input = $.authModal.querySelector('.modal__input');

  input.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      const btn = $.authModal.querySelector('.btn[data-button]');
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