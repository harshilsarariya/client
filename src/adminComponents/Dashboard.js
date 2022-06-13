import React, { useState } from "react";
import ComplaintsCounter from "./ComplaintsCounter";
import RecentComplaint from "./RecentComplaint";

const Dashboard = () => {
  const labels = [
    { lab: "Open", color: "orange", count: 213 },
    { lab: "In Progress", color: "blue", count: 253 },
    { lab: "Closed", color: "green", count: 243 },
  ];

  return (
    <div className="w-full  ">
      <div className="   container mx-auto py-6 h-full md:w-full w-11/12 px-6">
        <div className="w-full h-full rounded">
          <h1 className="text-xl font-medium">General Report</h1>
          <div className="grid grid-cols-12 gap-16 mt-5 transition duration-150 ease-out hover:ease-in-out">
            {labels.map((label, index) => (
              <ComplaintsCounter
                key={index}
                label={label.lab}
                color={label.color}
                count={label.count}
              />
            ))}
          </div>
          
          <RecentComplaint />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
