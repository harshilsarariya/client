import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import RecentComplaint from "./ComplaintList";
import { searchByCompany, searchByState } from "../api/complaint";
import { CSVLink } from "react-csv";
import { AiOutlineSearch } from "react-icons/ai";
export const defaultComplaint = {
  partyName: "",
  address: "",
  pincode: "",
  state: "",
  city: "",
  mobileNo: "",
  plumbingNo: "",
  brandName: "",
  workDone: "",
  problemSolved: "",
  repeat: "",
  syphoneColor: "",
};

const ViewComplaint = () => {
  let pageNo = 0;
  let POST_LIMIT = 15;
  const [companyView, setCompanyView] = useState(false);
  const [stateView, setStateView] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const handleSortByChange = (e) => {
    const { value } = e.target;
    if (value === "Company") {
      setCompanyView(true);
      setStateView(false);
    }
    if (value === "Default") {
      setStateView(false);
      setCompanyView(false);
    }
    if (value === "State") {
      setStateView(true);
      setCompanyView(false);
    }
  };
  const handleSearch = async (e) => {
    const data = await searchByCompany(query);
    setIsSearch(true);
    setSearchResult(data);
  };
  const handleStateBySearch = async (e) => {
    const data = await searchByState(query);
    setIsSearch(true);
    setSearchResult(data);
  };
  let headers = [
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
  useEffect(() => {
    // if (!localStorage.getItem("token")) {
    //   // navigate("/signin");
    // }
  }, [searchResult]);
  return (
    <div className="w-full nunito-font h-full bg-[#F1F5F9]">
      <div className="">
        <Navbar />
        <div className="flex flex-no-wrap">
          <SideBar />
          <div className="ml-8">
            <div className="flex justify-between  items-center">
              <h1 className="text-xl w-44 font-medium mt-8  border-b-2 border-gray-300">
                Complaints
              </h1>
              <div className="flex  items-center">
                {companyView && (
                  <>
                    <div>
                      <CSVLink
                        data={searchResult}
                        headers={headers}
                        className="bg-[#a6df6cb5] p-2 rounded-xl"
                      >
                        Export to CSV
                      </CSVLink>
                    </div>
                    <div className="rounded-xl flex ml-5  ">
                      <input
                        onChange={(e) => setQuery(e.target.value)}
                        className="border border-gray-100 rounded-l-xl focus:outline-none focus:border-indigo-700  w-full text-base text-gray-500 bg-white-100 pl-2 py-2 "
                        type="text"
                        placeholder="Search Company"
                      />
                    </div>
                    <button
                      className="bg-slate-300 p-2 rounded-r-xl"
                      onClick={handleSearch}
                    >
                      <AiOutlineSearch size={20} />
                    </button>
                  </>
                )}
                {stateView && (
                  <>
                    <div>
                      <CSVLink
                        data={searchResult}
                        headers={headers}
                        className="bg-[#a6df6cb5] p-2 rounded-xl"
                      >
                        Export to CSV
                      </CSVLink>
                    </div>
                    <div className="rounded-xl flex ml-5  ">
                      <input
                        onChange={(e) => setQuery(e.target.value)}
                        className="border border-gray-100 rounded-l-xl focus:outline-none focus:border-indigo-700  w-full text-base text-gray-500 bg-white-100 pl-2 py-2 "
                        type="text"
                        placeholder="Search State"
                      />
                    </div>
                    <button
                      className="bg-slate-300 p-2 rounded-r-xl"
                      onClick={handleStateBySearch}
                    >
                      <AiOutlineSearch size={20} />
                    </button>
                  </>
                )}
                <label
                  htmlFor="sortBy"
                  className="leading-7 text-lg text-gray-600 mr-3 ml-8"
                >
                  Sort By
                </label>

                <select
                  id="sortBy"
                  onChange={handleSortByChange}
                  className="appearance-none rounded-xl border border-gray-300 focus:border-[#717984] focus:bg-white focus:ring-1 focus:ring-[#717984] text-lg outline-none text-gray-700  p-2 transition-colors duration-200 ease-in-out"
                >
                  <option value="Default">Default</option>
                  <option value="Company">Company </option>
                  <option value="State">State </option>
                </select>
              </div>
            </div>
            <RecentComplaint
              isSearch={isSearch}
              searchResult={searchResult}
              pageNo={pageNo}
              limit={POST_LIMIT}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewComplaint;
