import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./styles.scss";

import { NavPanel } from "../NavPanel";

export const Users = () => {
  let navigate = useNavigate();
  const name = localStorage.getItem("accessToken");
  const [data, setData] = React.useState([]);
  const [view, setView] = React.useState(false);
  const [cause, setCause] = React.useState("");
  // const [verifield, setVerifield] = React.useState("");
  // const [blocking, setBlocking] = React.useState("");

  function Save() {}

  function SetVerified(a, b) {
    let my_data = data.map((i) => (i.id === b ? { ...i, isVerified: a } : i));
    setData(my_data);
    console.log(my_data);
    axios
      .post(
        "https://app.nftillion.io/admin/verify",
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
    setView(a);
    // axios
    //   .post(
    //     "https://app.nftillion.io/admin/block",
    //     {
    //       id: b,
    //       blocked: a,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     console.log(res.data);
    //   });
  }
  React.useEffect(() => {
    name
      ? axios
          .get(`https://app.nftillion.io/admin/users`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          })
          .then((res) => {
            console.log(res.data);
            console.log(
              res.data.map(
                (i) => (i.created = new Date(i.created).toLocaleString())
              )
            );
            setData(res.data);
          })
      : navigate("/");
  }, [name, navigate]);

  return (
    <>
      <NavPanel />
      <h1 className="header">List of users</h1>
      <div className="mainblockuser">
        <header>
          <span>wallet</span>
          <span>date registration</span>
          <span>date last Authorization</span>
          <span>count collections</span>
          <span>count NFTs</span>
          <span>Verified</span>
          <span>Blocked</span>
        </header>
        <section>
          {data.map((i, index) => (
            <p className="data">
              <span>{i.id}</span>
              <span>{new Date(i.wallet.created).toLocaleString()}</span>
              <span>{new Date(i.joined).toLocaleString()}</span>
              <span>{i.count}</span>
              <span>{i.items}</span>
              <label>
                <input
                  type="checkbox"
                  checked={i.isVerified}
                  onChange={() => SetVerified(!i.isVerified, i.id)}
                />
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={i.isBlocked}
                  onChange={() => SetBlocked(!i.isBlocked, i.id)}
                />
              </label>
            </p>
          ))}
        </section>
        <div className={view ? "block_view" : "block_hide"}>         
          <div className="data_edit">
            <p>
              <b>Enter cause blocked</b>
              <textarea
              type="textaria"
                rows="10" cols="45"
                value={cause}
                onChange={(e) => setCause(e.target.value)}
              />
            </p>
          </div>

          <p className="block_button">
            <button onClick={() => setView(false)}>Cancel</button>
            <button onClick={Save}>Save</button>
          </p>
        </div>
      </div>
    </>
  );
};
