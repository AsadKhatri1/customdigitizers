import React from "react";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  const logout = (e) => {
    e.preventDefault();
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Loggedout successfully");
    navigate("/login");
  };
  return (
    <div className="mb-5">
      <ul className="list-group">
        <NavLink to="/dashboard/admin/profile" className="product_link">
          <li className="list-group-item  fw-bold">Profile</li>
        </NavLink>

        <NavLink to="/dashboard/admin/create-category" className="product_link">
          <li className="list-group-item  fw-bold">Create Category</li>
        </NavLink>
        <NavLink to="/dashboard/admin/create-product" className="product_link">
          <li className="list-group-item  fw-bold">Create Product</li>
        </NavLink>
        <NavLink to="/dashboard/admin/users" className="product_link">
          <li className="list-group-item  fw-bold">Users</li>
        </NavLink>
        <NavLink
          to="/dashboard/admin/products"
          className="product_link fw-bold"
        >
          <li className="list-group-item">Products</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default AdminMenu;
