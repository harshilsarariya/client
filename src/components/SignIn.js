import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getMemberByEmail, getMember } from "../api/complaint";
const SignIn = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  let navigate = useNavigate();

  let memberId;
  let isForwardingMember;
  const saveId = async () => {
    const { data } = await getMemberByEmail(credentials.email);
    memberId = data[0]._id;
    localStorage.setItem("memberId", memberId);
    isForwardingMember = data[0].isForwardingMember;
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
