import {useStateContext} from "../contexts/ContextProvider.jsx";
import {useNavigate} from "react-router-dom";
import InstructorProfile from "../components/InstructorProfile.jsx";
import StudentProfile from "../components/StudentProfile.jsx";
import {useEffect} from "react";

export default function Dashboard() {
    const navigate = useNavigate();
    const {user,setUser, setToken} = useStateContext();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const renderProfile = () => {
    if (user.type === 'instructor') {
      return <InstructorProfile />;
    } else if (user.type === 'student') {
      return <StudentProfile />;
    }
    return null;
  };

    return (
        <div>
          {renderProfile()}
        </div>
    )
}
