import {saveStorge} from './storage.js';
import storage from './storage.js';

export const handleModal = ($) => {

  const showStartWindow = () => {
    $.modalOverlay.classList.add('is-visible');
  };

  const removeStartWindow = () => {
    $.modalOverlay.remove();
  };

  setTimeout(showStartWindow, 500);
  $.modalForm.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const userName = data.text.trim();
    console.log('userName: ', userName);
    const textClue = $.modalForm.querySelector('.form__text');
    $.userName = authorizeHandler(textClue, userName, e.target);
    if (!$.userName) {
      $.userName = '';
      return;
    }

    $.modalOverlay.classList.remove('is-visible');
    $.modalForm.style.top = '80px';
    setTimeout(removeStartWindow, 2000);
    storage.handleStorage($);
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
    const newUser = {name: $.userName, tasks: []};
    storage.data.push(newUser);
    saveStorge(storage, $.appName);
    return newUser;
  }
};
