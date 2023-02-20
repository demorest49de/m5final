export const authorizeUser = () => {
  const userName = prompt(`Введите имя пользователя:`).trim();

  switch (true) {
    case userName.length <= 3:
      alert(`введите больше 3 символов`);
      return authorizeUser();
    case userName.includes(' '):
      alert('в имени не должно быть пробелов');
      return authorizeUser();
    default:
      return userName;
  }
};