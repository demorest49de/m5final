import {renderTodo} from "./modules/render.js";
import storage from "./modules/storage.js";
import {openAuthorizeWindow, handelYesBtn} from './modules/handleUser.js';
import control from './modules/control.js';

{
  const init = (appSelector, appName) => {
    const app = document.querySelector(appSelector);
    const todo = renderTodo(app);

    //variables
    const {saveBtn, clearBtn, tBody, form, authModal} = todo;
    const generalVars = {saveBtn, clearBtn, tBody, appName, app, form, authModal};


    //functionality
    control.submitFormData(generalVars);
    control.handleTaskInput(generalVars);
    control.handleResetFormButton(generalVars);
    control.deleteTask(generalVars);
    control.finishTask(generalVars);
    control.editTask(generalVars);
    generalVars.userName = handelYesBtn(generalVars);

    //start method
    openAuthorizeWindow(generalVars);

    // storage.handleStorage(generalVars);

  };

  window.todoAppInit = init;
}
