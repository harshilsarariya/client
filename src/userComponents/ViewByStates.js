import React, { useEffect, useState } from "react";
import { getMember } from "../api/complaint";
const ViewByStates = () => {
  const memberId = localStorage.getItem("memberId");

  const [stateList, setStateList] = useState([]);

  const getMemberById = async (memberId) => {
    const { data } = await getMember(memberId);
    setStateList(data.states);
  };

  useEffect(() => {
    getMemberById(memberId);
  }, [memberId]);

  return (
    <div className="p-2 grid grid-cols-5 h-32  mt-10 mx-10">
      {stateList.map((state) => (
        <>
          <button key={state} className="mx-2 rounded-xl bg-emerald-300">
            <h3 className="text-2xl p-10 text-green-800 font-bold">{state}</h3>
          </button>
        </>
      ))}
    </div>
  );
};

export default ViewByStates;
