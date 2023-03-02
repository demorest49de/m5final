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
  const {form: taskForm, saveBtn, clearBtn, select} = formBlock;
  const tableWrapper = createTableWrapper();

  const {tableWrapper: tWrapper, tBody} = tableWrapper;

  app.append(logo, taskForm, tWrapper);

  const body = document.querySelector('body');
  const {modalOverlay, modalForm} = createModal();
  body.append(modalOverlay);

  return {saveBtn, clearBtn, tBody, taskForm, select, modalOverlay, modalForm};
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
  renderAppCenter($);
};

export const renderAppCenter = ($) => {
  const appWidth = $.app.clientWidth;
  console.log(': ', screen.width);
  const resultWidth = (screen.width / 2) - (appWidth / 2);
  console.log(': ', resultWidth);
  $.app.style.left = `${resultWidth}px`;
};