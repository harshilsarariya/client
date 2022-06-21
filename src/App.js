import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import ComplaintForm from "./components/ComplaintForm";
import AdminHome from "./adminComponents/AdminHome";
import UpdateComplaint from "./adminComponents/UpdateComplaint";
import ViewComplaint from "./adminComponents/ViewComplaints";
import ViewComplaintDetails from "./adminComponents/ViewComplaintDetails";
import Users from "./adminComponents/Users";
import AddMember from "./adminComponents/AddMember";
import UpdateMember from "./adminComponents/UpdateMember";
import UserAdminHome from "./userComponents/UserAdminHome";
import ComplaintList from "./userComponents/ComplaintList";
import SlideBar from "../src/userComponents/SlideBar";
import Navbar from "./adminComponents/Navbar";
import ViewByStates from "./userComponents/ViewByStates";
import ViewComplaints from "./userComponents/ViewComplaints";
import UpdateComplaintByUser from "./userComponents/updateComplaint";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register-complaint" element={<ComplaintForm />} />
        <Route path="/ideal-admin" element={<AdminHome />} />
        <Route path="/view-complaints" element={<ViewComplaint />} />
        <Route
          path="/view-details-complaint/:cid"
          element={<ViewComplaintDetails />}
        />
        <Route path="/update-complaint/:cid" element={<UpdateComplaint />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/addMember" element={<AddMember />} />
        <Route path="/users/updateMember/:mid" element={<UpdateMember />} />

        {/* Admin Routes */}
        <Route
          element={
            <>
              <div className="w-full nunito-font h-full bg-[#F1F5F9]">
                <Navbar />
                <div className="flex flex-no-wrap">
                  <SlideBar />
                  <Outlet />
                </div>
              </div>
            </>
          }
        >
          <Route path="/user-admin" element={<UserAdminHome />} />
          <Route
            path="/user-admin/view-complaints"
            element={<ViewComplaints />}
          />
          <Route path="/user-admin/viewByStates" element={<ViewByStates />} />
          <Route
            path="/user-admin/updateComplaint/:cid"
            element={<UpdateComplaintByUser />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
