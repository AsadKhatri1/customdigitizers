import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const params = useParams();
  const [relatedProducts, setRelatedProducts] = useState([]);
  // getProduct
  const getSingleProduct = async () => {
    const { data } = await axios.get(
      `http://localhost:8080/api/get-product/${params.slug}`
    );
    if (data.product) {
      setProduct(data.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  // getting similar products and this will be called when the single product is called
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/similar-products/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Layout>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-4 border">
            <img
              src={`http://localhost:8080/api/product-photo/${product?._id}`}
              className="card-img-top center "
              alt={product?.name}
              style={{
                height: "22rem",
                width: "22rem",
              }}
            />
          </div>
          <div className="col-md-8 p-5 ">
            <span>
              <h2>{product?.name}</h2>
            </span>
            <span>
              <h5 className="text-success">${product?.price}</h5>
            </span>

            <p className="opacity-50">{product?.category?.name}</p>
            <p>{product?.description}</p>
            <button className="btn btn-success">Add To Cart</button>
          </div>
        </div>

        {/* similar products */}
        <div className="row ">
          <h2 className="mt-4">Similar Products</h2>

          {relatedProducts?.map((item, index) => (
            <div
              className="d-flex flex-row my-2 product_link col-md-3"
              key={item._id}
              to={`/product/${item.slug}`}
            >
              <div className="card" style={{ width: "18rem" }}>
                <img
                  src={`http://localhost:8080/api/product-photo/${item._id}`}
                  className="card-img-top center"
                  alt={item.name}
                  style={{
                    height: "100px",
                    width: "100px",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title mb-3 fw-bold">{item.name}</h5>

                  <p>${item.price}</p>

                  <p className="opacity-75">{item.category.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
