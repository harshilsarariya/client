import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchByPhoneNo, search } from "../api/complaint";
import ComplaintListForUser from "./ComplaintListForUser";
import { AiOutlineSearch } from "react-icons/ai";
import { CSVLink } from "react-csv";

const Navbar = (props) => {
  const [searchResult, setSearchResult] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [isViewClicked, setIsViewClicked] = useState(false);
  let navigate = useNavigate();

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

  const handleLogout = () => {
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
  const handleSearch = (e) => {
    if (!isNaN(query)) {
      handleSearchByPhone();
    } else {
      handleString();
    }
  };

  const handleMonthChange = (e) => {
    props.setMonth(e.target.value);
  };

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
    { label: "Remark", key: "remark" },
    { label: "Problem", key: "problem" },
    { label: "Solutions", key: "solutions" },
    { label: "Closing Date", key: "closingDate" },
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
                  <div className="  ">
                    <CSVLink
                      data={searchResult}
                      headers={headers}
                      className="bg-[#86da32b5] rounded-xl p-2 px-4 text-lg mr-5"
                    >
                      Export
                    </CSVLink>
                  </div>
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
                <div className="flex ">
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
                </div>
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
