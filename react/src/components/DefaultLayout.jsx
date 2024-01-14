import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function DefaultLayout() {
  const {user, token} = useStateContext()

  if (!token) {
    return <Navigate to="/login"/>
  }


  return (
    <div id="">
      <aside>
        <Link to="/dashboard">Dashboard</Link>
        <br/>
        <Link to="/courses">Courses</Link>
      </aside>
      <header>
        <div>
          Header
        </div>
        <div>
          {user.name}
        </div>
        <main>
          <Outlet/>
        </main>
      </header>
    </div>
)
}
