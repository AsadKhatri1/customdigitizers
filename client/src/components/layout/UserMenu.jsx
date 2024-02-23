import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div>
      <ul className="list-group">
        <NavLink to="/dashboard/user">
          <li className="list-group-item" aria-current="true">
            Profile
          </li>
        </NavLink>

        <NavLink to="/dashboard/user/orders">
          <li className="list-group-item">Orders</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default UserMenu;
