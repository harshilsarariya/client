import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchByPhoneNo, search } from "../api/complaint";
import ComplaintListForUser from "./ComplaintListForUser";
import { AiOutlineSearch } from "react-icons/ai";
import { CSVLink } from "react-csv";
import Telegram from "telegram-send-message";

const Navbar = (props) => {
  const [searchResult, setSearchResult] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [isViewClicked, setIsViewClicked] = useState(false);
  let navigate = useNavigate();

  const handleLogoutMsg = async (e) => {
    let email = localStorage.getItem("email");
    Telegram.setToken("5544235859:AAGK1a8-kmIjoo5lG2c4H5R74ofEKH2g6eM");
    Telegram.setRecipient("5474931297");
    Telegram.setMessage(email + " has been logged out Successfully");
    Telegram.send();
  };

  const handleLogout = async () => {
    await handleLogoutMsg();
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("memberId");
    localStorage.removeItem("sortBy");
    localStorage.removeItem("stateVal");
    localStorage.removeItem("search");
    localStorage.removeItem("companyVal");
    navigate("/signin");
  };

  const handleSearchByPhone = async () => {
    const data = await searchByPhoneNo(query, props.month);
    setIsSearch(true);
    setSearchResult(data);
  };

  const handleString = async (e) => {
    const data = await search(query, props.month);
    setIsSearch(true);
    setSearchResult(data);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!isNaN(query)) {
      await handleSearchByPhone();
    } else {
      await handleString();
    }
  };

  const handleMonthChange = (e) => {
    props.setMonth(e.target.value);
  };

  useEffect(() => {
    if (window.location.pathname === "/signin") {
      setShowSearchBar(false);
    } else {
      setShowSearchBar(true);
    }
  }, [window.location.pathname]);

  useEffect(() => {
    if (query.length < 1) {
      setIsSearch(false);
    }
  }, [query]);

  let headers = [
    { label: "DATE", key: "date" },
    { label: "PARTY NAME", key: "partyName" },
    { label: "ADDRESS", key: "address" },
    { label: "PINCODE", key: "pincode" },
    { label: "STATE", key: "state" },
    { label: "CITY", key: "city" },
    { label: "MOBILE NO", key: "mobileNo" },
    { label: "BRAND NAME", key: "brandName" },
    { label: "REMARK", key: "remark" },
    { label: "OFFICE NO", key: "plumbingNo" },
    { label: "WORK DONE", key: "workDone" },
    { label: "PROBLEM SOLVED", key: "problemSolved" },
    { label: "SYPHONE COLOR", key: "syphoneColor" },
    { label: "CODE", key: "code" },
    { label: "PROBLEM", key: "problem" },
    { label: "SOLUTIONS", key: "solutions" },
    { label: "REPEAT", key: "repeat" },
    { label: "CLOSING DATE", key: "closingDate" },
  ];

  return (
    <div className="nunito-font  top-0 z-50 ">
      <nav className="flex bg-[#000000] items-center justify-between flex-wrap p-4 ">
        <ul className="flex space-x-6 items-center text-white font-bold ">
          <li className="flex">
            <Link className="text-2xl " to="/">
              Ideal
            </Link>
          </li>
        </ul>

        <div className="space-x-1 flex items-center">
          {showSearchBar && (
            <>
              <div className="mr-5 flex items-center">
                {isSearch && (
                  <>
                    <div className="  ">
                      <CSVLink
                        data={searchResult}
                        headers={headers}
                        className="bg-[#86da32b5] rounded-xl p-2 px-4 text-lg mr-5"
                      >
                        Export All
                      </CSVLink>
                    </div>
                  </>
                )}
                <div className="mr-5 flex">
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
                <form className="flex ">
                  <input
                    className="border border-gray-100 focus:outline-none focus:border-indigo-700  w-full text-sm text-gray-500 bg-gray-100 pl-4 py-2 rounded-l-xl "
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search here"
                    onSubmit={handleSearch}
                  />
                  <button
                    className="bg-slate-300 p-2 rounded-r-xl"
                    onClick={handleSearch}
                  >
                    <AiOutlineSearch size={20} />
                  </button>
                </form>
              </div>
            </>
          )}
          <ul className="flex space-x-6 items-center text-white font-bold ">
            <li>
              <Link to="/">Home</Link>
            </li>

            {!localStorage.getItem("token") ? (
              <li>
                <Link to="/signin">Sign in</Link>
              </li>
            ) : (
              <li>
                <button className="font-bold " onClick={handleLogout}>
                  Log out
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {isSearch && showSearchBar && !isViewClicked && (
        <ComplaintListForUser
          isSearch={isSearch}
          searchResult={searchResult}
          setIsViewClicked={setIsViewClicked}
        />
      )}
    </div>
  );
};

export default Navbar;
