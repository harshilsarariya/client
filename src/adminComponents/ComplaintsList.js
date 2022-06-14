import React, { useEffect, useState } from "react";
import { fetchallcomplaints } from "../api/complaint";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDelete } from "react-icons/md";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { Link } from "react-router-dom";

let pageNo = 0;
let POST_LIMIT = 15;

const getPaginationCount = (length) => {
  const devision = length / POST_LIMIT;
  if (devision % 1 !== 0) {
    return Math.floor(devision) + 1;
  }
  return devision;
};

const ComplaintsList = () => {
  const [complaints, setComplaints] = useState([]);
  const [totalComplaintCount, setTotalComplaintCount] = useState([]);

  const paginatioCount = getPaginationCount(totalComplaintCount);
  const paginationArr = new Array(paginatioCount).fill(" ");

  const getallcomplaints = async () => {
    const { complaints, complaintCount } = await fetchallcomplaints(
      pageNo,
      POST_LIMIT
    );
    setComplaints(complaints);
    setTotalComplaintCount(complaintCount);
  };

  const fetchMoreComplaints = (index) => {
    pageNo = index;
    getallcomplaints();
  };

  useEffect(() => {
    getallcomplaints();
    console.log(complaints);
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let status;
  const handleStatus = (complaint) => {
    status =
      complaint.problemSolved === "Yes"
        ? complaint.workDone === "Yes"
          ? "Closed"
          : "In Progress"
        : "Open";
  };
  let complaintDate;
  const handleDateFormate = (date) => {
    const newDate = new Date(date);
    const dateString = newDate.toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    complaintDate = dateString;
  };

  const commonClass =
    "px-6 py-4 font-semibold text-base bg-white text-black  whitespace-nowrap";

  return (
    <div className=" sm:rounded-lg mt-5 ml-8">
      <table className="w-[1200px] text-sm text-left text-gray-500 ">
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
              {(handleStatus(complaint), handleDateFormate(complaint.date))}

              <tr key={index} className=" border-b  overflow-x-auto shadow-sm">
                <th scope="row" className={`${commonClass}`}>
                  {complaint.partyName}
                </th>
                <td className={`${commonClass}  `}>{complaint.brandName}</td>
                {status === "Open" ? (
                  <td className={`${commonClass} text-orange-500`}>{status}</td>
                ) : status === "Closed" ? (
                  <td className={`${commonClass} text-green-500`}>{status}</td>
                ) : (
                  <td className={`${commonClass} text-blue-500`}>{status}</td>
                )}
                <td className={`${commonClass}`}>{complaintDate}</td>
                <td className={`${commonClass} flex space-x-4`}>
                  <Link
                    to={"/view-details-complaint"}
                    className="flex items-center cursor-pointer"
                  >
                    <HiOutlineViewGridAdd
                      className="text-[#4bacc7]"
                      size={22}
                    />
                    <span className="text-[#4bacc7] ml-1 font-semibold">
                      View
                    </span>
                  </Link>
                  <a className="flex items-center cursor-pointer">
                    <TbEdit className="text-gray-500" size={19} />
                    <span className="text-gray-500 ml-1 font-semibold">
                      Edit
                    </span>
                  </a>
                  <a className="flex  items-center cursor-pointer">
                    <MdOutlineDelete className="text-red-500" size={20} />
                    <span className="text-red-500 ml-1 font-semibold">
                      Delete
                    </span>
                  </a>
                </td>
              </tr>
              <div className="mb-5" />
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComplaintsList;
