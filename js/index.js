import {renderTodo} from './modules/render.js';
import {handleModal} from './modules/handleUser.js';
import control from './modules/control.js';

{
  const init = (appSelector, appName) => {
    const app = document.querySelector(appSelector);
    const todo = renderTodo(app);

    // variables
    const {saveBtn, clearBtn, tBody, taskForm: form, select, modalOverlay, modalForm} = todo;
    const generalVars = {saveBtn, clearBtn, tBody, appName, app, form, select, modalOverlay, modalForm};


    // functionality
    control.submitFormData(generalVars);
    control.handleTaskInput(generalVars);
    control.handleResetFormButton(generalVars);
    control.deleteTask(generalVars);
    control.finishTask(generalVars);
    control.editTask(generalVars);
    handleModal(generalVars);


    modalOverlay.querySelector('.form__input').focus();
  };

  window.todoAppInit = init;
}
