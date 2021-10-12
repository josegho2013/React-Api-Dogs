import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
 import store from "./Redux/store"
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
