import * as React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { NavPanel } from "../NavPanel";

export const Nft = () => {
  const [data, setData] = React.useState([]);
  let navigate = useNavigate();
  const name = localStorage.getItem("accessToken");
  React.useEffect(() => {
    name
      ? axios
          .get("https://app.nftillion.io/admin/items", {
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
      <h1 className="header_users createNft">
        NFT{" "}
        <Link to="/createnft" className="button" style={{ float: "right" }}>
          Сreate new NFT
        </Link>
      </h1>
      <div className="main_categories">
        <header className="header_categories">
          <span>id</span>
          <span>name</span>
          <span>collection id</span>
          <span>created</span>
          <span className="last_image">image</span>
        </header>
        <section className="data_categories">
          {data.map((i) => (
            <p className="data mobile editable">
              <span>{i.id}</span>
              <span>{i.metadata.name}</span>
              <span>{i.collection}</span>
              <span>{new Date(i.created).toLocaleString()}</span>
              <span
                className="image"
                style={{ backgroundImage: `url(${i.metadata.image})` }}
              />
            </p>
          ))}
        </section>
      </div>
    </>
  );
};
