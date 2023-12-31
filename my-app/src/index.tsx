import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RenderEditor from "./Editor/Editor";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./Store/Store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RenderEditor />
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
