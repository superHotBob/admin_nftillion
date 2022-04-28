import "./styles.scss";
import { NavLink } from "react-router-dom";
export const NavPanel = () => {
  return (
    <div className="mainNavBlock">
      <NavLink
        style={({ isActive }) => {
          return {
            display: "block",
            
            textDecoration: "none",
           
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
           
            textDecoration: "none",
            
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
           
            textDecoration: "none",
           
            backgroundColor: isActive ? "#c0c0c0" : "white",
            color: !isActive ? "black" : "white",
          };
        }}
        to="/preminted"
      >
        PREMINTED COLLECTIONS
      </NavLink>
      <img src='/profile.png' className="mobileNo" width={80} height={70} alt="profile" />
      <NavLink
        to="/"
        style={{
          display: "block",
          width: "10%",
          textDecoration: "none",
         
          color: '#000',
          borderLeft: '1px solid #ddd' 
        }}
      >
        <span className="mobileNo">sign out</span>
      </NavLink>
    </div>
  );
};
