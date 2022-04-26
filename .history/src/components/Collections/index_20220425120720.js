import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./styles.scss";
import { NavPanel } from "../NavPanel";

export const Collections = () => {  
  const [data, setData] = React.useState([]);
  const [view, setView] = React.useState(false);
  const [editCollection, setEditCollection] = React.useState("");
  const [verifield, setVerifield] = React.useState("");
  const [blocking, setBlocking] = React.useState("");
  let navigate = useNavigate();
  const name = localStorage.getItem("name");
  React.useEffect(() => {
    name
      ? axios.get(`https://app.nftillion.io/nft/collections`,
      {headers:{
        Authorization : `Bearer ${localStorage.getItem("accessToken")}`}})
        .then((res) => {
          console.log(res.data);
          setData(res.data);
        })
      : navigate("/");
  }, [name, navigate]);
  function setViewOne(a) {
    setView(true);
    setEditCollection(a);
    setVerifield(true);
  }
  function Save() {
    axios.post(`https://jsonplaceholder.typicode.com/users`).then((res) => {
      console.log(res.data);
    });
  }
  return (
    <>
     <NavPanel />
      <h1 className="header">        
        List of Collections
      </h1>
      <div className="mainblockuser">
        <header>
          <span>address</span>
          <span>name</span>
          <span>owner</span>          
          <span>amount NFTs</span>
          
        </header>
        <section>
          {data.map((i) => (
            <p className="data" onClick={()=>setViewOne(i.name)}>
              <span>{i.mintAddress}</span>
              <span>{i.metadata.name}</span>
              <span>{i.author.joined}</span>
              <span>{i.email}</span>
             
             
            </p>
          ))}
        </section>
      </div>
      <div className={view ? "right_block_view" : "right_block_hide"}>
          <h3 className="header_edit">Edit Collection</h3>
          {data
            .filter((i) => i.id === editCollection)
            .map((i) => (
              <div className="data_edit">
                <span>{i.id}</span>
                <span>{i.created}</span>
                <span>{i.author.joined}</span>
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
    </>
  );
};
