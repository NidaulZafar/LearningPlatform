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

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout/>,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard"/>
      },
      {
        path: "/dashboard",
        element: <Dashboard/>
      },
      {
        path: "/courses",
        element: <Courses/>
      },
      {
        path: "/courses/:id",
        element: <CourseDetail/>
      },
      {
        path: "/enrolled",
        element: <EnrolledCourses/>
      },
      {
        path: "/announcements",
        element: <Announcements/>
      },
      {
        path: "/feedback",
        element: <FeedbackPage/>
      }
    ]
  },
  {
    path: "/",
    element: <GuestLayout/>,
    children: [
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/signup",
        element: <Signup/>
      },
      {
        path: "/announcements",
        element: <Announcements/>
      }
    ]
  },
  {
    path: "*",
    element: <NotFound/>
  }
])


export default router;
