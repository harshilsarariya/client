import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMemberByEmail } from "../api/complaint";
import Telegram from "telegram-send-message";

const SignIn = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [otp, setOtp] = useState();
  const [verifyOtp, setVerifyOtp] = useState();
  let navigate = useNavigate();

  let memberId;
  let isForwardingMember;
  const saveId = async () => {
    const { data } = await getMemberByEmail(credentials.email);
    memberId = data[0]._id;
    localStorage.setItem("memberId", memberId);
    isForwardingMember = data[0].isForwardingMember;
  };

  let otpMessage;
  const handlePhoneAuthentication = async (e) => {
    otpMessage = Math.floor(100000 + Math.random() * 900000);
    localStorage.setItem("otpIdeal", otpMessage);
    setOtp(otpMessage);
    Telegram.setToken("5341116480:AAFObiUJKoNQv8lM-ItVw49PrPqcACk1pSk");
    Telegram.setRecipient("1361271607");
    Telegram.setMessage(otpMessage);
    Telegram.send();
  };

  const handleOtp = (e) => {
    setVerifyOtp(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://ideal-server.herokuapp.com/api/auth/signin",
      // "http://localhost:5000/api/auth/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );
    const json = await response.json();
    setOtp(localStorage.getItem("otpIdeal"));
    if (otp === verifyOtp) {
      if (json.success) {
        // Save the auth token and redirect
        localStorage.setItem("token", json.authToken);
        localStorage.setItem("email", credentials.email);

        // props.showAlert("Logged in successfully", "green")
        if (credentials.email === "admin@ideal.com") {
          navigate("/ideal-admin");
        } else if (isForwardingMember === "Yes") {
          navigate("/user-admin");
        } else if (isForwardingMember === "No") {
          navigate("/");
        }
      } else {
        // props.showAlert(json.errors, "red");
        alert(json.errors);
      }
    }
    saveId();
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form className=" md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col h-[92vh] m-auto w-full mt-8 md:mt-8">
        <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
          Log In
        </h2>

        <div className="relative mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            onChange={onChange}
            name="email"
            className="w-full bg-white rounded border border-gray-300 focus:border-[#717984] focus:ring-2 focus:ring-[#717984] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="relative mb-4">
          <label htmlFor="password" className="leading-7 text-sm text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            onChange={onChange}
            name="password"
            className="w-full bg-white rounded border border-gray-300 focus:border-[#717984] focus:ring-2 focus:ring-[#717984] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="flex  items-center">
          <div className="w-2/5">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
              Enter Phone No.
            </label>
            <select
              id="phone"
              // onChange={onPhoneChange}
              name="phone"
              className="w-full bg-white rounded border appearance-none mb-8 border-gray-300 focus:border-[#717984] focus:ring-2 focus:ring-[#717984] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            >
              <option>Select No.</option>
              <option value="+919510142642">9510142642</option>
              <option value="+919510142643">9510142643</option>
            </select>
          </div>
          <div className="w-1/5">
            <span
              onClick={handlePhoneAuthentication}
              className="bg-green-400 p-2 rounded ml-5 cursor-pointer"
            >
              Send OTP
            </span>
          </div>
          <div className="w-2/5">
            <label htmlFor="otp" className="leading-7 text-sm text-gray-600">
              Enter OTP
            </label>
            <input
              id="otp"
              name="otp"
              onChange={handleOtp}
              className="w-full bg-white rounded border appearance-none mb-8 border-gray-300 focus:border-[#717984] focus:ring-2 focus:ring-[#717984] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="text-white bg-[#717984] border-0 py-2 px-8 focus:outline-none hover:bg-[#717984] rounded text-lg"
        >
          Log in
        </button>
      </form>
    </>
  );
};

export default SignIn;
