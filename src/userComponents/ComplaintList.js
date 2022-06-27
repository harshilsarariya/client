import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDelete } from "react-icons/md";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { deleteComplaint } from "../api/complaint";
const ComplaintList = (props) => {
  const commonClass =
    "px-6 py-4 font-semibold text-base bg-white text-black  whitespace-nowrap";
  const [complaints, setComplaints] = useState([]);
  const handleSearchResult = async (e) => {
    if (props.isSearch === true) {
      setComplaints(props.searchResult);
    } else {
      setComplaints([]);
    }
  };

  useEffect(() => {
    handleSearchResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.searchResult]);

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
    <div>
      <div className=" w-full ">
        <div className=" sm:rounded-lg mt-5">
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
                  State
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
            {complaints.length === 0 ? (
              <div>
                <h1 className="ml-4 text-2xl">Please Select State</h1>
              </div>
            ) : (
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
                      <td className={`${commonClass}  `}>
                        {complaint.brandName}
                      </td>
                      <td className={`${commonClass}  `}>{complaint.state}</td>
                      {status === "Open" ? (
                        <td className={`${commonClass} text-orange-500`}>
                          {status}
                        </td>
                      ) : status === "Closed" ? (
                        <td className={`${commonClass} text-green-500`}>
                          {status}
                        </td>
                      ) : status === "Visit Ok" ? (
                        <td className={`${commonClass} text-violet-500`}>
                          {status}
                        </td>
                      ) : (
                        <td className={`${commonClass} text-blue-500`}>
                          {status}
                        </td>
                      )}
                      <td className={`${commonClass}`}>{complaint.date}</td>
                      <td className={`${commonClass} flex space-x-4`}>
                        {props.isSearch === true ? (
                          <>
                            <Link
                              to={`/user-admin/view-details-complaint/${complaint._id}`}
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
                            <Link
                              to={`/user-admin/updateComplaint/${complaint._id}`}
                              className="flex items-center cursor-pointer"
                            >
                              <TbEdit className="text-gray-500" size={19} />
                              <spam className="text-gray-500 ml-1 font-semibold">
                                Edit
                              </spam>
                            </Link>
                            <button
                              onClick={() => handleDelete(complaint._id)}
                              className="flex  items-center cursor-pointer"
                            >
                              <MdOutlineDelete
                                className="text-red-500"
                                size={20}
                              />
                              <span className="text-red-500 ml-1 font-semibold">
                                Delete
                              </span>
                            </button>
                          </>
                        ) : (
                          <>
                            <Link
                              to={`/user-admin/view-details-complaint/${complaint.id}`}
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
                            <Link
                              to={`/user-admin/updateComplaint/${complaint.id}`}
                              className="flex items-center cursor-pointer"
                            >
                              <TbEdit className="text-gray-500" size={19} />
                              <spam className="text-gray-500 ml-1 font-semibold">
                                Edit
                              </spam>
                            </Link>
                            <button
                              onClick={() => handleDelete(complaint.id)}
                              className="flex  items-center cursor-pointer"
                            >
                              <MdOutlineDelete
                                className="text-red-500"
                                size={20}
                              />
                              <span className="text-red-500 ml-1 font-semibold">
                                Delete
                              </span>
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                    <div className="mb-5" />
                  </>
                ))}
              </tbody>
            )}
          </table>
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default ComplaintList;
