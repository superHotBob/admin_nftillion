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
  const [cause, setCause] = React.useState('');
  const [id, setId] = React.useState('');
  const [blocked, setBlocked] = React.useState();

  function CancelBlocked() {
    setView(false);
    let my_data = data.map((i) => (i.id === id ? { ...i, isBlocked: false } : i));
    setData(my_data);
    setCause('');
  }

  function Save() {
      console.log(blocked)
      setView(false)
    axios
      .post(
        "https://app.nftillion.io/admin/user/block",
        {
          id: id,
          isblocked: blocked,
          cause: cause
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

  function SetVerified(a, b) {
    let my_data = data.map((i) => (i.id === b ? { ...i, isVerified: a } : i));
    setData(my_data);
    console.log(my_data);
    axios
      .post(
        "https://app.nftillion.io/admin/user/verify",
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
    setBlocked(a);
    setId(b);
    console.log(my_data);
    !a ? Save() : setView(a);
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
          <span style={{width: '20%'}}>wallet</span>
          <span>date registration</span>
          <span>date last Authorization</span>
          <span>count collections</span>
          <span style={{width: '5%'}}>count NFTs</span>
          <span style={{width: '5%'}}>Verified</span>
          <span style={{width: '5%'}}>Blocked</span>
        </header>
        <section>
          {data.map((i, index) => (
            <p className="data" key={i.id}>
              <span style={{width: '20%',fontSize: 16}}>{i.wallet.address}</span>
              <span>{new Date(i.wallet.created).toLocaleString()}</span>
              <span>{new Date(i.joined).toLocaleString()}</span>
              <span>{i.count}</span>
              <span style={{width: '5%'}}>{i.items}</span>
              <label style={{width: '5%'}}>
                <input
                  type="checkbox"
                  checked={i.isVerified}                 
                  onChange={() => SetVerified(!i.isVerified, i.id)}
                />
              </label>
              <label style={{width: '5%'}}>
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
                type="textarea"
                rows="10"
                cols="45"
                value={cause}
                onChange={(e) => setCause(e.target.value)}
              />
            </p>
          </div>

          <p className="block_button">
            <button onClick={CancelBlocked}>Cancel</button>
            <button onClick={Save}>Save</button>
          </p>
        </div>
      </div>
    </>
  );
};
