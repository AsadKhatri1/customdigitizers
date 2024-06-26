import { useState } from "react";
// toasting import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import PageNotFound from "./pages/PageNotFounf.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/user/Dashboard.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import Private from "./components/routes/Private.jsx";
import AdminRoute from "./components/routes/AdminRoute.jsx";
import CreateCategory from "./pages/admin/CreateCategory.jsx";
import CreateProduct from "./pages/admin/CreateProduct.jsx";
import Users from "./pages/admin/Users.jsx";
import Orders from "./pages/user/Orders.jsx";
import Products from "./pages/admin/Products.jsx";
import Search from "./pages/Search.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Shop from "./pages/Shop.jsx";
import Success from "./pages/Success.jsx";
import Cancel from "./pages/Cancel.jsx";
import Downloads from "./pages/user/Downloads.jsx";

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/product/:slug" element={<ProductDetails />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/shop" element={<Shop />}></Route>
          <Route
            path="/successyeowmdjsbashdshdsjdbudhwuehuwy736427462813239/eu34637"
            element={<Success />}
          ></Route>
          <Route path="/cancel" element={<Cancel />}></Route>

          {/* User dashoards private routes */}
          <Route path="/dashboard" element={<Private />}>
            <Route path="user/profile" element={<Dashboard />}></Route>
            <Route path="user/downloads" element={<Downloads />}></Route>
          </Route>

          {/* Admin dashoards private routes */}
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin/profile" element={<AdminDashboard />}></Route>
            <Route
              path="admin/create-category"
              element={<CreateCategory />}
            ></Route>
            <Route
              path="admin/create-product"
              element={<CreateProduct />}
            ></Route>
            <Route path="admin/products" element={<Products />}></Route>
            <Route path="admin/users" element={<Users />}></Route>
          </Route>

          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
