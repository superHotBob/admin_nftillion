import "./styles.scss";
import { NavLink, useParams } from "react-router-dom";
export const NavPanel = () => {
    return (
        <div className="mainNavBlock">
            <NavLink to="/users">
                USERS
            </NavLink>
            <NavLink to="/collections">
                Collections
            </NavLink>

        </div>
    )
}