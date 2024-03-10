import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import TeacherDetails from "../pages/Teachers/TeacherDetails";
import { Routes, Route } from "react-router-dom";
import Teachers from "../pages/Teachers/Teachers";
import MyAccount from "../Dashboard/student-account/MyAccount";
import Dashboard from "../Dashboard/teacher-account/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboard from "../Dashboard/admin-account/AdminDashboard";
import { useContext } from "react";
import { authContext } from "../context/AuthContext";
import GuestMoodTeachers from "../pages/GuestMood/GuestMoodTeachers";
import GuestMooodTeacherDetails from "../pages/GuestMood/GuestMooodTeacherDetails";
import PendingAppointments from "../Dashboard/teacher-account/PendingAppointments";
import ApprovedAppointments from "../Dashboard/teacher-account/ApprovedAppointments";
import AllAppointments from "../Dashboard/admin-account/AllAppointments";
import AllUsers from "../Dashboard/admin-account/AllUsers";
import AllTeachers from "../Dashboard/admin-account/AllTeachers";

const Routers = () => {
  const { user } = useContext(authContext);
  return (
    <Routes>
      <Route path="/" element={<Home></Home>}></Route>
      <Route path="/home" element={<Home></Home>}></Route>
      <Route path="/contact" element={<Contact></Contact>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/signup" element={<Signup></Signup>}></Route>
      <Route path="/teachers" element={<Teachers></Teachers>}></Route>
      <Route path="/allappointments" element={<AllAppointments />}></Route>
      <Route path="/allstudents" element={<AllUsers />}></Route>
      <Route path="/allteachers" element={<AllTeachers />}></Route>
      <Route
        path="/pendingappointments"
        element={<PendingAppointments></PendingAppointments>}
      ></Route>
      <Route
        path="/appointments"
        element={<ApprovedAppointments></ApprovedAppointments>}
      ></Route>
      {user == null ? (
        <Route
          path="/guestmoodteachers"
          element={<GuestMoodTeachers></GuestMoodTeachers>}
        ></Route>
      ) : (
        <Route
          path="/teachersinfo"
          element={<GuestMoodTeachers></GuestMoodTeachers>}
        ></Route>
      )}

      {user == null ? (
        <Route
          path="/guestmoodteachers/:id"
          element={<GuestMooodTeacherDetails />}
        ></Route>
      ) : (
        <Route
          path="/teacherinfo/:id"
          element={<GuestMooodTeacherDetails />}
        ></Route>
      )}

      <Route
        path="/teachers/:id"
        element={<TeacherDetails></TeacherDetails>}
      ></Route>

      <Route
        path="/users/profile/me"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <MyAccount />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/teachers/profile/me"
        element={
          <ProtectedRoute allowedRoles={["teacher"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/admin/profile/me"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
};

export default Routers;
