import createElement from './createElement.js';

const {
  createLogo,
  createForm,
  createTableWrapper,
  createRow
} = createElement;

export const renderTodo = (app) => {
  const logo = createLogo();
  const formBlock = createForm();
  const {form, saveBtn, clearBtn} = formBlock;
  const tableWrapper = createTableWrapper();

  // const {tHead, tBody} = tableWrapper;

  app.append(logo, form, tableWrapper);

  // return {saveBtn, clearBtn, tHead, tBody};
};