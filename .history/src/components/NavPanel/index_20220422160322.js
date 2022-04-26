import "./styles.scss";
import { NavLink, useParams } from "react-router-dom";
export const NavPanel = () => {
    return (
        <div className="mainNavBlock">
            <NavLink  style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                padding: 20,
                width: '50%',
                backgroundColor: isActive ? "#c0c0c0" : "whitw",
              };
            }} to="/users">
                USERS
            </NavLink>
            <NavLink  style={({ isActive }) => {
              return {
                display: "block",
                width: '50%',
                padding: 20,
                margin: "1rem 0",
                backgroundColor: isActive ? "#c0c0c0" : "whitw",
              };
            }} to="/collections">
                Collections
            </NavLink>

        </div>
    )
}