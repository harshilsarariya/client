import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMemberByEmail } from "../api/complaint";
import Telegram from "telegram-send-message";

const SignIn = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [otp, setOtp] = useState();
  const [verifyOtp, setVerifyOtp] = useState();
  const [loading, setLoading] = useState(false);
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
    setOtp(otpMessage.toString());
    Telegram.setToken("5544235859:AAGK1a8-kmIjoo5lG2c4H5R74ofEKH2g6eM");
    Telegram.setRecipient("5474931297");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Telegram.setMessage(
        "Your OTP for " + credentials.email + " is " + otpMessage
      );
      Telegram.send();
    }, 1000);
  };

  const handleOtp = (e) => {
    setVerifyOtp(e.target.value);
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

    if (otp === verifyOtp) {
      if (json.success) {
        // Save the auth token and redirect
        localStorage.setItem("token", json.authToken);
        localStorage.setItem("email", credentials.email);
        await saveId();
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
    } else {
      alert("OTP is not correct");
    }
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
      <form
        onSubmit={handleSubmit}
        className=" md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col h-[92vh] m-auto w-full mt-8 md:mt-8"
      >
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
            <label htmlFor="otp" className="leading-7 text-sm text-gray-600">
              Enter OTP
            </label>
            <input
              id="otp"
              type="number"
              name="otp"
              placeholder="Enter valid OTP"
              onChange={handleOtp}
              className="w-full bg-white rounded border appearance-none mb-8 border-gray-300 focus:border-[#717984] focus:ring-2 focus:ring-[#717984] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          {!loading && (
            <div className="w-1/5">
              <span
                onClick={handlePhoneAuthentication}
                className="bg-green-400 p-2 px-3 rounded ml-7 cursor-pointer"
              >
                Send OTP
              </span>
            </div>
          )}

          {loading && (
            <>
              <div className="w-1/5 flex">
                <span className="bg-green-400  cursor-default p-2 px-3 text-green-400  rounded ml-7 ">
                  Send OTP
                </span>
                <img
                  src="https://i.gifer.com/ZZ5H.gif"
                  className="w-7 m-1 -ml-16"
                  alt="loadingImg"
                />
              </div>
            </>
          )}
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
