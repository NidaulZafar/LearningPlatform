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
    <div className="container-fluid">
      <header className="d-flex justify-content-between align-items-center p-3 bg-light">
        <div>
          <h1>Header</h1>
        </div>
        <div>
          {user.name}
          <a onClick={logout} className="btn btn-sm btn-danger ml-2" href="/logout">
            Logout
          </a>
        </div>
      </header>

      <div className="row">
        <aside className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link to="/courses" className="nav-link">Courses</Link>
              </li>
              <li className="nav-item">
                <Link to="/announcements" className="nav-link">Announcement</Link>
              </li>
            </ul>
          </div>
        </aside>

        <main className="col-md-10 ml-sm-auto">
          <Outlet/>
        </main>
      </div>
    </div>
  );

}
