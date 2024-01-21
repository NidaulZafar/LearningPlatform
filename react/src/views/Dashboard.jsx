import {useStateContext} from "../contexts/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
import {useNavigate} from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();
    const {user,setUser, setToken} = useStateContext();

    const logout = async () => {
      try{
        await axiosClient.post('/logout');
        setUser(null);
        setToken(null);
        navigate('/login');
      } catch (error) {
        console.log("logout error", error);
    }
      }

    return (
        <div>
            Dashboard
          Welcome {user.name}
          You are logged in as {user.type}
          <button onClick={logout}>Logout</button>
        </div>
    )
}
