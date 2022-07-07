import React, { useEffect, useState } from "react";
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
    { label: "DATE", key: "date" },
    { label: "PARTY NAME", key: "partyName" },
    { label: "ADDRESS", key: "address" },
    { label: "PINCODE", key: "pincode" },
    { label: "STATE", key: "state" },
    { label: "CITY", key: "city" },
    { label: "MOBILE NO", key: "mobileNo" },
    { label: "BRAND NAME", key: "brandName" },
    { label: "PLUMBER NAME", key: "plumberName" },
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
    <div className="w-[80vw] nunito-font h-full bg-[#F1F5F9]">
      <div className="ml-8">
        <div className="flex justify-between  items-center">
          <h1 className="text-xl font-medium mt-8  border-b-2 border-gray-300">
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

        <RecentComplaint
          isSearch={isSearch}
          searchResult={searchResult}
          setCancel={props.setCancel}
          setClosed={props.setClosed}
          setPending={props.setPending}
          setVisitOk={props.setVisitOk}
          setCancelComplaintsFD={props.setCancelComplaintsFD}
          setClosedComplaintsFD={props.setClosedComplaintsFD}
          setPendingComplaintsFD={props.setPendingComplaintsFD}
          setVisitOkComplaintsFD={props.setVisitOkComplaintsFD}
          isDashboard={props.isDashboard}
        />
      </div>
    </div>
  );
};

export default ViewComplaint;
