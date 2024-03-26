import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaCartArrowDown, FaHeadphonesAlt } from "react-icons/fa";
import { RiHomeOfficeFill } from "react-icons/ri";
import { MdAccountBalanceWallet } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { IoLogIn } from "react-icons/io5";
import logo from "../../assets/logo.png";
import { useAuth } from "../../context/Auth";
import { toast } from "react-toastify";
const Header = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Loggedout successfully");
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              src={logo}
              alt="Logo"
              style={{ width: "auto", height: "55px" }}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  <FaHome className="mx-2 mb-1" />
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  <RiHomeOfficeFill className="mx-2 mb-1" />
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact" className="nav-link">
                  <FaHeadphonesAlt className="mx-2 mb-1" />
                  Contact
                </NavLink>
              </li>
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      <MdAccountBalanceWallet className="mx-2 mb-1" />
                      Signup
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      <IoLogIn className="mx-2 mb-1" />
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  {auth.user.role === 1 ? (
                    <></>
                  ) : (
                    <>
                      <li className="nav-item">
                        <NavLink
                          to="/cart"
                          className="nav-link"
                          style={{ color: "#344c5c" }}
                        >
                          <FaCartArrowDown className="mx-2 mb-1" />
                          cart(0)
                        </NavLink>
                      </li>
                    </>
                  )}
                  <div className="dropdown ">
                    <button
                      className="btn btn-outline-dark dropdown-toggle mx-2"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </button>
                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1
                              ? "admin/profile"
                              : "user/profile"
                          }`}
                          className="nav-link"
                          style={{ color: "#344c5c" }}
                        >
                          Dashboard
                        </NavLink>
                      </li>

                      <li className="nav-item">
                        <NavLink onClick={handleLogout} className="nav-link">
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </>
              )}
              {/* <li className="nav-item">
                <NavLink
                  to="/cart"
                  className="nav-link"
                  style={{ color: "#344c5c" }}
                >
                  <FaCartArrowDown className="mx-2 mb-1" />
                  cart(0)
                </NavLink>
              </li>
              <div className="dropdown ">
                <button
                  className="btn btn-outline-secondary dropdown-toggle mx-2"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {auth?.user?.name}
                </button>
                <ul className="dropdown-menu">
                  <li className="nav-item">
                    <NavLink
                      to={`/dashboard/${
                        auth?.user?.role === 1 ? "admin" : "user"
                      }`}
                      className="nav-link"
                      style={{ color: "#344c5c" }}
                    >
                      Dashboard
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink onClick={handleLogout} className="nav-link">
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </div> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
