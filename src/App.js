import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import AdminHome from "./adminComponents/AdminHome";
import UpdateComplaint from "./adminComponents/UpdateComplaint";
import ViewComplaint from "./adminComponents/ViewComplaints";
import ViewComplaintDetails from "./adminComponents/ViewComplaintDetails";
import ViewComplaintDetailsByForwardinMember from "./userComponents/ViewComplaintDetails";
import Users from "./adminComponents/Users";
import AddMember from "./adminComponents/AddMember";
import UpdateMember from "./adminComponents/UpdateMember";
import UserAdminHome from "./userComponents/UserAdminHome";
import SlideBar from "../src/userComponents/SlideBar";
import Navbar from "./adminComponents/Navbar";
import ViewByStates from "./userComponents/ViewByStates";
import ViewComplaints from "./userComponents/ViewComplaints";
import UpdateComplaintByUser from "./userComponents/updateComplaint";
import UserNavbar from "./components/Navbar";
import ViewComplaintInDetailByUser from "./components/ViewComplaintInDetailByUser";
import SlidebarAdmin from "../src/adminComponents/SideBar";
import moment from "moment";
function App() {
  // For Forwarding member status
  const [closed, setClosed] = useState(0);
  const [visitOk, setVisitOk] = useState(0);
  const [pending, setPending] = useState(0);
  const [cancel, setCancel] = useState(0);
  const [total, setTotal] = useState(0);
  const [closedComplaintsFD, setClosedComplaintsFD] = useState([]);
  const [visitOkComplaintsFD, setVisitOkComplaintsFD] = useState([]);
  const [pendingComplaintsFD, setPendingComplaintsFD] = useState([]);
  const [cancelComplaintsFD, setCancelComplaintsFD] = useState([]);
  const [totalComplaintsFD, setTotalComplaintsFD] = useState([]);

  // for selecting month so anyone can fetch complaint of that month
  const [month, setMonth] = useState(moment().month() + 1);

  // for admin dashboard count
  const [isDashboard, setIsDashboard] = useState(false);
  return (
    <Router>
      <Routes>
        {/* Entry Routes */}
        <Route
          element={
            <>
              <div className="w-full nunito-font h-full bg-[#F1F5F9]">
                <UserNavbar setMonth={setMonth} month={month} />
                <Outlet />
              </div>
            </>
          }
        >
          <Route path="/" element={<Home month={month} />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/viewComplaintByUser/:cid"
            element={<ViewComplaintInDetailByUser />}
          />
        </Route>

        {/* Admin */}

        <Route
          element={
            <>
              <div className="w-full nunito-font h-full bg-[#F1F5F9]">
                <Navbar setMonth={setMonth} month={month} />
                <div className="flex flex-no-wrap">
                  <SlidebarAdmin
                    closed={closed}
                    pending={pending}
                    visitOk={visitOk}
                    cancel={cancel}
                    closedComplaintsFD={closedComplaintsFD}
                    pendingComplaintsFD={pendingComplaintsFD}
                    visitOkComplaintsFD={visitOkComplaintsFD}
                    cancelComplaintsFD={cancelComplaintsFD}
                    setIsDashboard={setIsDashboard}
                  />
                  <Outlet />
                </div>
              </div>
            </>
          }
        >
          <Route
            path="/ideal-admin"
            element={<AdminHome isDashboard={isDashboard} />}
          />
          <Route
            path="/view-complaints"
            element={
              <ViewComplaint
                setCancel={setCancel}
                setClosed={setClosed}
                setPending={setPending}
                setVisitOk={setVisitOk}
                setCancelComplaintsFD={setCancelComplaintsFD}
                setClosedComplaintsFD={setClosedComplaintsFD}
                setPendingComplaintsFD={setPendingComplaintsFD}
                setVisitOkComplaintsFD={setVisitOkComplaintsFD}
                isDashboard={isDashboard}
                month={month}
              />
            }
          />
          <Route
            path="/view-details-complaint/:cid"
            element={<ViewComplaintDetails />}
          />
          <Route path="/update-complaint/:cid" element={<UpdateComplaint />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/addMember" element={<AddMember />} />
          <Route path="/users/updateMember/:mid" element={<UpdateMember />} />
        </Route>
        {/* Forwarding Member Routes */}
        <Route
          element={
            <>
              <div className="w-full nunito-font h-full bg-[#F1F5F9]">
                <Navbar setMonth={setMonth} month={month} />
                <div className="flex flex-no-wrap">
                  <SlideBar
                    closed={closed}
                    pending={pending}
                    visitOk={visitOk}
                    cancel={cancel}
                    total={total}
                    closedComplaintsFD={closedComplaintsFD}
                    pendingComplaintsFD={pendingComplaintsFD}
                    visitOkComplaintsFD={visitOkComplaintsFD}
                    cancelComplaintsFD={cancelComplaintsFD}
                    totalComplaintsFD={totalComplaintsFD}
                  />
                  <Outlet />
                </div>
              </div>
            </>
          }
        >
          <Route path="/user-admin" element={<UserAdminHome />} />
          <Route
            path="/user-admin/view-complaints"
            element={
              <ViewComplaints
                setCancel={setCancel}
                setClosed={setClosed}
                setPending={setPending}
                setVisitOk={setVisitOk}
                setTotal={setTotal}
                closedComplaintsFD={closedComplaintsFD}
                pendingComplaintsFD={pendingComplaintsFD}
                visitOkComplaintsFD={visitOkComplaintsFD}
                cancelComplaintsFD={cancelComplaintsFD}
                totalComplaintsFD={totalComplaintsFD}
                setCancelComplaintsFD={setCancelComplaintsFD}
                setClosedComplaintsFD={setClosedComplaintsFD}
                setPendingComplaintsFD={setPendingComplaintsFD}
                setVisitOkComplaintsFD={setVisitOkComplaintsFD}
                setTotalComplaintsFD={setTotalComplaintsFD}
                month={month}
              />
            }
          />
          <Route path="/user-admin/viewByStates" element={<ViewByStates />} />
          <Route
            path="/user-admin/updateComplaint/:cid"
            element={<UpdateComplaintByUser />}
          />
          <Route
            path="/user-admin/view-details-complaint/:cid"
            element={<ViewComplaintDetailsByForwardinMember />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
