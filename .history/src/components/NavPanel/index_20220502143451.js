import "./styles.scss";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
export const NavPanel = () => {
  const [view, setView] = useState(false);
  return (
    <div style={{ position: "relative" }}>
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
        <img
          src="/menu-icon.svg"
          className="mobileYes"
          alt="cxc"
          width={40}
          height={40}
          onClick={()=>setView(!view)}
        />
      </div>
      {view &&
      <div className="mobile_menu mobileYes">
        <NavLink to="/collections">Collections</NavLink>
        <NavLink to="/categories">Categories</NavLink>
        <NavLink to="/premintedcollections">Preminted Collections</NavLink>
        <NavLink to="/">Sign out </NavLink>
          
       
      </div>}
    </div>
  );
};
