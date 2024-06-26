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

        <NavLink to="/dashboard/user/downloads" className="product_link">
          <li className="list-group-item fw-bold">Downloads</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default UserMenu;
