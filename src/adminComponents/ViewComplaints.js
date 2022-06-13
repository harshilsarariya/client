import React from "react";
import ComplaintsList from "./ComplaintsList";
import Navbar from "./Navbar";
import SideBar from "./SideBar";

const ViewComplaint = () => {
  return (
    <div className="w-full nunito-font h-full bg-[#F1F5F9]">
      <div className="">
        <Navbar />
        <div className="flex flex-no-wrap">
          <SideBar />
          <ComplaintsList />
        </div>
      </div>
    </div>
  );
};

export default ViewComplaint;
