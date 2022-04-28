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
            width: "30%",
            backgroundColor: isActive ? "#c0c0c0" : "whitw",
            color: !isActive ? "black" : "white",
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
            width: "30%",
            textDecoration: "none",
            padding: 20,
            backgroundColor: isActive ? "#c0c0c0" : "white",
            color: !isActive ? "black" : "white",
          };
        }}
        to="/collections"
      >
        COLLECTIONS
      </NavLink>
      <NavLink
        style={({ isActive }) => {
          return {
            display: "block",
            width: "30%",
            textDecoration: "none",
            padding: 20,
            backgroundColor: isActive ? "#c0c0c0" : "white",
            color: !isActive ? "black" : "white",
          };
        }}
        to="/preminted"
      >
        PREMINTED COLLECTIONS
      </NavLink>
      <img src='/profile.png' width={80} height={70} alt="profile" />
      <NavLink
        to="/"
        style={{
          display: "block",
          width: "7%",
          textDecoration: "none",
          padding: 20,
          color: '#000',
          borderLeft: '1px solid #ddd' 
        }}
      >
        sign out
      </NavLink>
    </div>
  );
};
