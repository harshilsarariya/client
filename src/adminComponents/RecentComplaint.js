import React from "react";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDelete } from "react-icons/md";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { Link } from "react-router-dom";

const comlaintData = [
  {
    partyName: "Apple MacBook Pro 17",
    brandName: "Techrazer",
    status: "Open",
    date: "23/09/2200",
  },
  {
    partyName: "Samsung Q90 QLED TV",
    brandName: "Samsung",
    status: "In Progress",
    date: "13/01/6260",
  },
  {
    partyName: "Sony A7 III",
    brandName: "Techrazer",
    status: "Closed",
    date: "17/07/2406",
  },
  {
    partyName: "Samsung Q90 QLED TV",
    brandName: "Samsung",
    status: "In Progress",
    date: "13/01/6260",
  },
];

const RecentComplaint = () => {
  const commonClass =
    "px-6 py-4 font-semibold text-base bg-white text-black  whitespace-nowrap";

  const paginationClass =
    "inline-flex items-center py-2 px-4 text-sm font-semibold text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-gray-200  hover:text-gray-900";

  return (
    <div className=" w-full">
      {/* <h1 className="text-xl font-medium mt-5">Recent Complain</h1> */}
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
            {comlaintData.map((complaint, index) => (
              <>
                <tr
                  key={index}
                  className=" border-b  overflow-x-auto shadow-sm"
                >
                  <th scope="row" className={`${commonClass}`}>
                    {complaint.partyName}
                  </th>
                  <td className={`${commonClass}  `}>{complaint.brandName}</td>
                  {complaint.status === "Open" ? (
                    <td className={`${commonClass} text-orange-500`}>
                      {complaint.status}
                    </td>
                  ) : complaint.status === "Closed" ? (
                    <td className={`${commonClass} text-green-500`}>
                      {complaint.status}
                    </td>
                  ) : (
                    <td className={`${commonClass} text-blue-500`}>
                      {complaint.status}
                    </td>
                  )}
                  <td className={`${commonClass}`}>{complaint.date}</td>
                  <td className={`${commonClass} flex space-x-4`}>
                    <Link
                      to={"/update-complaint"}
                      className="flex items-center cursor-pointer"
                    >
                      <TbEdit className="text-gray-500" size={19} />
                      <spam className="text-gray-500 ml-1 font-semibold">
                        Edit
                      </spam>
                    </Link>
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
      {/* pagination */}
      <div className="flex space-x-5  flex-1">
        <a href="#" className={`${paginationClass} `}>
          <GrFormPreviousLink className="mr-2" size={20} />
          Previous
        </a>
        <a href="#" className={`${paginationClass}`}>
          Next
          <GrFormNextLink className="ml-2" size={20} />
        </a>
      </div>
    </div>
  );
};

export default RecentComplaint;
