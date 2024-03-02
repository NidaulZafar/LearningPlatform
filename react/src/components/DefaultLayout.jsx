import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import React, {useEffect} from "react";
import axiosClient from "../axios-client.js";
import Footer from "./Footer.jsx";

export default function DefaultLayout() {
  const {user, token, setUser, setToken} = useStateContext()

  if (!token) {
    return <Navigate to="/login"/>
  }


  useEffect(() => {
    axiosClient.get('/user').then(({data}) => {
      setUser(data)
    })
  }, [])


  return (<>
      <main className="main">
        <Outlet/>
      </main>
      <Footer/>
    </>);

}
