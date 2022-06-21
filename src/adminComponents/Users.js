import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { deleteMember } from "../api/complaint";

const Users = () => {
  let navigate = useNavigate();

  const [members, setMembers] = useState([{}]);

  const fetchMembers = async () => {
    let databody = {
      name: "",
      email: "",
      number: "",
      id: "",
    };

    // fetch("https://ideal-server.herokuapp.com/api/auth/getmembers", {
    fetch("http://localhost:5000/api/auth/getmembers", {
      method: "POST",
      body: JSON.stringify(databody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setMembers(data));
    console.log(members);
  };

  let doj;
  const handleDateFormate = (date) => {
    const newDate = new Date(date);
    const dateString = newDate.toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    doj = dateString;
  };

  const handleDelete = async (memberId) => {
    const confirmed = window.confirm("Are you sure!");
    if (!confirmed) return;
    const { message } = await deleteMember(memberId);

    const newMembers = members.filter((p) => p._id !== memberId);
    setMembers(newMembers);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
    fetchMembers();
    console.log(members);
  }, []);

  const commonClass =
    "px-6 py-4 font-medium text-lg bg-white text-black  whitespace-nowrap";

  return (
    <div className="w-full nunito-font  h-full bg-[#F1F5F9]">
      <div className="">
        <Navbar />
        <div className="flex flex-no-wrap">
          <SideBar />
          <section className="px-5 w-screen pt-2">
            <div className="flex justify-between ">
              <h2 className="text-xl ">Users Details</h2>
              <Link
                to={"/users/addMember"}
                className="flex bg-[#164D62] p-2 rounded-xl text-white"
              >
                <AiOutlinePlus className="text-2xl" />
                <span>Add New Member</span>
              </Link>
            </div>
            <div className=" sm:rounded-lg mt-5">
              <table className="w-[1200px] text-sm text-left text-gray-500 ">
                <thead className="text-sm text-black uppercase bg-[#F1F5F9] ">
                  <tr className="">
                    <th scope="col" className="px-6 py-4">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Phone No.
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date Of Joining
                    </th>
                    <th scope="col" className="px-6 pl-16 py-3">
                      Action
                    </th>
                  </tr>
                  <div className="mb-5" />
                </thead>

                <tbody>
                  {members.map((member, index) => (
                    <>
                      {handleDateFormate(member.date)}
                      <tr
                        key={index}
                        className=" border-b  overflow-x-auto shadow-sm"
                      >
                        <th scope="row" className={`${commonClass}`}>
                          {member.name}
                        </th>
                        <td className={`${commonClass} `}>{member.email}</td>
                        <td className={`${commonClass} `}>{member.phone}</td>
                        <td className={`${commonClass}`}>{doj}</td>
                        <td className={`${commonClass} flex space-x-4`}>
                          {/* <Link
                            to={"/view-details-complaint"}
                            className="flex items-center cursor-pointer"
                          >
                            <HiOutlineViewGridAdd
                              className="text-[#4bacc7]"
                              size={22}
                            />
                            <span className="text-[#4bacc7] ml-1 font-semibold">
                              View
                            </span>
                          </Link> */}
                          <Link
                            to={`/users/updateMember/${member._id}`}
                            className="flex items-center cursor-default "
                          >
                            {/* <TbEdit className="text-gray-500" size={19} /> */}
                            <span className="text-gray-500 ml-1 font-semibold">
                              {/* Edit */}{" "}
                            </span>
                          </Link>
                          <button
                            onClick={() => handleDelete(member._id)}
                            className="flex  items-center cursor-pointer"
                          >
                            {console.log(member.id)}
                            <MdOutlineDelete
                              className="text-red-500"
                              size={20}
                            />
                            <span className="text-red-500 ml-1 font-semibold">
                              Delete
                            </span>
                          </button>
                        </td>
                      </tr>
                      <div className="mb-5" />
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Users;
