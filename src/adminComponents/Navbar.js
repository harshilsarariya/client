import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Navbar = (props) => {
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState(false);

  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("memberId");
    localStorage.removeItem("search");
    localStorage.removeItem("queryVal");
    localStorage.removeItem("otpIdeal");
    navigate("/signin");
  };

  const handleMonthChange = (e) => {
    props.setMonth(e.target.value);
  };
  return (
    <div>
      <div className="w-full nunito-font h-full bg-[#F1F5F9]">
        {/* Navigation starts */}
        <nav className="h-16 flex items-center m-2 rounded-xl lg:items-stretch justify-end lg:justify-between bg-[#164E63] shadow relative z-10">
          <div className="hidden lg:flex w-full pr-6 justify-between">
            <div className="w-1/2  hidden lg:flex items-center pl-3">
              <h1 className="text-3xl text-white px-10">Ideal</h1>
            </div>
            <div className="w-1/2 hidden lg:flex ">
              <div className="w-full flex items-center pl-8 justify-end">
                <div className="mr-5 flex items-center ">
                  <select
                    name="month"
                    className=" border border-gray-100 focus:outline-none focus:border-indigo-700  w-full text-lg text-gray-500 bg-gray-100 py-0.5 px-3  appearance-none rounded-xl"
                    id="month"
                    onChange={handleMonthChange}
                  >
                    <option value={props.month}>Select Month</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </select>
                </div>
                <div
                  className="flex items-center relative cursor-pointer"
                  onClick={() => setProfile(!profile)}
                >
                  <div className="rounded-full">
                    {profile ? (
                      <ul className="p-2 w-52 border-r  bg-[#123E4F] absolute rounded right-0 shadow mt-12 sm:mt-16 ">
                        <hr className="my-2 border-[#254D5D]" />
                        <li className="flex w-full  justify-between text-white hover:bg-[#1E4858] p-1 rounded cursor-default items-center">
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-user"
                              width={18}
                              height={18}
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path stroke="none" d="M0 0h24v24H0z" />
                              <circle cx={12} cy={7} r={4} />
                              <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                            </svg>
                            <span className="text-base ml-2">My Profile</span>
                          </div>
                        </li>
                        <li className="flex w-full justify-between text-white hover:bg-[#1E4858] p-1 rounded  cursor-pointer items-center mt-2">
                          <div
                            onClick={handleLogout}
                            className="flex items-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-logout"
                              width={20}
                              height={20}
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path stroke="none" d="M0 0h24v24H0z" />
                              <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                              <path d="M7 12h14l-3 -3m0 6l3 -3" />
                            </svg>
                            <span className="text-base ml-2">Sign out</span>
                          </div>
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                    <div className="relative">
                      <img
                        className="rounded-full h-10 w-10 object-cover"
                        src="http://enigma-vue.left4code.com/assets/profile-9.30af9082.jpg"
                        alt="avatar"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="text-gray-600 mr-8 visible lg:hidden relative"
            onClick={() => setShow(!show)}
          >
            {show ? (
              " "
            ) : (
              <svg
                aria-label="Main Menu"
                aria-haspopup="true"
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-menu cursor-pointer"
                width={30}
                height={30}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1={4} y1={8} x2={20} y2={8} />
                <line x1={4} y1={16} x2={20} y2={16} />
              </svg>
            )}
          </div>
        </nav>
        {/* Navigation ends */}
      </div>
    </div>
  );
};

export default Navbar;
