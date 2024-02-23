import React from "react";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/Auth";
import UserMenu from "../../components/layout/UserMenu";
const Dashboard = () => {
  const [auth, setAuth] = useAuth();
  return (
    <>
      <Layout>
        <div className="d-flex align-items-center justify-content-center">
          <div className="container m-3 p-3">
            <div className="row">
              <div className="col-md-3">
                <UserMenu />
              </div>
              <div className="col-md-9">
                <div className="card">
                  <h2>Welcome {auth?.user?.name}</h2>
                  <h5>Name: {auth?.user?.name}</h5>
                  <h5>Email: {auth?.user?.email}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
