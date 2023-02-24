const createLogo = () => {
  const h1 = document.createElement('h3');
  h1.classList.add('todo__title');
  h1.textContent = 'Todo App';
  return h1;
};

const createForm = () => {
  const form = document.createElement('form');
  form.classList.add('todo__form', 'form');
  form.name = 'todo__form';
  form.id = 'todo__form';
  form.method = 'post';

  const label = document.createElement('label');
  label.classList.add('form__label', 'form-group', 'me-3', 'mb-0');

  const input = document.createElement('input');
  input.classList.add('form__input', 'form-control');
  input.type = 'text';
  input.name = 'text';
  input.placeholder = 'ввести задачу';

  label.append(input);
  const {saveBtn, clearBtn} = createButtons();

  form.append(label, saveBtn, clearBtn);

  return {form, saveBtn, clearBtn};
};

const createButtons = () => {
  const saveBtn = document.createElement('button');
  saveBtn.classList.add('form__submit', 'btn', 'btn-primary', 'me-3');
  saveBtn.type = 'submit';
  saveBtn.textContent = ' Сохранить ';
  saveBtn.setAttribute('disabled', '');
  const clearBtn = document.createElement('button');
  clearBtn.classList.add('form__reset', 'btn', 'btn-warning');
  clearBtn.type = 'reset';
  clearBtn.textContent = ' Очистить ';

  return {
    saveBtn,
    clearBtn,
  };
};

const createTableWrapper = () => {
  const tableWrapper = document.createElement('div');
  tableWrapper.classList.add('todo__table-wrapper');

  const table = document.createElement('table');
  table.classList.add('todo__table', 'table', 'table-hover', 'table-bordered',);
  table.insertAdjacentHTML("beforeend",
    `
      <thead>
        <tr>
          <th>№</th>
          <th>Задача</th>
          <th>Статус</th>
          <th>Действия</th>
        </tr>
      </thead>
    `);

  const tBody = document.createElement('tbody');
  table.append(tBody);
  tableWrapper.append(table);
  return {tableWrapper, tBody};
};

const createRow = ({id, text, status}) => {

  const tr = document.createElement('tr');
  tr.classList.add(`${status ? 'table-success' : 'table-light'}`);
  tr.insertAdjacentHTML('beforeend',
    `
      <td class="hide-element" data-id="${id}"></td>
      <td></td>
      <td class="todo__task ${status ? 'text-crossed-out' : ''}">${text}</td>
      <td>${status ? 'Выполнена' : 'В процессе'}</td>
      <td>
        <button class="btn btn-danger"> Удалить </button>
        <button class="btn btn-success"> Завершить </button>
      </td>
    `);
  return tr;
};

const createId = () => {
  return Math.random().toString().substring(2, 10);
};

export default {
  createLogo,
  createForm,
  createTableWrapper,
  createRow,
  createId,
};