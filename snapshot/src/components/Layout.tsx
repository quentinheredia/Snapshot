import React from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout: React.FC = () => {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "80px", minHeight: "80vh" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
