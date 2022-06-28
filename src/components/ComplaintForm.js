import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
var pincodeDirectory = require("india-pincode-lookup");

const ComplaintForm = () => {
  const [pincode, setPincode] = useState();
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [totalComplaintsCount, setTotalComplaintsCount] = useState(0);
  const [totalComplaints, setTotalComplaints] = useState([]);
  const [todaysTotalComplaintsCount, setTodaysTotalComplaintsCount] =
    useState(0);
  const [todaysTotalComplaints, setTodaysTotalComplaints] = useState([]);
  const [closed, setClosed] = useState(0);
  const [visitOk, setVisitOk] = useState(0);
  const [pending, setPending] = useState(0);
  const [cancel, setCancel] = useState(0);
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
    problemSolved: "No",
    repeat: "No",
    syphoneColor: "",
  });
  const [officeNo, setOfficeNo] = useState(0);
  let navigate = useNavigate();
  const getOfficeNo = async () => {
    let email = localStorage.getItem("email");
    const response = await fetch(
      // `http://localhost:5000/api/auth/getMemberByEmail?email=${email}`,
      `http://localhost:5000/api/auth/getMemberByEmail?email=${email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    let pho = json.data[0].phone;
    setOfficeNo(pho);
  };

  const handleTotalComplaint = async () => {
    const response = await fetch(
      `https://ideal-server.herokuapp.com/api/complaint/fetchComplaintsCount?plumbingNo=${officeNo}`,
      // `http://localhost:5000/api/complaint/fetchComplaintsCount?plumbingNo=${9924733933}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    setTotalComplaintsCount(json.lenTotal);
    setTotalComplaints(json.complaint);
    let ope = 0,
      clo = 0,
      vis = 0,
      can = 0;
    totalComplaints.map((complaint) => {
      if (complaint.workDone === "Yes" && complaint.problemSolved === "Yes") {
        clo++;
        setClosed(clo);
      } else if (
        complaint.workDone === "No" &&
        complaint.problemSolved === "No"
      ) {
        ope++;
        setPending(ope);
      } else if (complaint.workDone === "Visit Ok") {
        vis++;
        setVisitOk(vis);
      } else if (complaint.workDone === "Cancel") {
        can++;
        setCancel(can);
      }
    });
  };

  const handleTodaysTotalComplaint = async () => {
    const response = await fetch(
      `https://ideal-server.herokuapp.com/api/complaint/fetchTodaysComplaintsCount?plumbingNo=${officeNo}`,
      // `http://localhost:5000/api/complaint/fetchTodaysComplaintsCount?plumbingNo=${9924733933}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = await response.json();
    setTodaysTotalComplaintsCount(json.lenTotal);
    setTodaysTotalComplaints(json.complaint);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // API Call
    const response = await fetch(
      "https://ideal-server.herokuapp.com/api/complaint/addcomplaint",
      // "http://localhost:5000/api/complaint/addcomplaint",
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
      handleTotalComplaint();
      handleTodaysTotalComplaint();
      alert("Complaint Submitted successfully");
    } else {
      // props.showAlert(json.errors[0].msg, "red");
      alert(json.errors[0].msg);
    }
  };

  const onChange = (e) => {
    if (e.target.name === "pincode") {
      handlePincode(e);
    }
    setComplaint({ ...complaint, [e.target.name]: e.target.value });
    console.log(complaint);
  };

  const handlePincode = (e) => {
    setPincode(e.target.value);
    if (e.target.value.length === 6) {
      let no = pincodeDirectory.lookup(e.target.value);
      setState(no[0].stateName);
      setDistrict(no[0].districtName);
      complaint.state = no[0].stateName;
      complaint.city = no[0].districtName;
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
    getOfficeNo();
  }, []);

  useEffect(() => {
    handleTotalComplaint();
    handleTodaysTotalComplaint();
  }, [officeNo]);

  useEffect(() => {
    handleTotalComplaint();
    handleTodaysTotalComplaint();
  }, [totalComplaintsCount]);

  let headers = [
    { label: "Opening Date", key: "date" },
    { label: "Party Name", key: "partyName" },
    { label: "Address", key: "address" },
    { label: "Pincode", key: "pincode" },
    { label: "State", key: "state" },
    { label: "City", key: "city" },
    { label: "Mobile No", key: "mobileNo" },
    { label: "Plumbing No", key: "plumbingNo" },
    { label: "Brand Name", key: "brandName" },
    { label: "Work Done", key: "workDone" },
    { label: "Problem Solved", key: "problemSolved" },
    { label: "Repeat", key: "repeat" },
    { label: "Syphone Color", key: "syphoneColor" },
  ];

  return (
    <div>
      <section className="text-gray-600 min-h-screen body-font relative">
        <div className="container flex px-5 py-12 mx-auto">
          <div className="w-9/12">
            <h1 className="sm:text-3xl  mx-auto md:w-2/3 mb-10 text-2xl font-medium title-font  text-gray-900">
              Please complete the form below for Enter complaints.
            </h1>
            <form onSubmit={handleSubmit} className=" mx-auto md:w-2/3  ">
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
                {/* dropdown */}
                <div className="p-2 w-1/2">
                  <div className="relative">
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
                      value={state}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-[#717984] focus:bg-white focus:ring-2 focus:ring-[#717984] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="p-2 w-1/2">
                  <div className="relative">
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
                      value={district}
                      name="city"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-[#717984] focus:bg-white focus:ring-2 focus:ring-[#717984] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
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
                      htmlFor="plumbingNo"
                      className="leading-7 text-base text-gray-600"
                    >
                      Office No
                    </label>

                    <select
                      name="plumbingNo"
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
                      <option className="p-2 text-xl">
                        {" "}
                        Select Office No.
                      </option>
                      <option className="p-2 text-xl">7575024245</option>
                      <option className="p-2 text-xl">9924733933</option>
                      <option className="p-2 text-xl">9913833233</option>
                    </select>
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
                      onChange={onChange}
                      name="syphoneColor"
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-[#717984] focus:bg-white focus:ring-2 focus:ring-[#717984] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>
                <div className="w-full flex flex-row justify-between space-x-5 my-5">
                  <div className="mb-3 w-1/2 right-0">
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
                      <option className="p-2 text-xl">No</option>
                      <option className="p-2 text-xl">Yes</option>
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
          <div className="w-3/12">
            <div>
              <div className="flex text-2xl">
                <h2 className="mr-16 font-bold">Total Complaints</h2>
                <span className=" font-bold">{totalComplaintsCount}</span>
              </div>
              <div className="flex text-2xl">
                <h2 className="mr-9 font-bold"> Today's Complaints</h2>
                <span className=" font-bold">{todaysTotalComplaintsCount}</span>
              </div>
              <div className="my-5 min-w-full ">
                <CSVLink
                  data={todaysTotalComplaints}
                  headers={headers}
                  className="bg-[#86da32b5] text-xs p-1  lg:text-sm lg:p-2 px-5   xl:text-lg  rounded-lg "
                >
                  Download Today's Complaint
                </CSVLink>
              </div>
            </div>
            <table className="table-fixed">
              <tbody>
                <tr className="flex text-2xl font-bold text-blue-600">
                  <td className="mr-20">Open</td>
                  <td>{pending}</td>
                </tr>
                <tr className="flex text-2xl font-bold text-purple-600">
                  <td className="mr-14">Visit Ok</td>
                  <td>{visitOk}</td>
                </tr>
                <tr className="flex text-2xl font-bold text-green-600">
                  <td className="mr-16">Closed</td>
                  <td>{closed}</td>
                </tr>
                <tr className="flex text-2xl font-bold text-red-600">
                  <td className="mr-10">Canceled</td>
                  <td>{cancel}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComplaintForm;
