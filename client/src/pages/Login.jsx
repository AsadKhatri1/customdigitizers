import React from "react";
import LoginForm from "../components/reusables/LoginForm";

const Login = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 border">
            <LoginForm />
          </div>
          <div className="col-lg-4 d-flex flex-sm-column-reverse min-vh-100 align-items-center justify-content-center border">
            <h2>Login</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
