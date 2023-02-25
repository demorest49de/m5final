import {saveStorge} from "./storage.js";


export const authorizeUser = ($) => {

  const userModal = new bootstrap.Modal('#userEnterModal');
  userModal.show();

  const yesBtn = $.authModal.querySelector('.btn[data-button="yes"]');
  yesBtn.addEventListener('click', e => {
    const userName = $.authModal.querySelector('input.modal__input').value.trim();

    switch (true) {
      case userName.length <= 3:
        alert(`введите больше 3 символов`);
        userModal.hide();
        return authorizeUser($);
      case userName.includes(' '):
        alert('в имени не должно быть пробелов');
        return authorizeUser($);
      default:
        return userName;
    }
  });


  return 'vasja';
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