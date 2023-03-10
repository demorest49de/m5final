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
  label.classList.add('form__label', 'form-group');

  const input = document.createElement('input');
  input.classList.add('form__input', 'form-control');
  input.type = 'text';
  input.name = 'text';
  input.placeholder = 'ввести задачу';

  label.append(input);
  const {saveBtn, clearBtn} = createButtons();

  const taskSelect = {
    className: ['form__select', 'form-select'],
    aria: {key: 'aria-label', value: 'Task importance'},
    options: [
      ['table-light', 'обычная'],
      ['table-warning', 'важная'],
      ['table-danger', 'срочная'],
    ],
  };
  const select = createSelect(taskSelect);

  form.append(label, select, saveBtn, clearBtn);

  return {form, saveBtn, clearBtn, select};
};

const createSelect = (task) => {
  const select = document.createElement('select');
  select.classList.add(...task.className);
  select.name = 'priority';
  select.setAttribute(task.aria.key, task.aria.value);
  select.add(new Option('Приоритет', undefined, true));
  for (const [value, text] of task.options) {
    const option = new Option(text, value);
    select.add(option);
  }

  return select;
};

const createButtons = () => {
  const saveBtn = document.createElement('button');
  saveBtn.classList.add('form__submit', 'btn', 'btn-primary');
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
  table.classList.add('todo__table', 'table', 'table-hover', 'table-bordered');
  table.insertAdjacentHTML('beforeend',
      `
      <thead>
        <tr>
          <th>№</th>
          <th>Задача</th>
          <th>Статус</th>
          <th>Приоритет</th>
          <th colspan="4">Действия</th>
        </tr>
      </thead>
    `);

  const tBody = document.createElement('tbody');
  table.append(tBody);
  tableWrapper.append(table);
  return {tableWrapper, tBody};
};

const createRow = ({id, text, status, priority}) => {
  const [priorityValue, priorityText] = priority;
  const tr = document.createElement('tr');
  tr.classList.add(`${status ? 'table-success' : priorityValue}`);
  tr.setAttribute('data-tableClass', `${priorityValue}`);
  tr.insertAdjacentHTML('beforeend',
      `
      <td class="hide-element" data-id="${id}"></td>
      <td></td>
      <td class="todo__task ${status ? 'text-crossed-out' : ''}">${text}</td>
      <td>${status ? 'Выполнена' : 'В процессе'}</td>
      <td>${priorityText}</td>
      <td class="todo__action-btn">
        <button class="btn btn-info" ${status ? 'disabled' : ''}> Редактировать </button>
      </td>
      <td class="todo__action-btn">
        <button class="btn btn-danger"> Удалить </button>
      </td>
      <td class="todo__action-btn">
        <button class="btn btn-success"> ${status ? 'Возобновить' : 'Завершить'} </button>
      </td>
    `);
  return tr;
};

const createId = () => Math.random().toString().substring(2, 10);

const createModal = () => {
  const modalOverlay = document.createElement('div');
  modalOverlay.classList.add('modal-overlay');

  const modalForm = document.createElement('form');
  modalForm.classList.add('modal-form', 'form');

  modalForm.insertAdjacentHTML('beforeend',
      `
      <div class="form__header">
          <h1 class="form__title">Введите имя пользователя</h1>
      </div>
        <div class="form__body">
            <label class="form__label form-group">
              <input class="form__input form-control" 
              tabindex="1" type="text" name="text" value="андрей"
              placeholder="введите имя">
            </label>
            <div class="form__message"><span class="form__text"></span></div>
        </div>
        <div class="form__footer">
          <button type="submit" class="btn btn-primary form__submit" 
          tabindex="2"> Сохранить </button>
        </div>
      </div>
    `);
  modalOverlay.append(modalForm);
  return {modalOverlay, modalForm};
};

export default {
  createLogo,
  createForm,
  createTableWrapper,
  createRow,
  createId,
  createModal,
};
