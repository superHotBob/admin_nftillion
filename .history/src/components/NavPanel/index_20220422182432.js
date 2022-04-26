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
            textDecoration: "none",
            width: "45%",
            backgroundColor: isActive ? "#c0c0c0" : "whitw",
            color: !isActive ? "#c0c0c0" : "white",
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
            width: "45%",
            textDecoration: "none",
            padding: 20,
            backgroundColor: isActive ? "#c0c0c0" : "white",
            color: !isActive ? "#c0c0c0" : "white",
          };
        }}
        to="/collections"
      >
        COLLECTIONS
      </NavLink>
      <NavLink
        to="/"
        style={{
          display: "block",
          width: "10%",
          textDecoration: "none",
          padding: 20,
          borderLeft: '1px solid #ddd' 
        }}
      >
        sign out
      </NavLink>
    </div>
  );
};
