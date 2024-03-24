import { Link } from "react-router-dom";

export default function NotFound() {
  return (<div>
    <h1>404 - Page Not Found</h1>
    Are you Lost?
    Let's go back to the <Link href="/">Home Page</Link><br/>
    Or maybe you want to <a href="/login">Login</a>?<br/>
    New user? <a href="/signup">Sign up</a> here.<br/>
    Or maybe you want to <a href="/courses">Browse Courses</a>?
  </div>)
}
