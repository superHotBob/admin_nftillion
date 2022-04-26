import "./styles.scss";
import { NavLink, useParams } from "react-router-dom";
export const NavPanel = () => {
    return (
        <div className="mainNavBlock">
            <NavLink  style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                color: isActive ? "red" : "",
              };
            }} to="/users">
                USERS
            </NavLink>
            <NavLink  style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                color: isActive ? "red" : "",
              };
            }} to="/collections">
                Collections
            </NavLink>

        </div>
    )
}