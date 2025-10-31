import React from "react";
import Home from "../Home.jsx/Home";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default RootLayout;
