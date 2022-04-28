import * as React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { NavPanel } from "../NavPanel";

export const Preminted = () => {
  const [data, setData] = React.useState([]);
  let navigate = useNavigate();
  const name = localStorage.getItem("accessToken");
  React.useEffect(() => {
    name
      ? axios
          .get("https://app.nftillion.io/admin/categories", {
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

  return (
    <>
      <NavPanel />
      <div className="main_preminted">
        <h1>
          <span>List collections</span>{" "}
          <Link to="/createcollection">
            <b>create new</b>
          </Link>
        </h1>
        <div className="mainblockuser">
        <header>
          <span style={{width: '5%'}}>id</span>
          <span>name</span>
          <span>created</span>
          <span>image</span>
          
        </header>
        <section>
          {data.map((i) => (
            <p className="data">
              <span style={{width: '5%'}}>{i.id}</span>
              <span>{i.name}</span>
              <span>{new Date(i.created).toLocaleString()}</span>
              <span style={{background: `url(${i.image}) center /100 % no-repeat`}}/>             
            </p>
          ))}
        </section>
      </div>
      </div>
    </>
  );
};
