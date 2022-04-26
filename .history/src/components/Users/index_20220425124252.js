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

  console.log(new Date('2022-03-23T08:11:11.824Z'))

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
      ? axios.get(`https://app.nftillion.io/admin/users`,
      {headers:{
        Authorization : `Bearer ${localStorage.getItem("accessToken")}`}})
        .then((res) => {
          console.log(res.data);
          console.log(res.data.map((index,i)=>res.data[index].wallet.created = new Date(i.wallet.created)))
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
        </header>
        <section>
          {data.map((i) => (
            <p className="data" onClick={() => setViewOne(i.id)}>
              <span>{i.id}</span>
              <span>{i.wallet.created}</span>
              <span>{i.joined}</span>
              <span>{i.count}</span>
              <span>{i.items}</span>             
            </p>
          ))}
        </section>
        <div className={view ? "right_block_view" : "right_block_hide"}>
          <h3 className="header_edit">Edit user</h3>
          {data
            .filter((i) => i.id === editUser)
            .map((i) => (
              <div className="data_edit">
                <span>{i.id}</span>
                <span>{i.wallet.created}</span>
                <span>{i.joined}</span>
                <span>{i.item}</span>
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