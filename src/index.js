import { StrictMode } from "react";
import ReactDOM from "react-dom";

import { Keys } from "./Keys";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Keys />
  </StrictMode>,
  rootElement
);
