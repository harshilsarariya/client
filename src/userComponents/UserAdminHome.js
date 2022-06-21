import React, { useEffect } from "react";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";

export default function UserAdminHome() {
  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    }
  }, []);
  return (
    <>
      <Dashboard />
    </>
  );
}
