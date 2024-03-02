import React from "react";

const CategoryForm = ({ value, submitHandler, setValue }) => {
  return (
    <>
      <form action="post" onSubmit={submitHandler}>
        <div className="mb-3 w-100">
          <input
            style={{ textIndent: "4px" }}
            className="m-2 border rounded py-2 w-75"
            type="text"
            placeholder="Create new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            type="submit"
            className="btn"
            style={{
              backgroundColor: "#344c5c",
              color: "white",
            }}
          >
            Add
          </button>
        </div>
      </form>
    </>
  );
};

export default CategoryForm;
