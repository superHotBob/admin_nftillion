import "./styles.scss";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";


export const NavPanel = () => {
   const [balance, setBalance] = useState('');
   const [transfer, setTransfer] = useState(false);
   const [address, setAddress] = useState('');
   const [amount, setAmount] = useState('');
   const [message, setMessage] = useState('');

  React.useEffect(()=>{
    setAddress('');
    setAmount('');
    setMessage('');
  },[transfer]) 

  React.useEffect(() => {
 
      axios
          .get(
            'https://app.nftillion.io/admin/balance',
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          )
          .then((res) => {
            setBalance(res.data.balance/1000000000)
           console.log(res.data.balance);
          });
         
        },[])
        
     function Transfer() {
        setMessage('await end transfer');
        axios
          .post(
            'https://app.nftillion.io/admin/payment',
            {
         
              address: address,
              amount: amount,
            },           
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          )
          .then((res) => {
            if(res.status === 201) {setMessage('transfer successful')} 
           console.log(res);
          })
          .catch(err=> setMessage('transfer fail') );

     } ;  
  const [view, setView] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <div className="mainNavBlock">
        <NavLink
          to="/users"
          className="users"
          style={({ isActive }) => {
            return {
              borderRadius: "10px",
              background: isActive
                ? "linear-gradient(214.02deg, #B75CFF 6.04%, #6205FA 92.95%)"
                : "inherrit",
            };
          }}
        >
          Users
        </NavLink>
        <div className="second_link mobileNo">
          <NavLink
            to="/nft"
            style={({ isActive }) => {
              return {
                borderRadius: "10px",
                background: isActive
                  ? "linear-gradient(214.02deg, #B75CFF 6.04%, #6205FA 92.95%)"
                  : "",
              };
            }}
          >
            NFT
          </NavLink>
          <NavLink
            to="/nftadmin"
            style={({ isActive }) => {
              return {
                borderRadius: "10px",
                background: isActive
                  ? "linear-gradient(214.02deg, #B75CFF 6.04%, #6205FA 92.95%)"
                  : "",
              };
            }}
          >
            NFT ADMIN
          </NavLink>
          <NavLink
            to="/promonft"
            style={({ isActive }) => {
              return {
                borderRadius: "10px",
                background: isActive
                  ? "linear-gradient(214.02deg, #B75CFF 6.04%, #6205FA 92.95%)"
                  : "",
              };
            }}
          >
            Promo
          </NavLink>
          <NavLink
            to="/collections"
            style={({ isActive }) => {
              return {
                borderRadius: "10px",
                background: isActive
                  ? "linear-gradient(214.02deg, #B75CFF 6.04%, #6205FA 92.95%)"
                  : "",
              };
            }}
          >
            Collections
          </NavLink>         
          <NavLink
            to="/categories"
            style={({ isActive }) => {
              return {
                borderRadius: "10px",

                background: isActive
                  ? "linear-gradient(214.02deg, #B75CFF 6.04%, #6205FA 92.95%)"
                  : "inherrit",
              };
            }}
          >
            Categories
          </NavLink>
          <NavLink
            to="/premintedcollections"
            style={({ isActive }) => {
              return {
                borderRadius: "10px",

                background: isActive
                  ? "linear-gradient(214.02deg, #B75CFF 6.04%, #6205FA 92.95%)"
                  : "inherrit",
              };
            }}
          >
            Preminted Collections
          </NavLink>
          <div className="wallet">
          <img
            src="/man.svg"
            className="mobileNo"
            width={40}
            height={40}
            alt="profile"
           
          />
            balance : {balance} sol
            <p className="transfer" onClick={()=>setTransfer(true)}>Transfer</p>
          </div>
         
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
          onClick={() => setView(!view)}
        />
        {transfer && <div className="sendSol" >
        <b className="close" onClick={() => setTransfer(false)}>
                {" \u26d2 "}
              </b>

        {message ? <h1>{message} </h1>: <><span>Address</span>
        <input type="text" value={address} name='address' onChange={(e)=>setAddress(e.target.value)}/>
        <span>Amount</span>
        <input type="text" value={amount} name='amount' onChange={(e)=>setAmount(e.target.value)}/>
        <button onClick={Transfer}>Transfer</button>
        </>}
        </div>}
      </div>
    
      {view && (
        <div className="mobile_menu mobileYes">
          <NavLink to="/nft">Nft</NavLink>
          <NavLink to="/nftadmin">Nft Admin</NavLink>
          <NavLink to="/promonft">Promo</NavLink> 
          <NavLink to="/collections">Collections</NavLink>
          <NavLink to="/categories">Categories</NavLink>
          <NavLink to="/premintedcollections">Preminted Collections</NavLink>
          <NavLink to="/">Sign out </NavLink>
        </div>
      )}
    </div>
  );
};
