import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { App } from "./App";

// Aqui é o ponto de entrada da aplicação
// Renderizamos o componente App dentro do div com id root da pagina
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
