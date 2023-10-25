import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RenderEditor from "./Editor/Editor";
import testValues from "./testValues";
import reportWebVitals from "./reportWebVitals";

testValues();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <RenderEditor />
  </React.StrictMode>,
);

reportWebVitals();
