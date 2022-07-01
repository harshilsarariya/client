import React from "react";

const ComplaintsCounter = ({ label, color, count }) => {
  return (
    <div className="col-span-12 sm:col-span-12  xl:col-span-2 intro-y ">
      <div className="report-box zoom-in">
        <div
          className={`box p-5 bg-white rounded-lg border-l-4  border-${color}-500`}
        >
          <div className="flex">
            <h2 className={`text-2xl text-${color}-700`}>{label}</h2>
          </div>
          <div className="text-3xl font-medium leading-8 mt-6">{count}</div>
          <div className="text-base text-slate-500 mt-1">Complaints</div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintsCounter;
