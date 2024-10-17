import { Outlet, Link } from "react-router-dom";

export default function Root() {
    return (
        <>
            <div id="sidebar">
                <h1>My new app</h1>
                <nav>
                    <ul>
                        <li>
                            <Link to={`/auth/login`}>Login</Link>
                        </li>
                        <li>
                            <Link to={`/`}>Users</Link>
                        </li>
                        <li>
                            <Link to={`/auth/logout`}>Logout</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div id="detail">
                <Outlet/>
            </div>
        </>
    );
}