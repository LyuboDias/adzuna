import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import "./style.css";

ReactDOM.render(
  <div className="sm:my-auto">
    {/* importing App containing all components */}
    <App />
  </div>,
  document.getElementById("App") // render into the main div with id='App'
);
