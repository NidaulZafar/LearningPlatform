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

  return (
    <div className="page-content">
      <div className="form-v6-content">
        <div className="form-left">
          <img src="https://picsum.photos/seed/picsum/200/300" alt="form"/>
        </div>
        <form className="form-detail" method="POST" onSubmit={onsubmit}>
          <h2>Signup for a new account</h2>
          {Object.keys(errors).length > 0 && (<div className="alert alert-danger">
            {Object.keys(errors).map(key => (errors[key].map((error, index) => (
              <p key={`${key}-${index}`}> {error}</p>))))}
          </div>)}
          <div className="form-row">
            <input ref={nameRef} id="name" type="text"
                   className="input-text" name="name"
                   required autoComplete="name" autoFocus placeholder="Your Name"/>
          </div>
          <div className="form-row">
            <input ref={emailRef} id="email" type="email"
                   className="input-text" name="email"
                   required autoComplete="email" placeholder="Enter a valid Email"/>
          </div>
          <div className="form-row">
            <input ref={passwordRef} id="password" type="password"
                   className="input-text" name="password"
                   required autoComplete="new-password" placeholder="Enter a password"/>
          </div>
          <div className="form-row">
            <input ref={passwordConfirmRef} id="password-confirm" type="password" className="input-text"
                   name="password_confirmation" required autoComplete="new-password" placeholder="Confirm Password"/>
          </div>
          <div className="form-row">
            <input ref={phoneRef} id="phone" type="text"
                   className="input-text"
                   name="phone" autoComplete="phone" placeholder="Enter your Phone Number (Optional)"/>
          </div>
          <div className="form-row">
            <label className="user-type">User Type</label>
            <div className="user-type-options">
              <label htmlFor="instructor">
                <input type="radio" name="type" id="instructor"
                       value="instructor" ref={instructorRef} required/>
                Instructor </label>
              <label htmlFor="student">
                <input type="radio" name="type" id="student"
                       value="student" ref={studentRef}/>
                Student
              </label>
            </div>
          </div>
          <div className="form-row-last">
            <button type="submit" className="register">
              Signup
            </button>
            <p className="mt-3">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
