import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineViewGridAdd } from "react-icons/hi";

const ComplaintListForUser = (props) => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    if (props.isSearch === true) {
      setComplaints(props.searchResult);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.searchResult]);

  useEffect(() => {
    if (props.isSearch === true) {
      setComplaints(props.searchResult);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [complaints]);

  const commonClass =
    "px-6 py-4 font-semibold text-base bg-white text-black  whitespace-nowrap";

  let status;
  const handleStatus = (complaint) => {
    let ps = complaint.problemSolved;
    let wd = complaint.workDone;

    if ((ps === "Yes" && wd === "Yes") || (ps === "No" && wd === "Yes")) {
      status = "Closed";
    }
    if (ps === "Yes" && wd === "No") {
      status = "In Progress";
    }
    if (ps === "No" && wd === "No") {
      status = "Open";
    }
    if (wd === "Visit Ok") {
      status = "Visit Ok";
    }
  };

  return (
    <div className=" w-full p-5">
      <div className=" sm:rounded-lg ">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-sm text-black uppercase bg-[#F1F5F9] ">
            <tr className="">
              <th scope="col" className="px-6 py-4">
                Party Name
              </th>
              <th scope="col" className="px-6 py-3">
                Brand Name
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Mobile No.
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 pl-16 py-3">
                Action
              </th>
            </tr>
            <div className="mb-5" />
          </thead>

          <tbody>
            {complaints.map((complaint, index) => (
              <>
                {handleStatus(complaint)}
                <tr
                  key={index}
                  className=" border-b  overflow-x-auto shadow-sm"
                >
                  <th scope="row" className={`${commonClass}`}>
                    {complaint.partyName}
                  </th>
                  <td className={`${commonClass}  `}>{complaint.brandName}</td>

                  {status === "Open" ? (
                    <td className={`${commonClass} text-orange-500`}>
                      {status}
                    </td>
                  ) : status === "Closed" ? (
                    <td className={`${commonClass} text-green-500`}>
                      {status}
                    </td>
                  ) : (
                    <td className={`${commonClass} text-blue-500`}>{status}</td>
                  )}
                  <td className={`${commonClass}  `}>{complaint.mobileNo}</td>
                  <td className={`${commonClass}`}>{complaint.date}</td>
                  <td className={`${commonClass} flex space-x-4`}>
                    <Link
                      to={`/viewComplaintByUser/${complaint._id}`}
                      className="flex items-center cursor-pointer"
                      onClick={() => props.isViewClicked(true)}
                    >
                      <HiOutlineViewGridAdd
                        className="text-[#4bacc7]"
                        size={22}
                      />
                      <span className="text-[#4bacc7] ml-1 font-semibold">
                        View
                      </span>
                    </Link>
                  </td>
                </tr>
                <div className="mb-5" />
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplaintListForUser;
