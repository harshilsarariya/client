import React, { useEffect } from "react";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";

export default function IndexPage() {
  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
  }, []);
  return (
    <>
      <div className="w-full nunito-font h-full bg-[#F1F5F9]">
        <div className="">
          <Navbar />
          <div className="flex flex-no-wrap">
            <SideBar />
            <Dashboard />
          </div>
        </div>
      </div>
    </>
  );
}
