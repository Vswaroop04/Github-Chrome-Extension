import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Toaster from "./lib/ToastContainer.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <div>
    <App />
    <Toaster />
  </div>
);
