import {saveStorge} from "./storage.js";


export const openAuthorizeWindow = () => {

  const userModal = new bootstrap.Modal('#userEnterModal');
  userModal.show();

};
const handelYesBtn = ($) => {
  const yesBtn = $.authModal.querySelector('.btn[data-button="yes"]');
  yesBtn.addEventListener('click', e => {
    const userName = $.authModal.querySelector('input.modal__input').value.trim();
    let textClue = $.authModal.querySelector('.modal__text');
    return authorizeHandler(textClue, userName, yesBtn);
  });

  $.userName = 'vasja';
};

const authorizeHandler = (textClue, userName, yesBtn) => {
  textClue.textContent = '';
  switch (true) {
    case userName.length <= 3:

      textClue.textContent = `введите больше 3 символов`;
      return authorizeHandler(textClue, userName, yesBtn);
    case userName.includes(' '):

      textClue.textContent = 'в имени не должно быть пробелов';
      return authorizeHandler(textClue, userName, yesBtn);
    default:
      yesBtn.setAttribute('data-bs-dismiss', 'modal')
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