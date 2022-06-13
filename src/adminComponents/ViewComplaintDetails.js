import React from "react";
import ComplaintsList from "./ComplaintsList";
import Navbar from "./Navbar";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDelete } from "react-icons/md";
import SideBar from "./SideBar";
import { Link } from "react-router-dom";

const ViewComplaintDetails = () => {
  return (
    <div className="w-full nunito-font h-full bg-[#F1F5F9]">
      <div className="">
        <Navbar />
        <div className="flex flex-no-wrap">
          <SideBar />
          <div className="w-screen p-5 mx-10">
            <div className="flex justify-between">
              <h2 className="mb-10 text-xl font-semibold">Complaint Details</h2>
              <div className="mb-10 flex text-lg space-x-6">
                <Link
                  to={"/update-complaint"}
                  className="flex items-center  cursor-pointer"
                >
                  <TbEdit className="text-gray-500" size={19} />
                  <spam className="text-gray-500 ml-1 font-semibold">Edit</spam>
                </Link>
                <a className="flex  items-center cursor-pointer">
                  <MdOutlineDelete className="text-red-500" size={20} />
                  <span className="text-red-500 ml-1 font-semibold">
                    Delete
                  </span>
                </a>
              </div>
            </div>
            <div className="flex my-3 ">
              <h3 className="w-1/6  text-lg bg-white rounded-xl p-2 mr-5">
                Party Name :
              </h3>
              <span className="w-5/6 text-lg rounded-xl p-2 bg-white">
                Harshil Sarariya
              </span>
            </div>
            <div className="flex my-5">
              <h3 className="w-1/6  text-lg bg-white rounded-xl p-2 mr-5">
                {" "}
                Brand Name :
              </h3>
              <span className="w-5/6 text-lg rounded-xl p-2 bg-white">
                Techrazer
              </span>
            </div>
            <div className="flex my-5">
              <h3 className="w-1/6  text-lg bg-white rounded-xl p-2 mr-5">
                {" "}
                State :
              </h3>
              <span className="w-5/6 text-lg rounded-xl p-2 bg-white">
                Gujarat
              </span>
            </div>
            <div className="flex my-5">
              <h3 className="w-1/6  text-lg bg-white rounded-xl p-2 mr-5">
                {" "}
                City :
              </h3>
              <span className="w-5/6 text-lg rounded-xl p-2 bg-white">
                Halvad
              </span>
            </div>
            <div className="flex my-5">
              <h3 className="w-1/6  text-lg bg-white rounded-xl p-2 mr-5">
                {" "}
                Address :
              </h3>
              <span className="w-5/6 text-lg rounded-xl p-2 bg-white">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Doloribus, ipsa!
              </span>
            </div>
            <div className="flex my-5">
              <h3 className="w-1/6  text-lg bg-white rounded-xl p-2 mr-5">
                {" "}
                Pincode :
              </h3>
              <span className="w-5/6 text-lg rounded-xl p-2 bg-white">
                363330
              </span>
            </div>
            <div className="flex my-5">
              <h3 className="w-1/6  text-lg bg-white rounded-xl p-2 mr-5">
                {" "}
                Mobile No. :
              </h3>
              <span className="w-5/6 text-lg rounded-xl p-2 bg-white">
                9510142642
              </span>
            </div>
            <div className="flex my-5">
              <h3 className="w-1/6  text-lg bg-white rounded-xl p-2 mr-5">
                {" "}
                Plumbing No. :
              </h3>
              <span className="w-5/6 text-lg rounded-xl p-2 bg-white">658</span>
            </div>
            <div className="flex my-5">
              <h3 className="w-1/6  text-lg bg-white rounded-xl p-2 mr-5">
                {" "}
                Syphone Color :
              </h3>
              <span className="w-5/6 text-lg rounded-xl p-2 bg-white">Red</span>
            </div>
            <div className="flex my-5">
              <h3 className="w-1/6  text-lg bg-white rounded-xl p-2 mr-5">
                {" "}
                Work Done :
              </h3>
              <span className="w-5/6 text-lg rounded-xl p-2 bg-white">Yes</span>
            </div>
            <div className="flex my-5">
              <h3 className="w-1/6  text-lg bg-white rounded-xl p-2 mr-5">
                {" "}
                Problem Solved :
              </h3>
              <span className="w-5/6 text-lg rounded-xl p-2 bg-white">No</span>
            </div>
            <div className="flex my-5">
              <h3 className="w-1/6  text-lg bg-white rounded-xl p-2 mr-5">
                {" "}
                Repeat :
              </h3>
              <span className="w-5/6 text-lg rounded-xl p-2 bg-white">No</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewComplaintDetails;
