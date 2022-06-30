import Navbar from "./Navbar";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "./SideBar";
import { getMember, updateMember } from "../api/complaint";

const UpdateMember = () => {
  const { mid } = useParams();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    phoneNo: 0,
    isForwardingMember: "",
    states: [],
    password: "",
  });
  const [isForwardingMember, setIsForwardingMember] = useState("");
  const [states, setStates] = useState([]);

  let navigate = useNavigate();

  const fetchMember = async () => {
    const { data } = await getMember(mid);
    setCredentials(data);
  };

  const onChange = (e) => {
    if (e.target.name === "isForwardingMember" && e.target.value === "Yes") {
      setIsForwardingMember("Yes");
    } else if (
      e.target.name === "isForwardingMember" &&
      e.target.value === "No"
    ) {
      setIsForwardingMember("No");
      credentials.states = [];
    }
    if (e.target.name === "states") {
      let st = e.target.value;
      const myArray = st.split(",");
      setStates(myArray);
    }
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
    fetchMember();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `https://ideal-server.herokuapp.com/api/auth/updateMember/${mid}`,
      // `http://localhost:5000/api/auth/updateMember/${mid}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          isForwardingMember: isForwardingMember,
          states: states,
          phone: credentials.phone,
          password: credentials.password,
        }),
      }
    );
    const json = await response.json();
    alert("User Updated Successfully");
  };

  const commonClass =
    "w-full rounded-xl border border-gray-300 focus:border-[#717984] focus:bg-white focus:ring-1 focus:ring-[#717984] text-lg outline-none text-gray-700  py-2 px-4 leading-8 transition-colors duration-200 ease-in-out";
  return (
    <div className="w-full nunito-font  h-full bg-[#F1F5F9]">
      <div className="">
        <Navbar />
        <div className="flex flex-no-wrap">
          <SideBar />
          <div className="w-screen">
            <section className="text-gray-600  body-font relative">
              <div className="container px-5 py-4 mx-auto">
                <div className="flex flex-col   mb-12">
                  <h1 className="text-xl font-medium">Update Member</h1>
                </div>
              </div>
              <form className="lg:w-2/3 md:w-2/3 mx-auto">
                <div>
                  <div className="p-2 ">
                    <div className="relative">
                      <label
                        htmlFor="name"
                        className="leading-7 text-base text-gray-600"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        onChange={onChange}
                        required
                        id="name"
                        name="name"
                        value={credentials.name}
                        className={`${commonClass}`}
                        placeholder="Ex. Mr Sarariya "
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="p-2 ">
                    <div className="relative">
                      <label
                        htmlFor="email"
                        className="leading-7 text-base text-gray-600"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        onChange={onChange}
                        required
                        id="email"
                        value={credentials.email}
                        name="email"
                        className={`${commonClass}`}
                        placeholder="Ex.  abc@xyz.com "
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="p-2 ">
                    <div className="relative">
                      <label
                        htmlFor="phone"
                        className="leading-7 text-base text-gray-600"
                      >
                        Phone No.
                      </label>
                      <input
                        type="number"
                        onChange={onChange}
                        required
                        id="phone"
                        value={credentials.phone}
                        name="phone"
                        className={`${commonClass}`}
                        placeholder="Ex.  654971497 "
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-3 w-1/4 ml-2 right-0">
                  <label
                    htmlFor="forwardingMember"
                    className="leading-7 text-base text-gray-600"
                  >
                    Forwarding Member
                  </label>
                  <select
                    name="isForwardingMember"
                    onChange={onChange}
                    required
                    value={credentials.isForwardingMember}
                    className="w-full appearance-none rounded-xl border border-gray-300 focus:border-[#717984] focus:bg-white focus:ring-1 focus:ring-[#717984] text-lg outline-none text-gray-700  py-2 px-4 leading-8 transition-colors duration-200 ease-in-out"
                    aria-label=".form-select-lg example"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>

                {isForwardingMember === "Yes" ||
                credentials.isForwardingMember === "Yes" ? (
                  <div className="p-2 w-full">
                    <div className="relative">
                      <label
                        htmlFor="states"
                        className="leading-7 text-base text-gray-600"
                      >
                        Enter States
                      </label>
                      <textarea
                        name="states"
                        onChange={onChange}
                        id="states"
                        value={credentials.states}
                        required
                        className="w-full appearance-none rounded-xl border border-gray-300 focus:border-[#717984] focus:bg-white focus:ring-1 focus:ring-[#717984] text-lg  h-15 outline-none text-gray-700  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out resize-none"
                        placeholder="Ex. Gujarat,Maharashtra,Delhi"
                      />
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <div>
                  <div className="p-2 ">
                    <div className="relative">
                      <label
                        htmlFor="password"
                        className="leading-7 text-base text-gray-600"
                      >
                        Change Password
                      </label>
                      <input
                        type="password"
                        onChange={onChange}
                        required
                        id="password"
                        name="password"
                        className={`${commonClass}`}
                        placeholder="Ex.  asd97!#@sd56 "
                      />
                    </div>
                  </div>
                  <div className="p-2 mt-5  w-full">
                    <button
                      onClick={handleSubmit}
                      className="flex  text-white bg-[#717984] border-0 py-2 px-8 focus:outline-none hover:bg-[#5c646f] rounded text-lg"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateMember;
