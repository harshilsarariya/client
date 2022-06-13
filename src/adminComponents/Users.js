import React from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import { AiOutlinePlus } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDelete } from "react-icons/md";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { Link } from "react-router-dom";

const comlaintData = [
  {
    name: "Harshil Sarariya",
    email: "harshilprajapati@gmail.com",
    doj: "23/09/2200",
  },
  {
    name: "Harshil Sarariya",
    email: "harshilprajapati@gmail.com",
    doj: "23/09/2200",
  },
  {
    name: "Harshil Sarariya",
    email: "harshilprajapati@gmail.com",
    doj: "23/09/2200",
  },
];

const Users = () => {
  const commonClass =
    "px-6 py-4 font-semibold text-lg bg-white text-black  whitespace-nowrap";

  return (
    <div className="w-full nunito-font h-full bg-[#F1F5F9]">
      <div className="">
        <Navbar />
        <div className="flex flex-no-wrap">
          <SideBar />
          <section className="px-5 w-screen pt-2">
            <div className="flex justify-between ">
              <h2 className="text-xl ">Users Details</h2>
              <button className="flex bg-[#164D62] p-2 rounded-xl text-white">
                <AiOutlinePlus className="text-2xl" />
                <span>Add New Member</span>
              </button>
            </div>
            <div className=" sm:rounded-lg mt-5">
              <table className="w-[1200px] text-sm text-left text-gray-500 ">
                <thead className="text-sm text-black uppercase bg-[#F1F5F9] ">
                  <tr className="">
                    <th scope="col" className="px-6 py-4">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date Of Joining
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
                          {complaint.name}
                        </th>
                        <td className={`${commonClass} `}>{complaint.email}</td>
                        <td className={`${commonClass}`}>{complaint.doj}</td>
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
                            <MdOutlineDelete
                              className="text-red-500"
                              size={20}
                            />
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
          </section>
        </div>
      </div>
    </div>
  );
};

export default Users;
