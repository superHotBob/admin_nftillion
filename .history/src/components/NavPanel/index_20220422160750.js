import "./styles.scss";
import { NavLink } from "react-router-dom";
export const NavPanel = () => {
  return (
    <div className="mainNavBlock">
      <NavLink
        style={({ isActive }) => {
          return {
            display: "block",
            padding: 20,
            textDecoration: 'none',
            width: "50%",
            backgroundColor: isActive ? "#c0c0c0" : "whitw",
          };
        }}
        to="/users"
      >
        USERS
      </NavLink>
      <NavLink
        style={({ isActive }) => {
          return {
            display: "block",
            width: "50%",
            textDecoration: 'none',
            padding: 20,
            backgroundColor: isActive ? "#c0c0c0" : "whitw",
          };
        }}
        to="/collections"
      >
        COLLECTIONS
      </NavLink>
    </div>
  );
};
