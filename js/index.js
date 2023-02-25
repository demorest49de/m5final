import {renderTodo} from "./modules/render.js";
import storage from "./modules/storage.js";
import {openAuthorizeWindow} from './modules/handleUser.js';
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

    //start method
    generalVars.userName = openAuthorizeWindow(generalVars);
    storage.handleStorage(generalVars);

  };

  window.todoAppInit = init;
}
