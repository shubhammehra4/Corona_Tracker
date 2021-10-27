import React from "react";
import ReactDOM from "react-dom";
import "regenerator-runtime/runtime";
import "./index.css";
import App from "./App";
import GloabContextWrapper from "./context/globalContext";

ReactDOM.render(
  <React.StrictMode>
    <GloabContextWrapper>
      <App />
    </GloabContextWrapper>
  </React.StrictMode>,
  document.getElementById("root")
);
