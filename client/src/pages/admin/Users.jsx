import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useAuth } from "../../context/Auth";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [auth, setAuth] = useAuth();

  const getAllUsers = async () => {
    const { data } = await axios.get(
      "https://customdigitizers-rk58.onrender.com/api/get-users"
    );
    if (data.users) {
      // setUsers(data.users);
      const filteredUsers = data.users.filter((u) => u.role === 0);
      setUsers(filteredUsers);
    } else {
      toast.error("Error in getting products");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `https://customdigitizers-rk58.onrender.com/api/delete-user/${id}`,
        {
          headers: {
            Authorization: await auth.token,
          },
        }
      );
      if (res.data.success) {
        toast.success(`${res.data.user.name} is deleted`);
        getAllUsers();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Layout>
      <div className="d-flex align-items-center justify-content-center">
        <div className="container m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <div>
                <h2 className="fw-bold">All Users</h2>
                {users.length < 1 ? (
                  <h4 className="text-danger text-center">
                    No users are registered
                  </h4>
                ) : (
                  <></>
                )}
                <table
                  className="table p-3 rounded"
                  style={{
                    boxShadow:
                      "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                  }}
                >
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="text-center fw-bold h5"
                        style={{ color: "#344c5c" }}
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="text-center fw-bold h5"
                        style={{ color: "#344c5c" }}
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="text-center fw-bold h5"
                        style={{ color: "#344c5c" }}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.map((c) => (
                      <tr key={c._id}>
                        <td
                          key={c._id}
                          className="text-center fw-bold align-middle"
                        >
                          {c.name}
                        </td>
                        <td
                          key={c._id}
                          className="text-center fw-bold align-middle"
                        >
                          {c.email}
                        </td>
                        <td className="text-center" key={c._id + 1}>
                          <button
                            className="btn btn-danger ms-2"
                            onClick={() => handleDelete(c._id)}
                          >
                            <MdDelete />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
