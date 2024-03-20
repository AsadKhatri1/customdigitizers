import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Select } from "antd";
import { useAuth } from "../../context/Auth";
import { NavLink, useNavigate } from "react-router-dom";
const { Option } = Select;
const CreateProduct = () => {
  // const { Option } = Select;
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [category, setcategory] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [showProducts, setShowProducts] = useState(false);

  // useAuth
  const [auth, setAuth] = useAuth();

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

  // craete product function
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
      productData.append("photo", photo);
      const res = await axios.post(
        "http://localhost:8080/api/create-product",
        productData,
        {
          headers: {
            Authorization: await auth?.token,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setName("");
        setPrice("");
        setQuantity("");
        setcategory("");
        setPhoto("");
        setDescription("");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error in creating product");
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
                <h2 className="fw-bold mb-5">Create Product</h2>

                <div className="m-1 w-100 text-center mt-5">
                  <form action="post" onSubmit={handleCreate}>
                    <div className="mb-5 w-100">
                      <input
                        style={{
                          textIndent: "10px",
                          padding: "6px 0px",
                          border: "none",
                          borderBottom: "2px solid gray",
                        }}
                        className="w-100 form-input"
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Product Name"
                      />
                    </div>

                    <div className="mb-5 w-100">
                      <textarea
                        style={{
                          textIndent: "10px",
                          padding: "6px 0px",
                          border: "none",
                          borderBottom: "2px solid gray",
                        }}
                        className="w-100 form-input"
                        type="text"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Product Description"
                      />
                    </div>

                    <div className="mb-5 w-100">
                      <input
                        style={{
                          textIndent: "10px",
                          padding: "6px 0px",
                          border: "none",
                          borderBottom: "2px solid gray",
                        }}
                        className="w-100 form-input"
                        type="number"
                        prefix="$"
                        min="0"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Product Price"
                      />
                    </div>

                    <div className="mb-5 w-100">
                      <input
                        style={{
                          textIndent: "10px",
                          padding: "6px 0px",
                          border: "none",
                          borderBottom: "2px solid gray",
                        }}
                        className="w-100 form-input"
                        type="number"
                        name="quantity"
                        value={quantity}
                        min="0"
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Product Quantity"
                      />
                    </div>
                    <div className="w-50 mb-5">
                      <Select
                        size="large"
                        showSearch
                        placeholder="Select a category"
                        className="form-select mb-3"
                        onChange={(value) => setcategory(value)}
                      >
                        {categories.map((c) => (
                          <Option value={c._id} key={c._id}>
                            {c.name}
                          </Option>
                        ))}
                      </Select>
                    </div>

                    <div className="mb-5 w-50">
                      <label className="btn btn-outline-secondary col-md-12">
                        {photo ? photo.name : "Upload image"}
                        <input
                          type="file"
                          name="photo"
                          accept="image/*"
                          onChange={(e) => setPhoto(e.target.files[0])}
                          hidden
                        />
                      </label>
                    </div>

                    <div className="mb-5">
                      <button
                        style={{
                          backgroundColor: "#344c5c",
                          color: "white",
                        }}
                        type="submit"
                        className="btn  mx-2"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
