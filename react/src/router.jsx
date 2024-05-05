import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import Dashboard from "./views/Dashboard.jsx";
import NotFound from "./views/NotFound.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import Courses from "./views/Courses.jsx";
import Announcements from "./views/Announcements.jsx";
import CourseDetail from "./views/CourseDetail.jsx";
import EnrolledCourses from "./components/EnrolledCourses.jsx";
import FeedbackPage from "./views/FeedbackPage.jsx";
import Contact from "./views/Contact.jsx";
import ModuleDetail from "./components/ModuleDetail.jsx";
import Assignments from "./components/Assignments.jsx";
import Quiz from "./components/Quiz.jsx";
import NewCourse from "./components/NewCourse.jsx";
import InstructorsCourses from "./components/InstructorsCourses.jsx";
import PublicProfile from "./components/PublicProfile.jsx";

const router = createBrowserRouter([{
  path: "/", element: <DefaultLayout/>, children: [{
    path: "/", element: <Navigate to="/dashboard"/>
  }, {
    path: "/dashboard", element: <Dashboard/>
  }, {
    path: "/courses", element: <Courses/>
  }, {
    path: "/courses/new", element: <NewCourse/>
  }, {
    path: "/courses/:id", element: <CourseDetail/>
  }, {
    path: "your-courses", element: <InstructorsCourses/>
  }, {
    path: "module/:id", element: <ModuleDetail/>
  }, {
    path: "/enrolled", element: <EnrolledCourses/>
  }, {
    path: "/announcements", element: <Announcements/>
  }, {
    path: "/feedback", element: <FeedbackPage/>
  }, {
    path: "/contact", element: <Contact/>
  }, {
    path: "/assignments", element: <Assignments/>
  }, {
    path: "/assignments/:id", element: <Assignments/>
  }, {
    path: "/quiz", element: <Quiz/>
  }, {
    path: "/instructors/:instructorId", element: <PublicProfile/>
  }]
}, {
  path: "/", element: <GuestLayout/>, children: [{
    path: "/login", element: <Login/>
  }, {
    path: "/signup", element: <Signup/>
  }, {
    path: "/announcements", element: <Announcements/>
  }, {
    path: "/contact", element: <Contact/>
  }]
}, {
  path: "*", element: <NotFound/>
}])


export default router;
