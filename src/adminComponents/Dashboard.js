import React from "react";
import ComplaintsCounter from "./ComplaintsCounter";
import ComplaintList from "./ComplaintList";

const Dashboard = () => {
  const labels = [
    { lab: "Open", color: "orange", count: "---" },
    { lab: "Closed", color: "blue", count: "---" },
    { lab: "Repeat", color: "green", count: "---" },
  ];
  let pageNo = 0;
  let POST_LIMIT = 5;

  return (
    <div className="w-full  ">
      <div className="   container mx-auto py-6 h-full md:w-full w-11/12 px-6">
        <div className="w-full h-full rounded">
          <h1 className="text-xl w-44 font-medium border-b-2 border-gray-300">
            General Report
          </h1>
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
          <h1 className="text-xl w-44 font-medium mt-8  border-b-2 border-gray-300">
            Recent Complaint
          </h1>
          <ComplaintList pageNo={pageNo} limit={POST_LIMIT} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
