import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import CategoryForm from "../../components/reusables/CategoryForm";
import { useAuth } from "../../context/Auth";

const CreateCategory = () => {
  const [auth, setAuth] = useAuth();
  const [categories, setCategories] = useState([]);

  //  getting all categories available
  const getAllCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/get-categories");
      if (res.data.success) {
        setCategories(res.data.categories);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error in fetching categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // initializing for add new category:
  const [name, setName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/create-category",
        { name },
        {
          headers: {
            Authorization: await auth.token,
          },
        }
      );
      if (res.data?.success) {
        toast.success(res.data.message);
        setName("");
        getAllCategories();
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error in adding new category");
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
              <div className="card">
                <h2>All Categories</h2>
                <div>
                  <CategoryForm
                    submitHandler={handleSubmit}
                    value={name}
                    setValue={setName}
                  />
                </div>
                <div>
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories?.map((c) => (
                        <tr>
                          <td key={c._id}>{c.name}</td>
                          <td>
                            <button className="btn btn-primary ms-2">
                              Edit
                            </button>
                            <button className="btn btn-danger ms-2">
                              Delete
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
      </div>
    </Layout>
  );
};

export default CreateCategory;
