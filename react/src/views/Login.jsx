import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const instructorRef = useRef();
  const studentRef = useRef();

  const [errors, setErrors] = useState({});
  const {setUser, setToken} = useStateContext();


  const onSubmit = (e) => {
    e.preventDefault();
    if (!instructorRef.current.checked && !studentRef.current.checked) {
      setErrors({type: ['Please select a user type']})
      return;
    }
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      type: instructorRef.current.checked ? 'instructor' : 'student',
    }
    console.log(payload);
    setErrors({});
    axiosClient.post('/login', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token)
      })
      .catch((error) => {
        const response = error.response
        if (response && response.status === 422) {
          if (response.data.errors){
            setErrors(response.data.errors);
          } else {
            setErrors({
              email: [response.data.message]});
          }
        }
      })
  }
  return (<div className="container">
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <h2 className="">Log into your account</h2>
          {Object.keys(errors).length > 0 && (<div className="alert alert-danger">
            {Object.keys(errors).map(key => (errors[key].map((error, index) => (
              <p key={`${key}-${index}`}> {error}</p>))))}
          </div>)}
          <div className="card-body">
            <form method="POST" onSubmit={onSubmit}>
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
                <label className="col-md-4 col-form-label text-md-right">User Type</label>
                <div className="col-md-6">
                  <div className="form-check">
                    <label className="form-check-label" htmlFor="instructor">
                      <input ref={instructorRef} className="form-check-input" type="radio" name="type" id="instructor"
                             value="instructor"/>
                      Instructor </label>
                  </div>
                  <div className="form-check">
                    <label className="form-check-label" htmlFor="student">
                      <input ref={studentRef} className="form-check-input" type="radio" name="type" id="student"
                             value="student"/>
                      Student </label>
                  </div>
                </div>
              </div>
              <div className="row mb-0">
                <div className="col-md-6 offset-md-4">
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                  <p className="mt-3">
                    Don't have an account? <Link to="/signup">Signup</Link>
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
