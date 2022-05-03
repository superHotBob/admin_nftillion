import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./styles.scss";
import { NavPanel } from "../NavPanel";

export const Collections = () => {
  const [data, setData] = React.useState([]);
  //   const [view, setView] = React.useState(false);
  //   const [editCollection, setEditCollection] = React.useState("");
  //   const [verifield, setVerifield] = React.useState("");
  //   const [blocking, setBlocking] = React.useState("");
  let navigate = useNavigate();
  const name = localStorage.getItem("accessToken");
  React.useEffect(() => {
    name
      ? axios
          .get('https://app.nftillion.io/admin/collections', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          })
          .then((res) => {
            console.log(res.data);
            setData(res.data);
          })
      : navigate("/");
  }, [name, navigate]);
  function SetVerified(a, b) {
    let my_data = data.map((i) => (i.id === b ? { ...i, isVerified: a } : i));
    setData(my_data);
    console.log(my_data);
    axios
      .post(
        "https://app.nftillion.io/admin/collection/verify",
        {
          id: b,
          verified: a,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      });
  }

  function SetBlocked(a, b) {
    let my_data = data.map((i) => (i.id === b ? { ...i, isBlocked: a } : i));
    setData(my_data);
    console.log(my_data);
    axios
      .post(
        "https://app.nftillion.io/admin/collection/block",
        {
          id: b,
          blocked: a,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      });
  }
  return (
    <>
      <NavPanel />
      <h1 className="header_users">List of Collections</h1>
      <div className="main_categories">
        <header>
          <span >address</span>
          <span>name</span>
          <span>owner</span>
          <span>amount NFTs</span>
          <span >Verified</span>
          <span >Blocked</span>
        </header>
        <section>
          {data.map((i) => (
            <p className="data">
              <span>
              {i.author.wallet.address.slice(0,8)}<strong>...</strong>{i.author.wallet.address.slice(40,100)}</span>
              <span>{i.metadata.name}</span>
              <span>{new Date(i.author.joined).toLocaleString()}</span>
              <span>{i.amount}</span>
              <label >
                <input
                  type="checkbox"
                  checked={i.isVerified}                 
                  onChange={() => SetVerified(!i.isVerified, i.id)}
                />
              </label>
              <label >
                <input
                  type="checkbox"
                  checked={i.isBlocked}
                  onChange={() => SetBlocked(!i.isBlocked, i.id)}
                />
              </label>
            </p>
          ))}
        </section>
      </div>     
    </>
  );
};
