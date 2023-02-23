import {getStorage, saveStorge} from "./storage.js";
import createElement from './createElement.js';
import {getUser} from "./handleUser.js";

const {createRow} = createElement;

const submitFormData = ($) => {
  $.form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const storage = getStorage($.appName);
    const task = {
      id: createElement.createId(),
      text: data.text,
      status: 'В процессе',
    };
    const user = $.user;
    user.tasks.push(task);

    const row = createRow(task);
    const updatedStorage = udpateUserDataInStorage(storage, user);
    saveStorge(updatedStorage, $.appName);
    $.tBody.append(row);

    saveStorge(storage, $.appName);
  });
};

const udpateUserDataInStorage = (storage, user) => {
  return storage.data.map(item => {
    const {name, tasks} = item;
    console.log(': ',item);
    if(name === user.name){
      item.tasks = user.tasks;
    }
    return item;
  });
};

const handleTaskInput = ($) => {
  $.form.text.addEventListener("input", e => {
    const taskText = e.target;
    if (taskText.value.length > 0) {
      $.saveBtn.removeAttribute('disabled');
    } else {
      $.saveBtn.setAttribute('disabled', '');
    }
  });
};

// bind different from enter key to submit form
// const handleSubmitOnEnter = ($) => {
//   $.form.text.addEventListener('keypress', e => {
//     // console.log(': ',e.code);
//     if (e.code === 'KeyE' && e.target.value.length > 0) {
//       const form = $.form;
//       form.submit();
//       form.method = 'post';
//
//       console.log(': ',form.text.value);
//
//       const storage = getStorage($.appName);
//       const task = {
//         id: createElement.createId(),
//         text: data.text,
//         status: 'В процессе',
//       };
//     }
//   });
// };

export default {
  submitFormData,
  handleTaskInput,
};