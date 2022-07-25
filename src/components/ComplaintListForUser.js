import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { BsDownload } from "react-icons/bs";
import { CSVLink } from "react-csv";

const ComplaintListForUser = (props) => {
  const [complaints, setComplaints] = useState([]);
  const [closedComplaints, setClosedComplaints] = useState([]);
  const [visitOkComplaints, setVisitOkComplaints] = useState([]);
  const [pendingComplaints, setPendingComplaints] = useState([]);
  const [cancelComplaints, setCancelComplaints] = useState([]);
  const [repeatComplaints, setRepeatComplaints] = useState([]);
  const [closed, setClosed] = useState(0);
  const [visitOk, setVisitOk] = useState(0);
  const [pending, setPending] = useState(0);
  const [cancel, setCancel] = useState(0);
  const [repeat, setRepeat] = useState(0);

  const handleTotalComplaint = async () => {
    let ope = 0,
      clo = 0,
      vis = 0,
      can = 0,
      rep = 0;
    setPendingComplaints([]);
    setClosedComplaints([]);
    setVisitOkComplaints([]);
    setCancelComplaints([]);
    setRepeatComplaints([]);
    setClosed(0);
    setPending(0);
    setVisitOk(0);
    setCancel(0);
    setRepeat(0);
    complaints.map((complaint) => {
      if (
        (complaint.workDone === "Yes" && complaint.problemSolved === "Yes") ||
        (complaint.workDone === "Yes" && complaint.problemSolved === "No")
      ) {
        clo++;
        setClosed(clo);
        setClosedComplaints((prev) => [...prev, complaint]);
      } else if (
        complaint.repeat === "Yes" &&
        complaint.workDone === "No" &&
        complaint.problemSolved === "No"
      ) {
        rep++;
        setRepeat(rep);
        setRepeatComplaints((prev) => [...prev, complaint]);
      } else if (
        (complaint.workDone === "No" && complaint.problemSolved === "No") ||
        complaint.workDone === "No"
      ) {
        ope++;
        setPending(ope);
        setPendingComplaints((prev) => [...prev, complaint]);
      } else if (complaint.workDone === "Visit Ok") {
        vis++;
        setVisitOk(vis);
        setVisitOkComplaints((prev) => [...prev, complaint]);
      } else if (complaint.workDone === "Cancel") {
        can++;
        setCancel(can);
        setVisitOkComplaints((prev) => [...prev, complaint]);
      }
    });
  };

  useEffect(() => {
    if (props.isSearch === true) {
      setComplaints(props.searchResult);
    }
    handleTotalComplaint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.searchResult]);

  useEffect(() => {
    if (props.isSearch === true) {
      setComplaints(props.searchResult);
    }
    handleTotalComplaint();
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
    if (wd === "Cancel") {
      status = "Cancel";
    }
  };

  let headers = [
    { label: "DATE", key: "date" },
    { label: "PARTY NAME", key: "partyName" },
    { label: "ADDRESS", key: "address" },
    { label: "PINCODE", key: "pincode" },
    { label: "STATE", key: "state" },
    { label: "CITY", key: "city" },
    { label: "MOBILE NO", key: "mobileNo" },
    { label: "BRAND NAME", key: "brandName" },
    { label: "PLUMBER NAME", key: "plumberName" },
    { label: "REMARK", key: "remark" },
    // { label: "WORK DONE", key: "workDone" },
    // { label: "PROBLEM SOLVED", key: "problemSolved" },
    // { label: "REPEAT", key: "repeat" },
    // { label: "SYPHONE COLOR", key: "syphoneColor" },
    // { label: "CODE", key: "code" },
    // { label: "PROBLEM", key: "problem" },
    // { label: "SOLUTIONS", key: "solutions" },
    // { label: "CLOSING DATE", key: "closingDate" },
  ];

  return (
    <div className=" w-full p-5">
      <div className=" sm:rounded-lg flex">
        <div className="relative mt-4 overflow-x-auto w-64 h-[330px]  text-white shadow-md sm:rounded-lg mr-5">
          <table className=" table-fixed w-full">
            <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Count
                </th>
                <th scope="col" className="px-6 py-3">
                  Export
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  Open
                </th>
                <td className="px-6 py-3 text-black dark:text-white text-right">
                  {pending}
                </td>
                <td className="px-6 py-3 text-black dark:text-white text-right">
                  <button>
                    <CSVLink data={pendingComplaints} headers={headers}>
                      <BsDownload />
                    </CSVLink>
                  </button>
                </td>
              </tr>
              <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  Visit Ok
                </th>
                <td className="px-6 py-3 text-black dark:text-white text-right ">
                  {visitOk}
                </td>
                <td className="px-6 py-3 text-black dark:text-white text-right">
                  <button>
                    <CSVLink data={visitOkComplaints} headers={headers}>
                      <BsDownload />
                    </CSVLink>
                  </button>
                </td>
              </tr>
              <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  Closed
                </th>
                <td className="px-6 py-3 text-black dark:text-white text-right">
                  {closed}
                </td>
                <td className="px-6 py-3 text-black dark:text-white text-right">
                  <button>
                    <CSVLink data={closedComplaints} headers={headers}>
                      <BsDownload />
                    </CSVLink>
                  </button>
                </td>
              </tr>
              <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  Repeat
                </th>
                <td className="px-6 py-3 text-black dark:text-white text-right">
                  {repeat}
                </td>
                <td className="px-6 py-3 text-black dark:text-white text-right">
                  <button>
                    <CSVLink data={repeatComplaints} headers={headers}>
                      <BsDownload />
                    </CSVLink>
                  </button>
                </td>
              </tr>
              <tr className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  Canceled
                </th>
                <td className="px-6 py-3 text-black dark:text-white text-right">
                  {cancel}
                </td>
                <td className="px-6 py-3 text-black dark:text-white text-right">
                  <button>
                    <CSVLink data={cancelComplaints} headers={headers}>
                      <BsDownload />
                    </CSVLink>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-3/4">
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
    </div>
  );
};

export default ComplaintListForUser;
