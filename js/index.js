import {renderTodo} from "./modules/render.js";
import storage from "./modules/storage.js";
import {openAuthorizeWindow, handelYesBtn, handleInput} from './modules/handleUser.js';
import control from './modules/control.js';

{
  const init = (appSelector, appName) => {
    const app = document.querySelector(appSelector);
    const todo = renderTodo(app);

    //variables
    const {saveBtn, clearBtn, tBody, form, authModal, select} = todo;
    const generalVars = {saveBtn, clearBtn, tBody, appName, app, form, authModal, select};


    //functionality
    control.submitFormData(generalVars);
    control.handleTaskInput(generalVars);
    control.handleResetFormButton(generalVars);
    control.deleteTask(generalVars);
    control.finishTask(generalVars);
    control.editTask(generalVars);
    handelYesBtn(generalVars);
    handleInput(generalVars);

    //start method
    openAuthorizeWindow(generalVars);
  };

  window.todoAppInit = init;
}
