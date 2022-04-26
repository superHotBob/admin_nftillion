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
  const [editUser, setEditUser] = React.useState('');
  const [newName, setNewName] = React.useState('')

  const setViewOne =(a)=> {
      setView(true);
      setEditUser(a);
      setNewName(data.filter(i=>i.name === a)[0].username)
  }

  React.useEffect(() => {
    name
      ? axios.get(`https://jsonplaceholder.typicode.com/users`).then((res) => {
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
            <p className="data" onClick={()=>setViewOne(i.name)}>
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
            {data.filter(i=>i.name === editUser).map((i) => (
            <p className="data_edit">
              <span>{i.id}</span>
              <span>{i.name}</span>
              <input type="text" value={newName} onChange={(e)=>setNewName(e.target.value)}/>
              <span>{i.email}</span>
              <span>{i.phone}</span>
            </p>
          ))}
          <p className="block_button">
            <button onClick={() => setView(false)}>Cancel</button>
            <button>Save</button>
          </p>
        </div>
      </div>
    </>
  );
};
