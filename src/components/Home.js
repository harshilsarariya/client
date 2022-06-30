import React from "react";
import ComplaintForm from "./ComplaintForm";
import ComplaintListForUser from "./ComplaintListForUser";
import Navbar from "./Navbar";

const Home = (props) => {
  return (
    <>
      <ComplaintForm month={props.month} />
    </>
  );
};

export default Home;
