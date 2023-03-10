import {getStorage, saveStorge} from './storage.js';
import create from './createElement.js';
import {getUser} from './handleUser.js';
import {renderCenter} from './render.js';
import {showWindow, removeWindow} from './handleUser.js';

const {createRow, createModal} = create;

const submitFormData = ($) => {
  $.form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const options = $.form.querySelectorAll('.form__select[name="priority"] option');
    let selectedOption;

    for (let i = 0; i < options.length; i++) {
      console.log(': ', options[i].selected);
      if (i === 0 && options[i].selected) {
        selectedOption = options[i + 1];
        break;
      }
      if (options[i].selected) {
        selectedOption = options[i];
        break;
      }
    }

    for (let i = 0; i < options.length; i++) {
      options[i].selected = options[i].defaultSelected;
    }

    const storage = getStorage($.appName);
    const task = {
      id: create.createId(),
      text: data.text,
      status: false,
      priority: [selectedOption.value, selectedOption.text],
    };
    const user = $.user;
    user.tasks.push(task);

    const row = createRow(task);
    udpateUserData(storage, user);
    saveStorge(storage, $.appName);
    $.tBody.append(row);
    renumerateTable($.tBody);
    renderCenter($);

    saveStorge(storage, $.appName);
    $.form.reset();
    $.form.querySelector('.form__submit').setAttribute('disabled', '');
  });
};

const udpateUserData = (storage, user) => {
  for (const storageUser of storage.data) {
    if (storageUser.name === user.name) {
      storageUser.tasks = user.tasks;
      return;
    }
  }

  return storage;
};

const handleTaskInput = ($) => {
  $.form.text.addEventListener('input', e => {
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
      const row = target.closest('tr');


      const {modalOverlay: delDialog} = createModal();
      $.modalOverlay = delDialog;
      document.body.append(delDialog);
      setTimeout(showWindow, 500, $);
      // $.modalOverlay.classList.add('is-visible');//
      delDialog.querySelector('.form__body').remove();

      delDialog.querySelector('.form__title')
        .textContent = `???? ?????????????????????????? ???????????? ?????????????? ???????????? "${row.querySelector('td:nth-child(3)').textContent}"?`;
      const yesBtn = delDialog.querySelector('.form__submit');
      yesBtn.type = 'button';
      yesBtn.textContent = "????";
      yesBtn.classList.remove('form__submit', 'btn-primary');
      yesBtn.classList.add('modal-yes', 'btn-danger');
      yesBtn.style.width = '56px';
      const noBtn = document.createElement('button');

      noBtn.type = 'button';
      noBtn.textContent = "??????";
      noBtn.classList.add('modal-no');
      noBtn.tabIndex = 3;
      noBtn.classList.add('btn', 'btn-warning');
      noBtn.style.width = '56px';
      const footer = delDialog.querySelector('.form__footer');
      footer.append(noBtn);
      footer.style.gap = '15px';
      const form = delDialog.querySelector('.form');
      $.clientWidth = form.clientWidth;
      //???????? ???????????? ?????? setTimeout ???? ?????????????? ???????????????? ???? ??????????.
      renderCenter($);

      handleYesButton($, row, yesBtn);
      handleCloseDelDialog($);
    }
  });
};

const handleYesButton = ($, row, yesBtn) => {
  yesBtn.addEventListener('click', e => {
    row.remove();

    const storage = getStorage($.appName);
    const taskId = row.querySelector('td[data-id]').getAttribute('data-id');
    const user = getUser(storage, $);
    user.tasks = removeTask(user.tasks, taskId);
    udpateUserData(storage, user);
    saveStorge(storage, $.appName);
    renumerateTable($.tBody);
    $.modalOverlay.querySelector('.modal-form').style.top = '80px';
    $.modalOverlay.classList.remove('is-visible');
    setTimeout(removeWindow, 500, $);
  });
};

const handleCloseDelDialog = ($) => {
  $.modalOverlay.addEventListener('click', e => {
    const target = e.target;
    if (target === $.modalOverlay || target.closest('.modal-no')) {
      $.modalOverlay.querySelector('.modal-form').style.top = '80px';
      $.modalOverlay.classList.remove('is-visible');
      setTimeout(removeWindow, 500, $);
    }
  });
};

const finishTask = ($) => {
  $.tBody.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.btn.btn-success')) {
      const row = target.closest('tr');

      const tableClassAttr = row.getAttribute('data-tableclass');
      row.classList.toggle(tableClassAttr);

      const editBtn = row.querySelector('.btn.btn-info');

      const success = row.classList.toggle('table-success');
      row.querySelector('td:nth-child(3)').classList.toggle('text-crossed-out');
      const tdStatus = row.querySelector('td:nth-child(4)');
      success ? tdStatus.textContent = '??????????????????' : tdStatus.textContent = '?? ????????????????';
      success ? target.textContent = '??????????????????????' : target.textContent = '??????????????????';
      success ? editBtn.setAttribute('disabled', '') : editBtn.removeAttribute('disabled');

      const storage = getStorage($.appName);
      const taskId = row.querySelector('td[data-id]').getAttribute('data-id');
      const user = getUser(storage, $);

      for (const task of user.tasks) {
        if (task.id === taskId) {
          task.status = success;
          break;
        }
      }
      udpateUserData(storage, user);
      saveStorge(storage, $.appName);
    }
  });
};

const editTask = ($) => {
  $.tBody.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.btn.btn-info')) {
      const td = target.closest('tr').querySelector('td:nth-child(3)');
      td.setAttribute('contenteditable', 'true');
      td.focus();
      td.addEventListener('blur', e => {
        td.removeAttribute('contenteditable');

        const storage = getStorage($.appName);
        const taskId = target.closest('tr').querySelector('td[data-id]').getAttribute('data-id');
        const user = getUser(storage, $);

        for (const task of user.tasks) {
          if (task.id === taskId) {
            task.text = td.textContent;
            break;
          }
        }

        udpateUserData(storage, user);
        saveStorge(storage, $.appName);
        renderCenter($);
      });
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

const removeTask = (tasks, taskId) => {
  tasks = tasks.filter(x => x.id !== taskId);
  return tasks;
};

export default {
  submitFormData,
  handleTaskInput,
  handleResetFormButton,
  deleteTask,
  renumerateTable,
  finishTask,
  editTask,
  closeDelDialog: handleCloseDelDialog
};
