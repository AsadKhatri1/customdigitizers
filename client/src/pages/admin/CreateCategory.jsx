import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";
import CategoryForm from "../../components/reusables/CategoryForm";
import { RxCross2 } from "react-icons/rx";
import { useAuth } from "../../context/Auth";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
const CreateCategory = () => {
  const [auth, setAuth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [putId, setPutId] = useState("");

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
  const [editName, setEditName] = useState("");
  const [show, setShow] = useState(false);
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

  // deleting category:
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/api/delete-category/${id}`,
        {
          headers: {
            Authorization: await auth.token,
          },
        }
      );
      if (res.data.success) {
        toast.success(`${res.data.category.name} is deleted`);
        getAllCategories();
      }
    } catch (err) {
      console.log(err);
      toast.error("Error in deleting category");
    }
  };

  const handleEdit = async (slug, id) => {
    setShow(!show);
    setPutId(id);
    try {
      const res = await axios.get(
        `http://localhost:8080/api/get-category/${slug}`
      );
      if (res) {
        setEditName(res.data.category[0].name);
      }
    } catch (err) {
      console.log(error);
      toast.error("Error in getting single category");
    }
  };
  const editSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8080/api/update-category/${putId}`,
        { name: editName },
        {
          headers: {
            Authorization: await auth.token,
          },
        }
      );
      if (res) {
        toast.success(res.data.message);
        getAllCategories();
        setShow(!show);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error in updating the category");
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
                <div>
                  <h2 className="fw-bold">Create New</h2>
                  <CategoryForm
                    submitHandler={handleSubmit}
                    value={name}
                    setValue={setName}
                  />
                </div>

                <div>
                  {/* input for updating the caegory name */}
                  {show ? (
                    <>
                      <form
                        className="d-flex flex-row w-100 "
                        onSubmit={editSubmitHandler}
                      >
                        <div className="inputs vw-100 p-1">
                          <div className="mb-3">
                            <label
                              htmlFor="exampleInputEmail1"
                              className="form-label mx-2"
                            >
                              Edit category
                            </label>
                            <input
                              type="text"
                              className="form-control m-2 rounded py-2 w-100"
                              id="exampleInputEmail1"
                              placeholder="Edit the category"
                              aria-describedby="emailHelp"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                            />
                          </div>

                          <button
                            style={{
                              backgroundColor: "#344c5c",
                              color: "white",
                            }}
                            type="submit"
                            className="btn mx-2 my-3"
                          >
                            Update
                          </button>
                        </div>
                        <div className="cross">
                          <button
                            style={{ marginRight: "20px" }}
                            className="btn p-2"
                            onClick={() => setShow(!show)}
                          >
                            {" "}
                            <RxCross2
                              style={{
                                // backgroundColor: "#fc9840",
                                color: "#344c5c",
                                fontSize: "22px",
                              }}
                            />
                          </button>
                        </div>
                      </form>
                    </>
                  ) : null}
                  <h2 className="fw-bold">All Categories</h2>
                  <table
                    class="table"
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
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories?.map((c) => (
                        <tr key={c._id}>
                          <td
                            key={c._id}
                            className="text-center fw-bold align-middle"
                          >
                            {c.name}
                          </td>
                          <td className="text-center" key={c._id + 1}>
                            <button
                              style={{
                                backgroundColor: "#344c5c",
                                color: "white",
                                fontSize: "14px",
                              }}
                              className="btn ms-2"
                              onClick={() => handleEdit(c.slug, c._id)}
                            >
                              <FaEdit />
                            </button>
                            <button
                              style={{
                                backgroundColor: "#fc9840",
                                fontSize: "14px",
                                color: "white",
                              }}
                              className="btn ms-2"
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
      </div>
    </Layout>
  );
};

export default CreateCategory;
