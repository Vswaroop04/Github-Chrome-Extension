import React from "react";
import ReactDOM from "react-dom/client";
import ServiceWorker from "./Components/ServiceWorker";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ServiceWorker />
  </React.StrictMode>
);
