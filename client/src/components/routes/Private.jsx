import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/Auth";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Private = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // timer to go back to login

  // const interval = setInterval(() => {
  //   setTimer((prev) => prev - 1);
  // }, 1000);
  // // clearInterval(interval);
  // console.log(time);

  // useEffect for accessing private routes
  useEffect(() => {
    // Set the default authorization header for all requests
    console.log(auth?.token);
    // const autho = localStorage.getItem("auth");
    // axios.defaults.headers.common["Authorization"] = autho.token;

    const authCheck = async () => {
      const res = await axios.get(
        "https://customdigitizers-rk58.onrender.com/api/user-auth",
        {
          headers: {
            Authorization: await auth.token,
          },
        }
      );
      (await res.data.ok) ? setOk(true) : setOk(false);
    };
    authCheck();
  }, []);

  return ok ? (
    <Outlet />
  ) : (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>

      <>
        <h2>Checking if you are eligible...</h2>
      </>

      <h2>You are unauthorized, click below</h2>

      <button
        className="btn btn-outline-dark mt-5"
        onClick={() => navigate("/login", { state: location.pathname })}
      >
        Back To Login
      </button>
    </div>
  );
};

export default Private;
