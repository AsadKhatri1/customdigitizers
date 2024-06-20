import React from "react";
import { useSearch } from "../../context/Search";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const navigate = useNavigate();
  const [values, setValues] = useSearch();
  const searchHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `https://customdigitizers-rk58.onrender.com/api/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (err) {
      console.log(err);
      toast.error("Error in searching products");
    }
  };
  return (
    <div className="container my-4">
      <form
        className="d-flex w-75 ms-auto "
        role="search"
        onSubmit={searchHandler}
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-outline-dark" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
