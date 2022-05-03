import "./styles.scss";
import { NavLink } from "react-router-dom";
export const NavPanel = () => {
  return (
    <div className="mainNavBlock">
      <NavLink to="/users">Users</NavLink>
      <div className="second_link mobileNo">
        <NavLink to="/collections">Collections</NavLink>
        <NavLink to="/categories">Categories</NavLink>
        <NavLink to="/premintedcollections">Preminted Collections</NavLink>
        <img
          src="/man.svg"
          className="mobileNo"
          width={50}
          height={50}
          alt="profile"
        />
        <NavLink to="/">
          <span className="mobileNo">Sign out</span>
        </NavLink>
       
      </div>
      <img src='/menu-icon.svg' className="mobileYes" alt='cxc'  width={40}
          height={40}/>
    </div>
  );
};
