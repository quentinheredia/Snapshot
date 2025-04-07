import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./scss/custom.scss";
import "bootstrap/dist/css/bootstrap.css";

const root = document.getElementById("root");

ReactDOM.createRoot(root as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
