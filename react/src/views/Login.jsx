import {Link} from "react-router-dom";

export default function Login() {


  const onSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <h2 className="">Log into your account</h2>
            <div className="card-body">
              <form method="POST" onSubmit={onSubmit}>
                <div className="row mb-3">
                  <label htmlFor="email"
                         className="col-md-4 col-form-label text-md-end">Email</label>

                  <div className="col-md-6">
                    <input id="email" type="email"
                           className="form-control" name="email"

                           required autoComplete="email"/>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="password"
                         className="col-md-4 col-form-label text-md-end">Password</label>

                  <div className="col-md-6">
                    <input id="password" type="password"
                           className="form-control" name="password"
                           required autoComplete="new-password"/>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-md-4 col-form-label text-md-right">User Type</label>
                  <div className="col-md-6">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="type" id="instructor"
                             value="instructor"/>
                      <label className="form-check-label" htmlFor="instructor">
                        Instructor </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="type" id="student"
                             value="student"/>
                      <label className="form-check-label" htmlFor="student">
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
    </div>
  )
}
