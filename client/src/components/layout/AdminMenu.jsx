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
        <NavLink to="/dashboard/admin">
          <li className="list-group-item" aria-current="true">
            Profile
          </li>
        </NavLink>

        <NavLink to="/dashboard/admin/create-category">
          <li className="list-group-item ">Create Category</li>
        </NavLink>
        <NavLink to="/dashboard/admin/create-product">
          <li className="list-group-item">Create Product</li>
        </NavLink>
        <NavLink to="/dashboard/admin/users">
          <li className="list-group-item">Users</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default AdminMenu;
