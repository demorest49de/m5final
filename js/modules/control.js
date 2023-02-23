import {getStorage, saveStorge} from "./storage.js";
import createElement from './createElement.js';

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

    const row = createRow(task, user.tasks.length);
    const updatedStorage = udpateUserDataInStorage(storage, user);
    saveStorge(updatedStorage, $.appName);
    $.tBody.append(row);

    saveStorge(storage, $.appName);
    $.form.reset();
    $.form.querySelector('.form__submit').setAttribute('disabled', '');
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

export default {
  submitFormData,
  handleTaskInput,
};