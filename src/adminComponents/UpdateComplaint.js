import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { updateComplaint, getComplaint } from "../api/complaint";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import { useNavigate } from "react-router-dom";
var pincodeDirectory = require("india-pincode-lookup");

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
  code: "",
  remark: "",
  entryRemark: "",
  problem: "",
  solution: "",
  plumberName: "",
  closingDate: "",
};

const UpdateComplaint = () => {
  const { cid } = useParams();
  const [complaintInfo, setComplaintInfo] = useState(defaultPost);
  const [pincode, setPincode] = useState();

  let navigate = useNavigate();

  const fetchComplaint = async () => {
    const { complaint } = await getComplaint(cid);
    setComplaintInfo(complaint);
  };

  useEffect(() => {
    fetchComplaint();
  }, []);

  const handlePincode = (e) => {
    setPincode(e.target.value);
    if (e.target.value.length === 6) {
      let no = pincodeDirectory.lookup(e.target.value);
      complaintInfo.state = no[0].stateName;
      complaintInfo.city = no[0].districtName;
    }
  };
  const onChange = (e) => {
    if (e.target.name === "pincode") {
      handlePincode(e);
    }
    setComplaintInfo({ ...complaintInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await updateComplaint(cid, complaintInfo);
    alert("Complaint Updated Successfully");
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
  }, []);

  return (
    <div className="w-full nunito-font h-full bg-[#F1F5F9]">
      <div>
        <section className="text-gray-600 w-full body-font relative">
          <div className="container px-5 py-4 mx-auto">
            <div className="flex flex-col   mb-12">
              <h1 className="text-xl font-medium">Update Complaint</h1>
            </div>
            <form
              // onSubmit={handleSubmit}
              className="lg:w-2/3 md:w-2/3 mx-auto"
            >
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="partyName"
                      className="leading-7 text-base text-gray-600"
                    >
                      Party Name
                    </label>
                    <input
                      type="text"
                      onChange={onChange}
                      required
                      value={complaintInfo.partyName}
                      id="partyName"
                      name="partyName"
                      className="w-full rounded-xl border border-gray-300 focus:border-[#717984] focus:bg-white focus:ring-1 focus:ring-[#717984] text-lg outline-none text-gray-700  py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
                      placeholder="Ex. Mr Sarariya "
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="brandName"
                      className="leading-7 text-base text-gray-600"
                    >
                      Brand Name
                    </label>
                    <input
                      type="text"
                      onChange={onChange}
                      required
                      value={complaintInfo.brandName}
                      id="brandName"
                      name="brandName"
                      className="w-full rounded-xl border border-gray-300 focus:border-[#717984] focus:bg-white focus:ring-1 focus:ring-[#717984] text-lg outline-none text-gray-700  py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
                      placeholder="Ex. XYZ Company"
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="pincode"
                      className="leading-7 text-base text-gray-600"
                    >
                      Pincode
                    </label>
                    <input
                      type="number"
                      required
                      onChange={onChange}
                      name="pincode"
                      value={complaintInfo.pincode}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-[#717984] focus:bg-white focus:ring-2 focus:ring-[#717984] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="mobileNo"
                      className="leading-7 text-base text-gray-600"
                    >
                      Mobile No
                    </label>
                    <input
                      type="number"
                      required
                      onChange={onChange}
                      name="mobileNo"
                      value={complaintInfo.mobileNo}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-[#717984] focus:bg-white focus:ring-2 focus:ring-[#717984] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                {/* dropdown */}
                <div className="p-2 w-1/2">
                  <label
                    htmlFor="state"
                    className="leading-7 text-base text-gray-600"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    onChange={onChange}
                    required
                    id="state"
                    name="state"
                    value={complaintInfo.state}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-[#717984] focus:bg-white focus:ring-2 focus:ring-[#717984] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="p-2 w-1/2">
                  <label
                    htmlFor="city"
                    className="leading-7 text-base text-gray-600"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    onChange={onChange}
                    required
                    id="city"
                    value={complaintInfo.city}
                    name="city"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-[#717984] focus:bg-white focus:ring-2 focus:ring-[#717984] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>

                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor="address"
                      className="leading-7 text-base text-gray-600"
                    >
                      Address
                    </label>
                    <textarea
                      name="address"
                      onChange={onChange}
                      value={complaintInfo.address}
                      required
                      className="w-full appearance-none rounded-xl border border-gray-300 focus:border-[#717984] focus:bg-white focus:ring-1 focus:ring-[#717984] text-lg  h-32 outline-none text-gray-700  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out resize-none"
                      placeholder="Ex. Plot no. 1, near to the bank"
                    />
                  </div>
                </div>

                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="plumbingNo"
                      className="leading-7 text-base text-gray-600"
                    >
                      Office No
                    </label>
                    <input
                      type="number"
                      required
                      onChange={onChange}
                      value={complaintInfo.plumbingNo}
                      name="plumbingNo"
                      className="w-full rounded-xl border border-gray-300 focus:border-[#717984] focus:bg-white focus:ring-1 focus:ring-[#717984] text-lg outline-none text-gray-700  py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
                      placeholder="Plumbing No."
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="syphoneColor"
                      className="leading-7 text-base text-gray-600"
                    >
                      Syphone Color
                    </label>
                    <input
                      type="text"
                      required
                      value={complaintInfo.syphoneColor}
                      onChange={onChange}
                      name="syphoneColor"
                      className="w-full rounded-xl border border-gray-300 focus:border-[#717984] focus:bg-white focus:ring-1 focus:ring-[#717984] text-lg outline-none text-gray-700  py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
                      placeholder="Syphone Color"
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="code"
                      className="leading-7 text-base text-gray-600"
                    >
                      Code
                    </label>
                    <input
                      type="text"
                      value={complaintInfo.code}
                      onChange={onChange}
                      name="code"
                      className="w-full rounded-xl border border-gray-300 focus:border-[#717984] focus:bg-white focus:ring-1 focus:ring-[#717984] text-lg outline-none text-gray-700  py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
                      placeholder="Enter Code"
                    />
                  </div>
                </div>
                <div className="w-full flex flex-row justify-between my-5">
                  <div className="mb-3 w-1/4 ml-2 ">
                    <label
                      htmlFor="workDone"
                      className="leading-7 text-base text-gray-600"
                    >
                      Work Done
                    </label>
                    <select
                      name="workDone"
                      onChange={onChange}
                      required
                      value={complaintInfo.workDone}
                      className="w-full appearance-none rounded-xl border border-gray-300 focus:border-[#717984] focus:bg-white focus:ring-1 focus:ring-[#717984] text-lg outline-none text-gray-700  py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
                      aria-label=".form-select-lg example"
                    >
                      <option>Yes</option>
                      <option>No</option>
                      <option>Visit Ok</option>
                      <option>Cancel</option>
                    </select>
                  </div>
                  <div className="mb-3 w-1/4 ml-2 right-0">
                    <label
                      htmlFor="problemSolved"
                      className="leading-7 text-base text-gray-600"
                    >
                      Problem Solved
                    </label>
                    <select
                      name="problemSolved"
                      onChange={onChange}
                      required
                      value={complaintInfo.problemSolved}
                      className="w-full appearance-none rounded-xl border border-gray-300 focus:border-[#717984] focus:bg-white focus:ring-1 focus:ring-[#717984] text-lg outline-none text-gray-700  py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
                      aria-label=".form-select-lg example"
                    >
                      <option>No</option>
                      <option>Yes</option>
                    </select>
                  </div>
                  <div className="mb-3 w-1/4 ml-2 right-0">
                    <label
                      htmlFor="repeat"
                      className="leading-7 text-base text-gray-600"
                    >
                      Repeat
                    </label>
                    <select
                      name="repeat"
                      onChange={onChange}
                      required
                      value={complaintInfo.repeat}
                      className="w-full appearance-none rounded-xl border border-gray-300 focus:border-[#717984] focus:bg-white focus:ring-1 focus:ring-[#717984] text-lg outline-none text-gray-700  py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
                      aria-label=".form-select-lg example"
                    >
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor="remark"
                      className="leading-7 text-base text-gray-600"
                    >
                      Entry Remark
                    </label>
                    <textarea
                      name="entryRemark"
                      onChange={onChange}
                      value={complaintInfo.entryRemark}
                      className="w-full appearance-none rounded-xl border border-gray-300 focus:border-[#717984] focus:bg-white focus:ring-1 focus:ring-[#717984] text-lg  h-28 outline-none text-gray-700  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out resize-none"
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor="remark"
                      className="leading-7 text-base text-gray-600"
                    >
                      Forwarding Remark
                    </label>
                    <textarea
                      name="remark"
                      onChange={onChange}
                      value={complaintInfo.remark}
                      className="w-full appearance-none rounded-xl border border-gray-300 focus:border-[#717984] focus:bg-white focus:ring-1 focus:ring-[#717984] text-lg  h-28 outline-none text-gray-700  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out resize-none"
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor="problem"
                      className="leading-7 text-base text-gray-600"
                    >
                      Problem
                    </label>
                    <textarea
                      name="problem"
                      onChange={onChange}
                      value={complaintInfo.problem}
                      className="w-full appearance-none rounded-xl border border-gray-300 focus:border-[#717984] focus:bg-white focus:ring-1 focus:ring-[#717984] text-lg  h-28 outline-none text-gray-700  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out resize-none"
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <div className="relative">
                    <label
                      htmlFor="solution"
                      className="leading-7 text-base text-gray-600"
                    >
                      Solutions
                    </label>
                    <textarea
                      name="solution"
                      onChange={onChange}
                      value={complaintInfo.solution}
                      className="w-full appearance-none rounded-xl border border-gray-300 focus:border-[#717984] focus:bg-white focus:ring-1 focus:ring-[#717984] text-lg  h-28 outline-none text-gray-700  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out resize-none"
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="plumberName"
                      className="leading-7 text-base text-gray-600"
                    >
                      Plumber Name
                    </label>
                    <input
                      type="text"
                      onChange={onChange}
                      value={complaintInfo.plumberName}
                      id="plumberName"
                      name="plumberName"
                      className="w-full rounded-xl border border-gray-300 focus:border-[#717984] focus:bg-white focus:ring-1 focus:ring-[#717984] text-lg outline-none text-gray-700  py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
                      placeholder="Ex. Mr Sarariya "
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="closingDate"
                      className="leading-7 text-base text-gray-600"
                    >
                      Closing Date
                    </label>
                    <input
                      type="name"
                      onChange={onChange}
                      value={complaintInfo.closingDate}
                      id="closingDate"
                      name="closingDate"
                      className="w-full rounded-xl border border-gray-300 focus:border-[#717984] focus:bg-white focus:ring-1 focus:ring-[#717984] text-lg outline-none text-gray-700  py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 mt-5 w-full">
                  <button
                    onClick={handleSubmit}
                    className="flex mx-auto text-white bg-[#717984] border-0 py-2 px-8 focus:outline-none hover:bg-[#5c646f] rounded text-lg"
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UpdateComplaint;
