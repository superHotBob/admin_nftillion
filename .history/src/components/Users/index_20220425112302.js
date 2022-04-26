import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./styles.scss";

import { NavPanel } from "../NavPanel";

export const Users = () => {
  let navigate = useNavigate();
  const name = localStorage.getItem("name");
  const [data, setData] = React.useState([]);
  const [view, setView] = React.useState(false);
  const [editUser, setEditUser] = React.useState("");
  const [verifield, setVerifield] = React.useState("");
  const [blocking, setBlocking] = React.useState("");

  function setViewOne(a) {
    setView(true);
    setEditUser(a);
    setVerifield(true);
  }
  function Save() {
    axios.post(`https://jsonplaceholder.typicode.com/users`).then((res) => {
      console.log(res.data);
    });
  }
  React.useEffect(() => {
    name
      ? axios.get(`https://app.nftillion.io/admin/users`).then((res) => {
          console.log(res.data);
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
          <span>date reg.</span>
          <span>date last auth</span>
          <span>count collections</span>
          <span>count NFTs</span>
        </header>
        <section>
          {data.map((i) => (
            <p className="data" onClick={() => setViewOne(i.name)}>
              <span>{i.id}</span>
              <span>{i.name}</span>
              <span>{i.username}</span>
              <span>{i.email}</span>
              <span>{i.phone}</span>
            </p>
          ))}
        </section>
        <div className={view ? "right_block_view" : "right_block_hide"}>
          <h3 className="header_edit">Edit user</h3>
          {data
            .filter((i) => i.name === editUser)
            .map((i) => (
              <div className="data_edit">
                <span>{i.id}</span>
                <span>{i.name}</span>
                <span>{i.email}</span>
                <span>{i.phone}</span>
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
        </div>
      </div>
    </>
  );
};
