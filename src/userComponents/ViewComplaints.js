import React, { useEffect, useState } from "react";
import { getMember, searchByPhoneNo, search } from "../api/complaint";
import { AiOutlineSearch } from "react-icons/ai";
import ComplaintList from "./ComplaintList";

export const defaultPost = {
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
  remark: "",
  problem: "",
  solution: "",
  plumberName: "",
  closingDate: "",
};

const ViewComplaints = (props) => {
  const [stateView, setStateView] = useState(true);
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [stateList, setStateList] = useState([]);
  const [openingDate, setOpeningDate] = useState("");
  const memberId = localStorage.getItem("memberId");

  const getMemberById = async (memberId) => {
    const { data } = await getMember(memberId);
    setStateList(data.states);
  };

  const getComplaintByState = async (state) => {
    const data = await search(state, props.month);
    setSearchResult(data);
    setIsSearch(true);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    if (value === "Default") {
      setStateView(true);
      setSearchResult([]);
    } else {
      setStateView(false);
      getComplaintByState(value);
    }
    localStorage.setItem("search", value);
  };

  const handleTotalComplaint = async () => {
    let ope = 0,
      clo = 0,
      vis = 0,
      can = 0,
      rep = 0;
    props.setPendingComplaintsFD([]);
    props.setClosedComplaintsFD([]);
    props.setVisitOkComplaintsFD([]);
    props.setCancelComplaintsFD([]);
    props.setRepeatComplaintsFD([]);
    props.setTotalComplaintsFD(searchResult);
    props.setTotal(searchResult.length);
    props.setClosed(0);
    props.setPending(0);
    props.setVisitOk(0);
    props.setCancel(0);
    props.setRepeat(0);
    searchResult.map((complaint) => {
      if (
        (complaint.workDone === "Yes" && complaint.problemSolved === "Yes") ||
        (complaint.workDone === "Yes" && complaint.problemSolved === "No")
      ) {
        clo++;
        props.setClosed(clo);
        props.setClosedComplaintsFD((prev) => [...prev, complaint]);
      } else if (
        complaint.repeat === "Yes" &&
        complaint.workDone === "No" &&
        complaint.problemSolved === "No"
      ) {
        rep++;
        props.setRepeat(rep);
        props.setRepeatComplaintsFD((prev) => [...prev, complaint]);
      } else if (
        (complaint.workDone === "No" && complaint.problemSolved === "No") ||
        complaint.workDone === "No"
      ) {
        ope++;
        props.setPending(ope);
        props.setPendingComplaintsFD((prev) => [...prev, complaint]);
      } else if (complaint.workDone === "Visit Ok") {
        vis++;
        props.setVisitOk(vis);
        props.setVisitOkComplaintsFD((prev) => [...prev, complaint]);
      } else if (complaint.workDone === "Cancel") {
        can++;
        props.setCancel(can);
        props.setVisitOkComplaintsFD((prev) => [...prev, complaint]);
      }
    });
  };

  const handleQuerySearch = async () => {
    const data = await searchByPhoneNo(query, props.month);
    setIsSearch(true);
    setSearchResult(data);
  };

  const handleString = async (e) => {
    const data = await search(query, props.month);
    setIsSearch(true);
    setSearchResult(data);
  };

  const handleSearchForAll = (e) => {
    if (!isNaN(query)) {
      handleQuerySearch();
    } else {
      handleString();
    }
    if (query.length >= 1) {
      localStorage.setItem("search", query);
    }
  };

  useEffect(() => {
    handleTotalComplaint();
  }, [searchResult]);

  useEffect(() => {
    getMemberById(memberId);
  }, [memberId]);

  useEffect(() => {
    let search = localStorage.getItem("search");
    if (search) {
      setQuery(search);
      getComplaintByState(search);
    }
  }, [window.location.pathname]);

  return (
    <div className="ml-8">
      <div className="flex justify-between  items-center">
        <h1 className="text-xl w-44 font-medium mt-8  border-b-2 border-gray-300">
          Complaints
        </h1>
        {/* <button
          className="bg-gray-400 p-2  transform rounded-3xl mb-5 "
          onClick={handleTotalComplaint}
        >
          <GrRefresh size={24} />
        </button> */}
        <div className="flex  items-center">
          {stateView && (
            <>
              <div className="rounded-xl flex ml-5  ">
                <input
                  onChange={(e) => setQuery(e.target.value)}
                  className="border border-gray-100 rounded-l-xl focus:outline-none focus:border-indigo-700  w-full text-base text-gray-500 bg-white-100 pl-2 py-2 "
                  type="text"
                  value={query}
                  placeholder="Search here "
                  onSubmit={handleSearchForAll}
                />
              </div>
              <button
                className="bg-slate-300 p-2 rounded-r-xl"
                onClick={handleSearchForAll}
              >
                <AiOutlineSearch size={20} />
              </button>
            </>
          )}
          <label
            htmlFor="sortBy"
            className="leading-7 text-lg text-gray-600 mr-3 ml-8"
          >
            Choose State
          </label>

          <select
            id="sortBy"
            onChange={handleChange}
            className="appearance-none rounded-xl border border-gray-300 focus:border-[#717984] focus:bg-white focus:ring-1 focus:ring-[#717984] text-base outline-none text-gray-700  p-2 transition-colors duration-200 ease-in-out"
          >
            <option value="Default">Default</option>
            {stateList.map((state) => (
              <option value={state}>{state}</option>
            ))}
          </select>
        </div>
      </div>
      <ComplaintList
        isSearch={isSearch}
        searchResult={searchResult}
        setOpeningDate={setOpeningDate}
        openingDate={openingDate}
      />
    </div>
  );
};

export default ViewComplaints;
