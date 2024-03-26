import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div>
      <ul className="list-group">
        <NavLink to="/dashboard/user/profile" className="product_link">
          <li className="list-group-item fw-bold" aria-current="true">
            Profile
          </li>
        </NavLink>

        <NavLink to="/dashboard/user/orders" className="product_link">
          <li className="list-group-item fw-bold">Orders</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default UserMenu;
