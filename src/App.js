import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import ComplaintForm from "./components/ComplaintForm";
import AdminHome from "./adminComponents/AdminHome";
import UpdateComplaint from "./adminComponents/UpdateComplaint";
import ViewComplaint from "./adminComponents/ViewComplaints";
import ViewComplaintDetails from "./adminComponents/ViewComplaintDetails";
import Users from "./adminComponents/Users";

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
          path="/view-details-complaint"
          element={<ViewComplaintDetails />}
        />
        <Route path="/update-complaint" element={<UpdateComplaint />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App;
