import "./styles.scss";
import { NavLink } from "react-router-dom";
export const NavPanel = () => {
  return (
    <div className="mainNavBlock">
      <NavLink to="/users">Users</NavLink>
      <div className="second_link">
        <NavLink to="/collections">COLLECTIONS</NavLink>
        <NavLink to="/categories">CATEGORIES</NavLink>
        <NavLink to="/premintedcollections">PREMINTED COLLECTIONS</NavLink>
        <img
          src="/man.svg"
          className="mobileNo"
          width={50}
          height={50}
          alt="profile"
        />
        <NavLink to="/">
          <span className="mobileNo">sign out</span>
        </NavLink>
      </div>
    </div>
  );
};
