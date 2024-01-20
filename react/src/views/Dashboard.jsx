import {useStateContext} from "../contexts/ContextProvider.jsx";

export default function Dashboard() {
    // import user from context
    const {user} = useStateContext();
    return (
        <div>
            Dashboard
          Welcome {user.name}
          You are logged in as {user.type}
        {/*  create a logout button */}
          <a href="/logout">Logout</a>

        </div>
    )
}
