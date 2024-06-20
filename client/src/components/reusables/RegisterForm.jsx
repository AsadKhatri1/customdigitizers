import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //   posting signup data

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        return toast.error("Enter valid email or password");
      }
      const res = await axios.post(
        "https://customdigitizers-rk58.onrender.com/api/register",
        {
          name,
          email,
          password,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Invalid credentials");
    }
  };
  return (
    <>
      <div className="min-vh-100 d-flex flex-column flex-sm-column-reverse align-items-center justify-content-center ">
        <form
          action="post"
          className="border rounded p-5 w-100"
          onSubmit={submitHandler}
        >
          <h1 style={{ color: "#344c5c", margin: "20px 0px" }}>Register</h1>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Full Name"
            className="my-3 w-75 py-2"
            style={{
              border: "none",
              borderBottom: "1px solid #344c5c",
              textIndent: "8px",
            }}
          />
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
            type="password"
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
            register
          </button>
          <NavLink to="/login" style={{ textDecoration: "none" }}>
            <p style={{ color: "#344c5c" }}>Already have an account? Login</p>
          </NavLink>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
