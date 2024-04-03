import React from "react";
import RegisterForm from "../components/reusables/RegisterForm";

const Register = () => {
  return (
    <>
      <>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 border">
              <RegisterForm />
            </div>
            <div className="col-lg-4 d-flex min-vh-100 align-items-center justify-content-center border">
              <h2>Register</h2>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default Register;
