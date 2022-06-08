import * as React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


import { NavPanel } from "../NavPanel";
import FirstString from "../FirstString";

export const Promo = () => {
  const [nft, setNft] = React.useState([]);
  const [page, setPage] = React.useState(1);

 

  
  let navigate = useNavigate();
  const name = localStorage.getItem("accessToken");
  React.useEffect(() => {
    name
      ? axios
          .get(`https://app.nftrealworld.io/admin/itemsWithPromo?page=${page}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          })
          .then((res) => {
            setNft(res.data.items.filter(i=>i.promoData !=="null"));            
            
          })
      : navigate("/");
  }, [name, navigate, page]);

  function setPromo(a, b) {    
    axios
      .put(
        `https://app.nftrealworld.io/admin/item/update/${b}`,
        { promoData: a ? a : null },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        console.log("dfg", a);
      });
  }

  return (
    <>
      <NavPanel />
      <FirstString text="Promo Nft " />
      <div className="page_search">
       
       
        {page - 1 ? (
          <b
            title="prev page"
            className="pagers prev"
            onClick={() => setPage(page - 1)}
          >
            prev
          </b>
        ) : null}
        <b
          title="next page"
          className="pagers next"
          onClick={() => setPage(page + 1)}
        >
          next
        </b>
      </div>     
      <div className="main_promo" style={{ height: "auto" }}>
        <header className="header_categories">
          <span style={{ width: "8%" }}>id</span>
          <span style={{ width: "20%" }}>name</span>
          <span>collection id</span>
          <span>created</span>
          <span className="last_image">image</span>
          <span>Promo</span>
        </header>
       
        <section className="data_categories" style={{ height: "auto", position: 'rela' }}>
       
          {nft.map((i) => (
            <p className="data mobile editable">
              <span style={{ width: "8%" }}>{i.id}</span>
              <span style={{ width: "20%" }}>{i.metadata.name}</span>
              <span>{i.collection}</span>
              <span>{new Date(i.created).toLocaleString()}</span>
              <Link
                to="/createnft"
                state={{
                  id: i.id,
                  collection: i.collection,
                  metadata: i.metadata,
                }}
                className="image"
                style={{
                  backgroundImage: `url(${i.metadata.image})`,
                  width: "15%",
                }}
              />

              <span>
                <select onChange = {e => setPromo(e.target.value, i.id) }
                  defaultValue={i.promoData}
                >
                  <option value="">none</option>
                  <option value="mainPage">Main page</option>
                </select>
              </span>
            </p>
          ))}
        </section>
      </div>
    </>
  );
};
