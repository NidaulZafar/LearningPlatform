import { useStateContext } from "../contexts/ContextProvider.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Profile from "../components/Profile.jsx";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, setUser, setToken } = useStateContext();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return <>{user && user.type && <Profile />}</>;
}
