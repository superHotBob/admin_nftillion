import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./styles.scss";
import { NavPanel } from "../NavPanel";

export const Collections = () => {  
  const [data, setData] = React.useState([]);
  let navigate = useNavigate();
  const name = localStorage.getItem("name");
  React.useEffect(() => {
     name ?  
    axios.get(`https://jsonplaceholder.typicode.com/users`).then((res) => {
      console.log(res.data);
      setData(res.data);
    }): navigate('/');
  }, [name,navigate]);

  return (
    <>
     <NavPanel />
      <h1 className="header">        
        List of Collections
      </h1>
      <div className="mainblockuser">
        <header>
          <span>wallet</span>
          <span>date reg.</span>
          <span>date last auth</span>
          <span>amount collections</span>
          <span>amount NFTs</span>
          
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
