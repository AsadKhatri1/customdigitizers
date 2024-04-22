import React from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout.jsx";
import { useAuth } from "../../context/Auth.jsx";
import profile from "../../assets/profile.png";
const AdminDashboard = () => {
  const [auth, setAuth] = useAuth();
  return (
    <>
      <Layout>
        <div className="d-flex align-items-center justify-content-center">
          <div className="container m-3 p-3">
            <div className="row">
              <div className="col-md-3">
                <AdminMenu />
              </div>
              <div className="col-md-9 " style={{ height: "75vh" }}>
                <div className="card h-75 w-100 d-flex justify-content-center align-items-center flex-column">
                  <img
                    className="mb-3"
                    src={profile}
                    alt="profile"
                    style={{
                      width: "200px",
                      height: "200px",
                      borderRadius: "100%",
                    }}
                  />

                  <h2 className="fw-bold">{auth?.user?.name}</h2>
                  <h4 className="fw-bold">{auth?.user?.email}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AdminDashboard;
