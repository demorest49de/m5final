import {renderTodo} from "./modules/render.js";

{
  const init = (selectorApp) => {
    const app = document.querySelector(selectorApp);

    const todo = renderTodo(app);

    //variables
    // const {} = todo;
    // const generalVars = {};

    //functionality

  };

  window.todoAppInit = init;
}
