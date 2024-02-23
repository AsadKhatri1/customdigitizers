import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/Auth.jsx";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [auth, setAuth] = useAuth();
  const str = JSON.stringify(auth);
  const navigate = useNavigate();
  useEffect(() => {
    const login = localStorage.getItem("auth");
    // if (!login) {
    //   navigate("/login");
    // }
  }, []);
  return (
    <Layout>
      <h1>Ecommerce App</h1>
      <pre>{str}</pre>
    </Layout>
  );
};

export default Home;
