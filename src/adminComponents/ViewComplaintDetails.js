import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDelete } from "react-icons/md";
import SideBar from "./SideBar";
import { Link } from "react-router-dom";
import { getComplaint } from "../api/complaint";
import { useNavigate, useParams } from "react-router-dom";

export const defaultPost = {
  partyName: "",
  address: "",
  pincode: "",
  state: "",
  city: "",
  mobileNo: "",
  plumbingNo: "",
  brandName: "",
  workDone: "",
  problemSolved: "",
  repeat: "",
  syphoneColor: "",
};

const ViewComplaintDetails = () => {
  const { cid } = useParams();
  let navigate = useNavigate();

  const [complaintInfo, setComplaintInfo] = useState(defaultPost);

  const fetchComplaint = async () => {
    const { complaint } = await getComplaint(cid);
    setComplaintInfo(complaint);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
    fetchComplaint();
  }, []);

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
                  to={`/update-complaint/${complaintInfo.id}`}
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
                {complaintInfo.partyName}
              </span>
            </div>
            <div className="flex my-5">
              <h3 className="w-1/6  text-lg bg-white rounded-xl p-2 mr-5">
                Brand Name :
              </h3>
              <span className="w-5/6 text-lg rounded-xl p-2 bg-white">
                {complaintInfo.brandName}
              </span>
            </div>
            <div className="flex my-5">
              <h3 className="w-1/6  text-lg bg-white rounded-xl p-2 mr-5">
                State :
              </h3>
              <span className="w-5/6 text-lg rounded-xl p-2 bg-white">
                {complaintInfo.state}
              </span>
            </div>
            <div className="flex my-5">
              <h3 className="w-1/6  text-lg bg-white rounded-xl p-2 mr-5">
                City :
              </h3>
              <span className="w-5/6 text-lg rounded-xl p-2 bg-white">
                {complaintInfo.city}
              </span>
            </div>
            <div className="flex my-5">
              <h3 className="w-1/6  text-lg bg-white rounded-xl p-2 mr-5">
                Address :
              </h3>
              <span className="w-5/6 text-lg rounded-xl p-2 bg-white">
                {complaintInfo.address}
              </span>
            </div>
            <div className="flex my-5">
              <h3 className="w-1/6  text-lg bg-white rounded-xl p-2 mr-5">
                Pincode :
              </h3>
              <span className="w-5/6 text-lg rounded-xl p-2 bg-white">
                {complaintInfo.pincode}
              </span>
            </div>
            <div className="flex my-5">
              <h3 className="w-1/6  text-lg bg-white rounded-xl p-2 mr-5">
                Mobile No. :
              </h3>
              <span className="w-5/6 text-lg rounded-xl p-2 bg-white">
                {complaintInfo.mobileNo}
              </span>
            </div>
            <div className="flex my-5">
              <h3 className="w-1/6  text-lg bg-white rounded-xl p-2 mr-5">
                Office No. :
              </h3>
              <span className="w-5/6 text-lg rounded-xl p-2 bg-white">
                {complaintInfo.plumbingNo}
              </span>
            </div>
            <div className="flex my-5">
              <h3 className="w-1/6  text-lg bg-white rounded-xl p-2 mr-5">
                Syphone Color :
              </h3>
              <span className="w-5/6 text-lg rounded-xl p-2 bg-white">
                {complaintInfo.syphoneColor}
              </span>
            </div>
            <div className="flex my-5">
              <h3 className="w-1/6  text-lg bg-white rounded-xl p-2 mr-5">
                Work Done :
              </h3>
              <span className="w-5/6 text-lg rounded-xl p-2 bg-white">
                {complaintInfo.workDone}
              </span>
            </div>
            <div className="flex my-5">
              <h3 className="w-1/6  text-lg bg-white rounded-xl p-2 mr-5">
                Problem Solved :
              </h3>
              <span className="w-5/6 text-lg rounded-xl p-2 bg-white">
                {complaintInfo.problemSolved}
              </span>
            </div>
            <div className="flex my-5">
              <h3 className="w-1/6  text-lg bg-white rounded-xl p-2 mr-5">
                Repeat :
              </h3>
              <span className="w-5/6 text-lg rounded-xl p-2 bg-white">
                {complaintInfo.repeat}
              </span>
            </div>
            <div className="flex my-5">
              <h3 className="w-1/6  text-lg bg-white rounded-xl p-2 mr-5">
                Plumber Name :
              </h3>
              <span className="w-5/6 text-lg rounded-xl p-2 bg-white">
                {complaintInfo.plumberName}
              </span>
            </div>
            <div className="flex my-5">
              <h3 className="w-1/6  text-lg bg-white rounded-xl p-2 mr-5">
                Closing Date :
              </h3>
              <span className="w-5/6 text-lg rounded-xl p-2 bg-white">
                {complaintInfo.closingDate}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewComplaintDetails;
