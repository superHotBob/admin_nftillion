import "./styles.scss";
import { NavLink } from "react-router-dom";
export const NavPanel = () => {
  return (
    <div className="mainNavBlock">
      <NavLink to="/users">USERS</NavLink>
      <NavLink to="/collections">COLLECTIONS</NavLink>
      <NavLink to="/categories">CATEGORIES</NavLink>
      <NavLink to="/premintedcollections">PREMINTED COLLECTIONS</NavLink>
      <img
        src="/profile.png"
        className="mobileNo"
        width={80}
        height={70}
        alt="profile"
      />
      <NavLink to="/">
        <span className="mobileNo">sign out</span>
      </NavLink>
    </div>
  );
};
