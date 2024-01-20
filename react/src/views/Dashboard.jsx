export default function Dashboard() {
    // import user from context
    const {user} = useStateContext();
    return (
        <div>
            Dashboard
          Welcome {user.name}

        </div>
    )
}
