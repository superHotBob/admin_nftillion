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
      <h1 className="header">List of Collections</h1>
      <div className="mainblockuser">
        <header>
          <span style={{width: '20%'}}>address</span>
          <span>name</span>
          <span>owner</span>
          <span>amount NFTs</span>
          <span style={{width: '10%'}}>Verified</span>
          <span style={{width: '10%'}}>Blocked</span>
        </header>
        <section>
          {data.map((i) => (
            <p className="data">
              <span style={{width: '20%'}}>{i.mintAddress}</span>
              <span>{i.metadata.name}</span>
              <span>{new Date(i.author.joined).toLocaleString()}</span>
              <span>{i.amount}</span>
              <label style={{width: '10%'}}>
                <input
                  type="checkbox"
                  checked={i.isVerified}
                  onChange={() => SetVerified(!i.isVerified, i.id)}
                />
              </label>
              <label style={{width: '10%'}}>
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
      {/* <div className={view ? "right_block_view" : "right_block_hide"}>
          <h3 className="header_edit">Edit Collection</h3>
          {data
            .filter((i) => i.id === editCollection)
            .map((i) => (
              <div className="data_edit">
               <span>{i.mintAddress}</span>
              <span>{i.metadata.name}</span>
              <span>{i.author.joined}</span>
              <span>{i.email}</span>
                <p>
                  <b>Verifield</b>
                  <input
                    type="checkbox"
                    checked={verifield}
                    onChange={(e) => setVerifield(!verifield)}
                  />
                </p>
                <p>
                  <b>Bloking</b>
                  <input
                    type="checkbox"
                    checked={blocking}
                    onChange={(e) => setBlocking(!blocking)}
                  />
                </p>                
              </div>
            ))}
          <p className="block_button">
            <button onClick={() => setView(false)}>Cancel</button>
            <button onClick={Save}>Save</button>
          </p>
        </div> */}
    </>
  );
};
