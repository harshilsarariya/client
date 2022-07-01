import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import RecentComplaint from "./ComplaintList";
import { search } from "../api/complaint";
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

const ViewComplaint = (props) => {
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    const data = await search(query, props.month);
    setIsSearch(true);
    setSearchResult(data);
    if (query.length >= 1) {
      localStorage.setItem("queryVal", query);
    }
  };

  useEffect(() => {
    setQuery(localStorage.getItem("queryVal"));
    if (query.length >= 1) {
      handleSearch();
    }
  }, [window.location.pathname]);

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
    { label: "Code", key: "code" },
    { label: "Remark", key: "remark" },
    { label: "Problem", key: "problem" },
    { label: "Solutions", key: "solutions" },
    { label: "Plumber Name", key: "plumberName" },
    { label: "Closing Date", key: "closingDate" },
  ];

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
                <div>
                  <CSVLink
                    data={searchResult}
                    headers={headers}
                    className="bg-[#a6df6cb5] p-2 rounded-xl"
                  >
                    Export to CSV
                  </CSVLink>
                </div>
                <form className="rounded-xl flex ml-5  ">
                  <input
                    onChange={(e) => setQuery(e.target.value)}
                    className="border border-gray-100 rounded-l-xl focus:outline-none focus:border-indigo-700  w-full text-base text-gray-500 bg-white-100 pl-2 py-2 "
                    value={query}
                    type="text"
                    placeholder="Search here..."
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
            </div>
            <RecentComplaint isSearch={isSearch} searchResult={searchResult} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewComplaint;
