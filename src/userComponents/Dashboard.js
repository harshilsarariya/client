import React from "react";
import ViewByStates from "./ViewByStates";

const Dashboard = () => {
  return (
    <div className="w-full  ">
      <div className="   container mx-auto py-6 h-full md:w-full w-11/12 px-6">
        <div className="w-full h-full rounded">
          <h1 className="text-xl w-44 font-medium  border-b-2 border-gray-300">
            Assigned States
          </h1>
          <ViewByStates />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
