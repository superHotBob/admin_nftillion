import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./styles.scss";

import { NavPanel } from "../NavPanel";

export const Users = () => {
  let navigate = useNavigate();
  const name = localStorage.getItem("name")
  const [data, setData] = React.useState([]);
//   React.useLayoutEffect(() =>{
//     console.log(name);
//      name ? "" : navigate("/")},
//   );
  React.useEffect(() => {
    name ? 
    axios.get(`https://jsonplaceholder.typicode.com/users`).then((res) => {
      console.log(res.data);
      setData(res.data);
    }):navigate("/") ;
  }, []);

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
            <p className="data">
              <span>{i.id}</span>
              <span>{i.name}</span>
              <span>{i.username}</span>
              <span>{i.email}</span>
              <span>{i.phone}</span>
            </p>
          ))}
        </section>
      </div>
    </>
  );
};
