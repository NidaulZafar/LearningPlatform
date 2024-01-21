import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function DefaultLayout() {
  const {user, token} = useStateContext()

  if (!token) {
    return <Navigate to="/login"/>
  }

  const logout = (e) => {
    e.preventDefault()
  }


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
