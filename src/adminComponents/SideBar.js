import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsDownload } from "react-icons/bs";
import { CSVLink } from "react-csv";

const SideBar = (props) => {
  const [dashboard, setDashboard] = useState("");
  const [product, setProduct] = useState("");
  const [performance, setPerformance] = useState(" ");
  const [visibleStatus, setVisibleStatus] = useState(false);
  const history = useNavigate();
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
    { label: "OFFICE NO", key: "plumbingNo" },
    { label: "WORK DONE", key: "workDone" },
    { label: "PROBLEM SOLVED", key: "problemSolved" },
    { label: "SYPHONE COLOR", key: "syphoneColor" },
    { label: "CODE", key: "code" },
    { label: "PROBLEM", key: "problem" },
    { label: "SOLUTIONS", key: "solutions" },
    { label: "REPEAT", key: "repeat" },
    { label: "CLOSING DATE", key: "closingDate" },
  ];

  useEffect(() => {
    if (window.location.pathname === "/ideal-admin") {
      setDashboard("bg-white");
      setProduct("text-[#5C697B] hover:bg-white");
      setPerformance(" text-[#5C697B] hover:bg-white");
      setVisibleStatus(false);
      props.setIsDashboard(true);
    } else if (window.location.pathname === "/view-complaints") {
      setDashboard("text-[#5C697B] hover:bg-white");
      setProduct("bg-white");
      setPerformance(" text-[#5C697B] hover:bg-white");
      setVisibleStatus(true);
      props.setIsDashboard(false);
    } else if (
      window.location.pathname === "/users" ||
      window.location.pathname === "/users/addMember"
    ) {
      setDashboard("text-[#5C697B] hover:bg-white");
      setProduct("text-[#5C697B] hover:bg-white");
      setPerformance("bg-white");
      setVisibleStatus(false);
      props.setIsDashboard(false);
    }
  }, [history]);

  return (
    <div>
      {/* Sidebar starts */}
      <div className="absolute  lg:relative w-64 h-screen shadow bg-[#E2E8F0] hidden lg:block ">
        <ul aria-orientation="vertical" className="pt-2 -mt-2">
          <li
            className={`p-4 cursor-pointer  text-base leading-3 tracking-normal  m-3 rounded-xl ${dashboard} transition`}
          >
            <Link to={"/ideal-admin"}>
              <div className="flex items-center  ">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-grid"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <rect x={4} y={4} width={6} height={6} rx={1} />
                    <rect x={14} y={4} width={6} height={6} rx={1} />
                    <rect x={4} y={14} width={6} height={6} rx={1} />
                    <rect x={14} y={14} width={6} height={6} rx={1} />
                  </svg>
                </div>
                <span className="ml-2">Dashboard</span>
              </div>
            </Link>
          </li>
          <li
            className={`p-4 cursor-pointer  text-base leading-3 tracking-normal  m-3 rounded-xl ${product} transition`}
          >
            <Link to={"/view-complaints"}>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-puzzle"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1" />
                </svg>
                <span className="ml-2">View Complaints</span>
              </div>
            </Link>
          </li>
          <li
            className={`p-4 cursor-pointer  text-base leading-3 tracking-normal  m-3 rounded-xl ${performance} transition`}
          >
            <Link to={"/users"} className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-compass"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <polyline points="8 16 10 10 16 8 14 14 8 16" />
                <circle cx={12} cy={12} r={9} />
              </svg>
              <span className="ml-2">Users</span>
            </Link>
          </li>
        </ul>
        {visibleStatus && (
          <div className="relative mt-4 overflow-x-auto w-64  text-white shadow-md sm:rounded-lg">
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
                    {props.pending}
                  </td>
                  <td className="px-6 py-3 text-black dark:text-white text-right">
                    <button>
                      <CSVLink
                        data={props.pendingComplaintsFD}
                        headers={headers}
                      >
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
                    {props.visitOk}
                  </td>
                  <td className="px-6 py-3 text-black dark:text-white text-right">
                    <button>
                      <CSVLink
                        data={props.visitOkComplaintsFD}
                        headers={headers}
                      >
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
                    {props.closed}
                  </td>
                  <td className="px-6 py-3 text-black dark:text-white text-right">
                    <button>
                      <CSVLink
                        data={props.closedComplaintsFD}
                        headers={headers}
                      >
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
                    {props.cancel}
                  </td>
                  <td className="px-6 py-3 text-black dark:text-white text-right">
                    <button>
                      <CSVLink
                        data={props.cancelComplaintsFD}
                        headers={headers}
                      >
                        <BsDownload />
                      </CSVLink>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
