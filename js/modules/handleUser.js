import {saveStorge} from "./storage.js";

export const authorizeUser = () => {
  //todo доработать метод

  // const userName = prompt(`Введите имя пользователя:`).trim();
  //
  // switch (true) {
  //   case userName.length <= 3:
  //     alert(`введите больше 3 символов`);
  //     return authorizeUser();
  //   case userName.includes(' '):
  //     alert('в имени не должно быть пробелов');
  //     return authorizeUser();
  //   default:
  //     return userName;
  // }

  return 'petja';
};

export const getUser = (storage, $) => {
  let user;
  Object.values(storage.data).forEach(userItem => {
    const {name, tasks} = userItem;
    if (name === $.userName) {
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