import createElement from './createElement.js';
import control from './control.js';

const {renumerateTable} = control;

const {
  createLogo,
  createForm,
  createTableWrapper,
  createRow,
  createModal,
} = createElement;

export const renderTodo = (app) => {
  const logo = createLogo();
  const formBlock = createForm();
  const {form, saveBtn, clearBtn, select} = formBlock;
  const tableWrapper = createTableWrapper();

  const {tableWrapper: tWrapper, tBody} = tableWrapper;

  app.append(logo, form, tWrapper);

  const body = document.querySelector('body');
  const modal = createModal();
  body.append(modal);

  return {saveBtn, clearBtn, tBody, form, modal, select};
};

export const renderItems = (tasks, $) => {
  while ($.tBody.firstChild) {
    $.tBody.removeChild($.tBody.firstChild);
  }

  Object.values(tasks).forEach((task, index) => {
    const row = createRow(task);
    $.tBody.append(row);
  });
  renumerateTable($.tBody);
};