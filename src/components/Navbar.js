import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchByPhoneNo } from "../api/complaint";
import ComplaintListForUser from "./ComplaintListForUser";
import { AiOutlineSearch } from "react-icons/ai";
import ComplaintForm from "./ComplaintForm";

const Navbar = () => {
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

  const handleStateBySearch = async () => {
    const data = await searchByPhoneNo(query);
    setIsSearch(true);
    setSearchResult(data);
  };

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

        <div className="space-x-1 flex">
          {showSearchBar && (
            <div className="flex  mr-7">
              <input
                className="border border-gray-100 focus:outline-none focus:border-indigo-700  w-full text-sm text-gray-500 bg-gray-100 pl-4 py-2 rounded-l-xl "
                type="text"
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search By Phone No."
                onSubmit={handleStateBySearch}
              />
              <button
                className="bg-slate-300 p-2 rounded-r-xl"
                onClick={handleStateBySearch}
              >
                <AiOutlineSearch size={20} />
              </button>
            </div>
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
