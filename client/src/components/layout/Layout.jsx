import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = (props) => {
  return (
    <>
      <Header />
      <main style={{ minHeight: "81vh", height: "auto", padding: "20px 0px" }}>
        {props.children}
      </main>

      <Footer />
    </>
  );
};

export default Layout;
