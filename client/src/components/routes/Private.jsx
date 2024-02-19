import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/Auth";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Private = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // useEffect for accessing private routes
  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("http://localhost:8080/api/user-auth", {
        headers: {
          Authorization: auth?.token,
        },
      });

      res.data.ok ? setOk(true) : setOk(false);
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
      <button
        className="btn btn-outline-dark mt-5"
        onClick={() => navigate("/login", { state: location.pathname })}
      >
        Back To Login
      </button>
      {!authorized ? (
        <>
          <h2>Unauthorized access</h2>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Private;
