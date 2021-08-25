import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import "./style.css";

ReactDOM.render(
  <React.StrictMode>
    {/* importing App containing all components */}
    <App />
  </React.StrictMode>,
  document.getElementById("App") // render into the main div with id='App'
);
