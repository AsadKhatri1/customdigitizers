import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/Auth";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const AdminRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();
  const [time, setTimer] = useState(10);
  const navigate = useNavigate();
  const location = useLocation();

  // getting auth token from localstorage

  const token = localStorage.getItem("auth");
  const parseToken = JSON.parse(token);

  // useEffect for accessing private routes

  const authCheck = async () => {
    const res = await axios.get(
      "https://customdigitizers-rk58.onrender.com/api/admin-auth",
      {
        headers: {
          Authorization: await parseToken.token,
        },
      }
    );
    (await res.data.ok) ? setOk(true) : setOk(false);
  };
  useEffect(() => {
    authCheck();
  }, []);

  return ok ? (
    <Outlet />
  ) : (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>

      {time > 0 ? (
        <>
          <h2>Checking if you are eligible...</h2>
        </>
      ) : (
        <h2>You are unauthorized, click below</h2>
      )}

      <button
        className="btn btn-outline-dark mt-5"
        onClick={() => navigate("/login", { state: location.pathname })}
      >
        Back To Login
      </button>
    </div>
  );
};

export default AdminRoute;
