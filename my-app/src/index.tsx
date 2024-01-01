import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RenderEditor from "./Editor/Editor";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <RenderEditor />
  </React.StrictMode>,
);

reportWebVitals();
