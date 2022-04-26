import * as React from "react";
import axios from "axios";

import "./styles.scss";
import { NavLink, useParams } from "react-router-dom";

export const Collections = () => {
  let params = useParams();
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);

  return (
    <>
      <nav>
          <NavLink to="/">
              main
          </NavLink>
      </nav>  
      <h1 className="header">
        <b>admin: {params.name}</b>
        List of users
      </h1>
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
