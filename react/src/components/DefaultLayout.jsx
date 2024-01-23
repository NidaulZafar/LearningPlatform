import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {useEffect} from "react";
import axiosClient from "../axios-client.js";

export default function DefaultLayout() {
  const {user, token, setUser, setToken} = useStateContext()

  if (!token) {
    return <Navigate to="/login"/>
  }

  const logout = (e) => {
    e.preventDefault()
    axiosClient.post('/logout').then(() => {
      setUser({})
      setToken(null)
    })
  }

  useEffect(() => {
    axiosClient.get('/user').then(({data}) => {
      setUser(data)
    })
  }, [])


  return (
    <div id="">
      <aside>
        <Link to="/dashboard">Dashboard</Link>
        <br/>
        <Link to="/courses">Courses</Link>
        <br/>
        <Link to="/announcements">Announcement</Link>
      </aside>
      <header>
        <div>
          Header
        </div>
        <div>
          {user.name}
          <a onClick={logout} className={"btn btn-sm btn-danger"} href="/logout">Logout</a>
        </div>
        <main>
          <Outlet/>
        </main>
      </header>
    </div>
  )
}
