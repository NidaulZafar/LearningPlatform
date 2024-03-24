import { Link } from "react-router-dom";

export default function NotFound() {
  return (<div>
    <h1>404 - Page Not Found</h1>
    Are you Lost?
    Let's go back to the <Link href="/">Home Page</Link><br/>
    Or maybe you want to <Link href="/login">Login</Link>?<br/>
    New user? <Link href="/signup">Sign up</Link> here.<br/>
    Or maybe you want to <Link href="/courses">Browse Courses</Link>?
  </div>)
}
