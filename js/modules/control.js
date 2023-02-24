import {getStorage, saveStorge} from "./storage.js";
import createElement from './createElement.js';
import {getUser} from './handleUser.js';

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
    udpateUserDataInStorage(storage, user);
    saveStorge(storage, $.appName);
    $.tBody.append(row);
    renumerateTable($.tBody);

    saveStorge(storage, $.appName);
    $.form.reset();
    $.form.querySelector('.form__submit').setAttribute('disabled', '');
  });
};

const udpateUserDataInStorage = (storage, user) => {
  storage.data = storage.data.map(item => {
    const {name, tasks} = item;
    if (name === user.name) {
      item.tasks = user.tasks;
    }
    return item;
  });
  return storage;
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

const handleResetFormButton = ($) => {
  $.form.addEventListener('click', e => {
    const target = e.target;
    if (target === $.clearBtn) {
      $.saveBtn.setAttribute('disabled', '');
    }
  });
};

const deleteTask = ($) => {
  $.tBody.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.btn.btn-danger')) {
      const row = target.closest('.table-light');
      row.remove();

      const storage = getStorage($.appName);
      const taskId = row.querySelector('td[data-id]').getAttribute('data-id');
      const user = getUser(storage, $);
      user.tasks = removeTaskFromUser(user.tasks, taskId);
      udpateUserDataInStorage(storage, user);
      saveStorge(storage, $.appName);

      renumerateTable($.tBody);
    }
  });
};

const finishTask = ($) => {
  $.tBody.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.btn.btn-success')) {
      const row = target.closest('tr');
      row.classList.toggle('table-light');
      const success = row.classList.toggle('table-success');
      const tdStatus = row.querySelector('td:nth-child(4)');
      row.querySelector('td:nth-child(3)').classList.toggle('text-crossed-out');
      success ? tdStatus.textContent = 'Выполнена' : tdStatus.textContent = 'В процессе';


      // const storage = getStorage($.appName);
      // const taskId = row.querySelector('td[data-id]').getAttribute('data-id');
      // const user = getUser(storage, $);
      // user.tasks = removeTaskFromUser(user.tasks, taskId);
      // udpateUserDataInStorage(storage, user);
      // saveStorge(storage, $.appName);
    }
  });
};

const renumerateTable = (tBody) => {
  const tds = tBody.querySelectorAll('td:nth-child(2)');
  let count = 1;
  for (const td of tds) {
    td.textContent = count;
    count++;
  }
};

const removeTaskFromUser = (tasks, taskId) => {
  tasks = tasks.filter(x => x.id !== taskId);
  return tasks;
};

export default {
  submitFormData,
  handleTaskInput,
  handleResetFormButton,
  deleteTask,
  renumerateTable,
  finishTask
};