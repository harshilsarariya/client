import React from "react";
import ViewByStates from "./ViewByStates";

const Dashboard = () => {
  // const labels = [
  //   { lab: "Open", color: "orange", count: "---" },
  //   { lab: "In Progress", color: "blue", count: "---" },
  //   { lab: "Closed", color: "green", count: "---" },
  // ];
  let pageNo = 0;
  let POST_LIMIT = 7;

  return (
    <div className="w-full  ">
      <div className="   container mx-auto py-6 h-full md:w-full w-11/12 px-6">
        <div className="w-full h-full rounded">
          <h1 className="text-xl w-44 font-medium  border-b-2 border-gray-300">
            Assigned States
          </h1>
          <ViewByStates />
          {/* <ComplaintList pageNo={pageNo} limit={POST_LIMIT} /> */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
