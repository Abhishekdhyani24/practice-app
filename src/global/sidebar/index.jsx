import "./style.scss";

import { Link, NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {

    return (

        <div className="sidebar">
            {/* <a className="active" href="#home">Home</a> */}

            <NavLink
                className={(navData) =>
                    navData.isActive ? "active" : ""
                }
                to="/home"
            >
                <span>Home</span>
            </NavLink>
            {/* <a href="#news">Manage Users</a> */}
            <NavLink
                className={(navData) =>
                    navData.isActive ? "active" : ""
                }
                to="/users"
            >
                <span>Manage Users</span>
            </NavLink>
            <NavLink
                className={(navData) =>
                    navData.isActive ? "active" : ""
                }
                to="/question"
            >
                <span>Questions</span>
            </NavLink>
            <a href="#about">About</a>
        </div>
    )
}

export default Sidebar;