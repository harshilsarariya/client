import React, { useEffect, useState } from "react";
import s_a from "../data/City";
import state_arr from "../data/State";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const ComplaintForm = (props) => {
  const [city, setCity] = useState([]);
  const [complaint, setComplaint] = useState({
    partyName: "",
    address: "",
    pincode: "",
    state: "",
    city: "",
    mobileNo: "",
    plumbingNo: "",
    brandName: "",
    workDone: "No",
    problemSolved: "NO",
    repeat: "No",
    syphoneColor: "",
  });

  let navigate = useNavigate();

  const handleCity = (e) => {
    var indexOfState = state_arr.indexOf(e.target.value) + 1;
    var city_arr = s_a[indexOfState].split("|");
    setCity(city_arr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API Call
    const response = await fetch(
      "https://ideal-server.herokuapp.com/api/complaint/addcomplaint",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          partyName: complaint.partyName,
          address: complaint.address,
          pincode: complaint.pincode,
          state: complaint.state,
          city: complaint.city,
          mobileNo: complaint.mobileNo,
          plumbingNo: complaint.plumbingNo,
          brandName: complaint.brandName,
          workDone: complaint.workDone,
          problemSolved: complaint.problemSolved,
          repeat: complaint.repeat,
          syphoneColor: complaint.syphoneColor,
        }),
      }
    );

    const json = await response.json();
    if (json.success) {
      // props.showAlert("Complaint Submitted successfully", "green");
      alert("Complaint Submitted successfully");
      navigate("/");
    } else {
      // props.showAlert(json.errors[0].msg, "red");
      alert(json.errors[0].msg);
    }
  };

  const onChange = (e) => {
    if (e.target.name === "state") {
      handleCity(e);
    }
    setComplaint({ ...complaint, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Please complete the form below for Enter complaints.
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="partyname"
                    className="leading-7 text-base text-gray-600"
                  >
                    Party Name
                  </label>
                  <input
                    type="text"
                    required
                    onChange={onChange}
                    name="partyName"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-[#717984] focus:bg-white focus:ring-2 focus:ring-[#717984] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
                    id="brandName"
                    name="brandName"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-[#717984] focus:bg-white focus:ring-2 focus:ring-[#717984] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              {/* dropdown */}
              <div className="flex space-x-4">
                <div className="mb-3 w-[363px] ml-2 left-0">
                  <label
                    htmlFor="message"
                    className="leading-7 text-base text-gray-600"
                  >
                    Select State
                  </label>
                  <select
                    name="state"
                    defaultValue="Select State"
                    required
                    onChange={onChange}
                    className="form-select form-select-lg mb-3
                    appearance-none
      block
      w-full
      px-4
      py-2
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label=".form-select-lg example"
                  >
                    <option>Select state</option>
                    {state_arr.map((state) => (
                      <option key={state} value={state.index}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3 w-[363px] ml-2 right-0">
                  <label
                    htmlFor="message"
                    className="leading-7 text-base text-gray-600"
                  >
                    Select city
                  </label>
                  <select
                    name="city"
                    onChange={onChange}
                    required
                    defaultValue="Select your city"
                    className="form-select form-select-lg mb-3
      appearance-none
      block
      w-full
      px-4
      py-2
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label=".form-select-lg example"
                  >
                    <option>Select city</option>
                    {city.map((state) => (
                      <option key={state} value={state.index}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
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
                    required
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-[#717984] focus:bg-white focus:ring-2 focus:ring-[#717984] h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
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
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-[#717984] focus:bg-white focus:ring-2 focus:ring-[#717984] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="plumbingNo"
                    className="leading-7 text-base text-gray-600"
                  >
                    Plumbing No
                  </label>
                  <input
                    type="number"
                    required
                    onChange={onChange}
                    name="plumbingNo"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-[#717984] focus:bg-white focus:ring-2 focus:ring-[#717984] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
                    onChange={onChange}
                    name="syphoneColor"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-[#717984] focus:bg-white focus:ring-2 focus:ring-[#717984] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
                    className="form-select form-select-lg mb-3
                  appearance-none
                  block
                  w-full
                  px-4
      py-2
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label=".form-select-lg example"
                  >
                    <option>No</option>
                    <option>Yes</option>
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
                    className="form-select form-select-lg mb-3
      appearance-none
      block
      w-full
      px-4
      py-2
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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
                    className="form-select form-select-lg mb-3
                  appearance-none
      block
      w-full
      px-4
      py-2
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    aria-label=".form-select-lg example"
                  >
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </div>
              </div>
              <div className="p-2 mt-5 w-full">
                <button className="flex mx-auto text-white bg-[#717984] border-0 py-2 px-8 focus:outline-none hover:bg-[#717984] rounded text-lg">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ComplaintForm;
