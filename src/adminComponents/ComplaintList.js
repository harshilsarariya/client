import React, { useEffect, useState } from "react";
import { fetchallcomplaints } from "../api/complaint";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { deleteComplaint } from "../api/complaint";
import { GrRefresh } from "react-icons/gr";
import { HiOutlineViewGridAdd } from "react-icons/hi";

const ComplaintList = (props) => {
  const [complaints, setComplaints] = useState([]);
  const [totalComplaintCount, setTotalComplaintCount] = useState([]);
  const [allComplaint, setAllComplaints] = useState([]);

  const getallcomplaints = async () => {
    const { pageNo, limit } = props;
    const { complaints, complaintCount } = await fetchallcomplaints(
      pageNo,
      limit
    );

    setComplaints(complaints);
    setTotalComplaintCount(complaintCount);
  };

  const getAllComplaintStatus = async () => {
    const data = await fetchallcomplaints();
    setAllComplaints(data.complaints);

    let ope = 0,
      clo = 0,
      rep = 0,
      vis = 0,
      can = 0;

    allComplaint.map((complaint) => {
      if (
        (complaint.workDone === "Yes" && complaint.problemSolved === "Yes") ||
        complaint.workDone === "Yes"
      ) {
        clo++;
        props.setClosedCount(clo);
      } else if (
        complaint.workDone === "No" &&
        complaint.problemSolved === "No"
      ) {
        ope++;
        props.setOpenCount(ope);
      } else if (complaint.workDone === "Visit Ok") {
        vis++;
        props.setVisitOkCount(vis);
      } else if (complaint.workDone === "Cancel") {
        can++;
        props.setCanceledCount(can);
      }
      if (complaint.repeat === "Yes") {
        rep++;
        props.setRepeatCount(rep);
      }
    });
  };

  const getComplaintStatus = async () => {
    if (props.isDashboard === true) {
      getAllComplaintStatus();
    } else if (props.isDashboard === false) {
      let opeX = 0,
        cloX = 0,
        visX = 0,
        canX = 0,
        repX = 0;
      props.setPendingComplaintsFD([]);
      props.setClosedComplaintsFD([]);
      props.setVisitOkComplaintsFD([]);
      props.setCancelComplaintsFD([]);
      props.setRepeatComplaintsFD([]);
      props.setVisitOk(0);
      props.setCancel(0);
      props.setClosed(0);
      props.setRepeat(0);
      props.setPending(0);
      complaints.map((complaint) => {
        if (
          (complaint.workDone === "Yes" && complaint.problemSolved === "Yes") ||
          complaint.workDone === "Yes"
        ) {
          cloX++;
          props.setClosed(cloX);
          props.setClosedComplaintsFD((prev) => [...prev, complaint]);
        } else if (
          complaint.workDone === "No" &&
          complaint.problemSolved === "No"
        ) {
          opeX++;
          props.setPending(opeX);
          props.setPendingComplaintsFD((prev) => [...prev, complaint]);
        } else if (complaint.workDone === "Visit Ok") {
          visX++;
          props.setVisitOk(visX);
          props.setVisitOkComplaintsFD((prev) => [...prev, complaint]);
        } else if (complaint.workDone === "Cancel") {
          canX++;
          props.setCancel(canX);
          props.setVisitOkComplaintsFD((prev) => [...prev, complaint]);
        }
        if (complaint.repeat === "Yes") {
          repX++;
          props.setRepeat(repX);
          props.setRepeatComplaintsFD((prev) => [...prev, complaint]);
        }
      });
    }
  };

  useEffect(() => {
    if (props.isSearch === true) {
      setComplaints(props.searchResult);
    }
    getallcomplaints();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.searchResult]);

  useEffect(() => {
    if (props.isSearch === true) {
      setComplaints(props.searchResult);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [complaints]);

  useEffect(() => {
    getComplaintStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const commonClass =
    "px-3 py-4 font-semibold text-sm bg-white text-black  whitespace-nowrap";

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
    if (wd === "Cancel") {
      status = "Cancel";
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
    <>
      <div className="flex">
        <div className=" w-full ">
          <div className=" sm:rounded-lg mt-5">
            <table className="w-full text-sm mr-5 text-left text-gray-500 ">
              <thead className="text-sm text-black uppercase bg-[#F1F5F9] ">
                <tr className="">
                  <th scope="col" className="px-3 py-4">
                    Party Name
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Brand Name
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Phone No
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-3 pl-16 py-3">
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
                      <td className={`${commonClass}  `}>
                        {complaint.brandName}
                      </td>

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
                      ) : status === "Cancel" ? (
                        <td className={`${commonClass} text-red-500`}>
                          {status}
                        </td>
                      ) : (
                        <td className={`${commonClass} text-blue-500`}>
                          {status}
                        </td>
                      )}
                      <td className={`${commonClass}`}>{complaint.mobileNo}</td>
                      <td className={`${commonClass}`}>{complaint.date}</td>
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
                            <Link
                              to={`/update-complaint/${complaint._id}`}
                              className="flex items-center cursor-pointer"
                            >
                              <TbEdit className="text-gray-500" size={19} />
                              <spna className="text-gray-500 ml-1 font-semibold">
                                Edit
                              </spna>
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
                            <Link
                              to={`/update-complaint/${complaint.id}`}
                              className="flex items-center cursor-pointer"
                            >
                              <TbEdit className="text-gray-500" size={19} />
                              <span className="text-gray-500 ml-1 font-semibold">
                                Edit
                              </span>
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
            </table>
          </div>
        </div>
        <button
          onClick={getComplaintStatus}
          className="bg-gray-400 p-2 h-10 transform rounded-3xl mb-5 "
        >
          <GrRefresh size={24} />
        </button>
      </div>
    </>
  );
};

export default ComplaintList;
