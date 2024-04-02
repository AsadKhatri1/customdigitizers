import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const params = useParams();
  // getProduct
  const getSingleProduct = async () => {
    const { data } = await axios.get(
      `http://localhost:8080/api/get-product/${params.slug}`
    );
    if (data.product) {
      setProduct(data.product);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);
  return (
    <Layout>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-6">
            <img
              src={`http://localhost:8080/api/product-photo/${product?._id}`}
              className="card-img-top center"
              alt={product?.name}
              style={{
                height: "22rem",
                width: "22rem",
              }}
            />
          </div>
          <div className="col-md-6 p-3">
            <h2>{product?.name}</h2>
            <h5>${product?.price}</h5>
            <p>{product?.category?.name}</p>
            <p>{product?.description}</p>
            {/* <button className="btn btn-success mx-3 p-2">Add To Cart</button>
            <button className="btn btn-dark mx-3 p-2">Add To Favorites</button> */}
          </div>
        </div>

        {/* similar products */}
        <div className="row">similar prods</div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
