import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { useAuth } from "../../context/Auth.jsx";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        return toast.error("Enter valid email or password");
      }
      const res = await axios.post(
        `https://customdigitizers-rk58.onrender.com/api/login`,
        {
          email,
          password,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.setItem("auth", JSON.stringify(res.data));
        setAuth({ ...auth, user: res.data.user, token: res.data.token });
        navigate(location.state || "/");
      }
    } catch (err) {
      console.log(err);
      toast.error("Invalid credentials");
    }
  };
  return (
    <>
      <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center ">
        <form
          action="post"
          className="border rounded p-5  w-100"
          onSubmit={submitHandler}
        >
          <h1 style={{ color: "#344c5c", margin: "20px 0px" }}>Login</h1>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email Address"
            className="my-3 w-75 py-2"
            style={{
              border: "none",
              borderBottom: "1px solid #344c5c",
              textIndent: "8px",
            }}
          />
          <br></br>
          <input
            type="password "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your password"
            className="my-3 w-75 py-2"
            style={{
              border: "none",
              borderBottom: "1px solid #344c5c",
              textIndent: "8px",
            }}
          />
          <br></br>
          <button
            className="btn my-3 px-5 py-2 display-4 submit"
            style={{
              color: "#fc9840",
              //   border: "2px solid white",
              background: "#344c5c",
            }}
          >
            Login
          </button>
          <NavLink to="/register" style={{ textDecoration: "none" }}>
            <p style={{ color: "#344c5c" }}>Don't have an account? Signup</p>
          </NavLink>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
