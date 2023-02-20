import createElement from './createElement.js';

const {
  createLogo,
  createForm,
  createTableWrapper,
  createRow,
} = createElement;

export const renderTodo = (app) => {
  const logo = createLogo();
  const formBlock = createForm();
  const {form, saveBtn, clearBtn} = formBlock;
  const tableWrapper = createTableWrapper();

  const {tableWrapper: tWrapper, tBody} = tableWrapper;

  app.append(logo, form, tWrapper);

  return {saveBtn, clearBtn, tBody};
};

export const renderItems = (storage, $) => {
  while ($.tBody.firstChild) {
    $.tBody.removeChild($.tBody.firstChild);
  }

  Object.values(storage.data).forEach(value => {
    const row = createRow(value);
    $.tBody.append(row);
  });
};