import {useStateContext} from "../contexts/ContextProvider.jsx";
import axiosClient from "../axios-client.js";
import {useNavigate} from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();
    const {user,setUser, setToken} = useStateContext();
    if (!user) {
        navigate('/login')
    }

    return (
        <div>
            Dashboard
          Welcome {user.name}
          You are logged in as {user.type}
        </div>
    )
}
