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
  saveBtn.textContent = 'Сохранить';
  const clearBtn = document.createElement('button');
  clearBtn.classList.add('form__reset', 'btn', 'btn-warning');
  clearBtn.type = 'reset';
  clearBtn.textContent = 'Очистить';

  return {
    saveBtn,
    clearBtn,
  };
};

const createTableWrapper = () => {

};

export default {
  createLogo,
  createForm,
  createTableWrapper
};