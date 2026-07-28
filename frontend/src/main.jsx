import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{
          backgroundColor: "var(--color-bg-dark)",
          color: "var(--color-text-light)",
          borderRadius: "12px",
          border: "1px solid rgba(111, 78, 55, 0.15)",
          fontSize: "12px",
          fontFamily: "Inter, sans-serif"
        }}
      />
    </BrowserRouter>
  </StrictMode>
);
