import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import {useEffect} from "react";
import axiosClient from "../axios-client.js";
import './sidebar.scss';

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
      <div className="row">
        <main className="col-md-10 ml-sm-auto">
          <Outlet/>
        </main>
      </div>
    </div>
  );

}
