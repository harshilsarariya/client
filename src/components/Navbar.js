import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();

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
  return (
    <div className="nunito-font sticky top-0 z-50 ">
      <nav className="flex bg-[#000000] items-center justify-between flex-wrap p-4 ">
        <ul className="flex space-x-6 items-center text-white font-bold ">
          <li className="flex">
            <Link className="text-2xl " to="/">
              Ideal
            </Link>
          </li>
        </ul>

        <div className="space-x-1 ">
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
    </div>
  );
};

export default Navbar;
