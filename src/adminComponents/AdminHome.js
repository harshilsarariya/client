import React from "react";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import SideBar from "./SideBar";

export default function IndexPage() {
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
