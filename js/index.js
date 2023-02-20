import {renderTodo} from "./modules/render.js";
import storage from "./modules/storage.js";
import {authorizeUser} from './modules/authorize.js';
{
  const init = (appSelector, appName) => {
    const app = document.querySelector(appSelector);
    const todo = renderTodo(app);

    //variables
    const {saveBtn, clearBtn, tBody} = todo;
    const generalVars = {saveBtn, clearBtn, tBody, appName};

    //functionality


    //start method
    generalVars.userName =  authorizeUser();
    storage.handleStorage(generalVars);
  };

  window.todoAppInit = init;
}
