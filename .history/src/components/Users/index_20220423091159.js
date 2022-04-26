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

  React.useEffect(() => {
    name
      ? axios.get(`https://jsonplaceholder.typicode.com/users`).then((res) => {
          console.log(res.data);
          setData(res.data);
        })
      : navigate("/");
  }, [name,navigate]);

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
            <p className="data" onClick={()=>setView(true)}>
              <span>{i.id}</span>
              <span>{i.name}</span>
              <span>{i.username}</span>
              <span>{i.email}</span>
              <span>{i.phone}</span>
            </p>
          ))}
        </section>
        <div className={view?"right_block_view" : "right_block_hide"}>

        </div>
      </div>
    </>
  );
};
