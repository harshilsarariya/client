import React, { useEffect, useState } from "react";
import { fetchallcomplaints } from "../api/complaint";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { deleteComplaint } from "../api/complaint";
import { HiOutlineViewGridAdd } from "react-icons/hi";

const ComplaintListForUser = (props) => {
  const [complaints, setComplaints] = useState([]);
  const [totalComplaintCount, setTotalComplaintCount] = useState([]);

  const getallcomplaints = async () => {
    const { pageNo, limit } = props;
    const { complaints, complaintCount } = await fetchallcomplaints(
      pageNo,
      limit
    );

    setComplaints(complaints);
    setTotalComplaintCount(complaintCount);
  };

  useEffect(() => {
    if (props.isSearch === true) {
      setComplaints(props.searchResult);
      console.log(complaints);
    }
    // getallcomplaints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.searchResult]);

  useEffect(() => {
    if (props.isSearch === true) {
      setComplaints(props.searchResult);
      console.log(complaints);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [complaints]);

  const commonClass =
    "px-6 py-4 font-semibold text-base bg-white text-black  whitespace-nowrap";

  let status;
  const handleStatus = (complaint) => {
    status =
      complaint.problemSolved === "Yes"
        ? complaint.workDone === "Yes"
          ? "Closed"
          : complaint.workDone === "Visit Ok"
          ? "Visit Ok"
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

  const handleDelete = async (complaintId) => {
    const confirmed = window.confirm("Are you sure!");
    if (!confirmed) return;
    const { error, message } = await deleteComplaint(complaintId);

    if (error) {
      console.log(message);
    }
    const newComplaint = complaints.filter((p) => p._id !== complaintId);
    setComplaints(newComplaint);
  };

  return (
    <div className=" w-full ">
      <div className=" sm:rounded-lg mt-5">
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
                {(handleStatus(complaint), handleDateFormate(complaint.date))}
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
                  <td className={`${commonClass}`}>{complaintDate}</td>
                  <td className={`${commonClass} flex space-x-4`}>
                    {props.isSearch === true ? (
                      <>
                        <Link
                          to={`/view-details-complaint/${complaint._id}`}
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
                      </>
                    ) : (
                      <>
                        <Link
                          to={`/view-details-complaint/${complaint.id}`}
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
                      </>
                    )}
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
