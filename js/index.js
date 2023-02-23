import {renderTodo} from "./modules/render.js";
import storage from "./modules/storage.js";
import {authorizeUser} from './modules/handleUser.js';
import control from './modules/control.js';

{
  const init = (appSelector, appName) => {
    const app = document.querySelector(appSelector);
    const todo = renderTodo(app);

    //variables
    const {saveBtn, clearBtn, tBody, form} = todo;
    const generalVars = {saveBtn, clearBtn, tBody, appName, app, form};

    //functionality
    control.submitFormData(generalVars);
    control.handleTaskInput(generalVars);

    //start method
    generalVars.userName = authorizeUser();
    storage.handleStorage(generalVars);
  };

  window.todoAppInit = init;
}
