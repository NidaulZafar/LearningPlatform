import {Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function Signup() {

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const phoneRef = useRef();
  const instructorRef = useRef();
  const studentRef = useRef();

  const [errors, setErrors] = useState({});

  const {setUser, setToken} = useStateContext()

  const onsubmit = (e) => {
    e.preventDefault()
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmRef.current.value,
      phone: phoneRef.current.value,
      type: instructorRef.current.checked ? 'instructor' : 'student',
    }
    console.log(payload);
    axiosClient.post('/signup', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token)
        console.log(data);
      })
      .catch((error) => {
        const response = error.response
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      })
  }

  return (<div className="container">
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <h2 className="">Signup for a new account</h2>
          {Object.keys(errors).length > 0 && (<div className="alert alert-danger">
            {Object.keys(errors).map(key => (errors[key].map((error, index) => (
              <p key={`${key}-${index}`}> {error}</p>))))}
          </div>)}
          <div className="card-body">
            <form method="POST" onSubmit={onsubmit}>
              <div className="row mb-3">
                <label htmlFor="name" className="col-md-4 col-form-label text-md-end">Name</label>
                <div className="col-md-6">
                  <input ref={nameRef} id="name" type="text"
                         className="form-control" name="name"
                         required autoComplete="name" autoFocus/>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="email"
                       className="col-md-4 col-form-label text-md-end">Email</label>

                <div className="col-md-6">
                  <input ref={emailRef} id="email" type="email"
                         className="form-control" name="email"
                         required autoComplete="email"/>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="password"
                       className="col-md-4 col-form-label text-md-end">Password</label>

                <div className="col-md-6">
                  <input ref={passwordRef} id="password" type="password"
                         className="form-control" name="password"
                         required autoComplete="new-password"/>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="password-confirm"
                       className="col-md-4 col-form-label text-md-end">Confirm Password</label>

                <div className="col-md-6">
                  <input ref={passwordConfirmRef} id="password-confirm" type="password" className="form-control"
                         name="password_confirmation" required autoComplete="new-password"/>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="phone" className="col-md-4 col-form-label text-md-end">Phone</label>
                <div className="col-md-6">
                  <input ref={phoneRef} id="phone" type="text"
                         className="form-control"
                         name="phone" autoComplete="phone"/>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-md-4 col-form-label text-md-right">User Type</label>
                <div className="col-md-6">
                  <div className="form-check">
                    <label className="form-check-label" htmlFor="instructor">
                      <input className="form-check-input" type="radio" name="type" id="instructor"
                             value="instructor" ref={instructorRef} required/>
                      Instructor </label>
                  </div>
                  <div className="form-check">
                    <label className="form-check-label" htmlFor="student">
                      <input className="form-check-input" type="radio" name="type" id="student"
                             value="student" ref={studentRef}/>
                      Student
                    </label>
                  </div>
                </div>
              </div>
              <div className="row mb-0">
                <div className="col-md-6 offset-md-4">
                  <button type="submit" className="btn btn-primary">
                    Signup
                  </button>
                  <p className="mt-3">
                    Already have an account? <Link to="/login">Login</Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>)
}
