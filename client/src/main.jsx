import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/Auth.jsx";
import { SearchProvider } from "./context/Search.jsx";
import { CartProvider } from "./context/Cart.jsx";
import { PayProvider } from "./context/Pay.jsx";
// import "antd/dist/antd.css"; // Import Ant Design CSS

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SearchProvider>
      <PayProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </PayProvider>
    </SearchProvider>
  </AuthProvider>
);
