import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/ContextProvider.jsx";
import img from "../assets/form-v6.jpg";

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
          if (response.data.errors) {
            setErrors(response.data.errors);
          } else {
            setErrors({
              email: [response.data.message]
            });
          }
        }
      })
  }
  return (
    <div className="page-content">
      <div className="form-v6-content">
        <div className="form-left">
          <img src={img} alt="form"/>
        </div>
        <form className="form-detail" method="POST" onSubmit={onSubmit}>
          <h2 className="">Log In</h2>
          {Object.keys(errors).length > 0 && (<div className="alert alert-danger">
            {Object.keys(errors).map(key => (errors[key].map((error, index) => (
              <p key={`${key}-${index}`}> {error}</p>))))}
          </div>)}
          <div className="form-row">
            <input ref={emailRef} id="email" type="email"
                   className="input-text" name="email"
                   required autoComplete="email" placeholder="Enter a valid Email"/>
          </div>
          <div className="form-row">
            <input ref={passwordRef} id="password" type="password"
                   className="input-text" name="password"
                   required autoComplete="new-password" placeholder="Enter Password"/>
          </div>
          <div className="form-row">
            <label className="user-type">User Type</label>
            <div className="user-type-options">
              <label htmlFor="instructor">
                <input ref={instructorRef} className="form-check-input" type="radio" name="type" id="instructor"
                       value="instructor" required/>
                Instructor </label>
              <label htmlFor="student">
                <input ref={studentRef} className="form-check-input" type="radio" name="type" id="student"
                       value="student"/>
                Student </label>
            </div>
          </div>
          <div className="form-row-last">
              <button type="submit" className="register">
                Login
              </button>
              <p className="mt-3">
                Don't have an account? <Link to="/signup">Signup</Link>
              </p>
          </div>
        </form>
      </div>
    </div>)
}
