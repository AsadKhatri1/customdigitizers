import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center">
      <h1 className="fw-bold">Page Not Found</h1>
      <Link to="/">
        <button className="btn btn-outline-dark">Go Back</button>
      </Link>
    </div>
  );
};

export default PageNotFound;
