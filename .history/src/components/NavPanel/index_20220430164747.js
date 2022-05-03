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
           
            backgroundColor: 'linear-gradient(0deg, rgba(29, 0, 126, 0.87), rgba(29, 0, 126, 0.87)), linear-gradient(180deg, #312293 0%, rgba(177, 70, 193, 0) 100%)'
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
            
           
          };
        }}
        to="/collections"
      >
        COLLECTIONS
      </NavLink>
      <NavLink
        
        to="/categories"
      >
        CATEGORIES
      </NavLink>
      <NavLink
       
        to="/premintedcollections"
      >
        PREMINTED COLLECTIONS
      </NavLink>
      <img src='/profile.png' className="mobileNo" width={80} height={70} alt="profile" />
      <NavLink
        to="/"
        style={{
          display: "block",        
               
          color: '#000',
          borderLeft: '1px solid #ddd' 
        }}
      >
        <span className="mobileNo">sign out</span>
      </NavLink>
    </div>
  );
};
