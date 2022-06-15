import * as React from "react";
import "./styles.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { NavPanel } from "../NavPanel";
import FirstString from "../FirstString";

export const PremintedCollections = () => {
  const [data, setData] = React.useState([]);
  const [view, setView] = React.useState(false);
  const [cause, setCause] = React.useState("");
  const [id, setId] = React.useState("");
  const [blocked, setBlocked] = React.useState();
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(1);

  function CancelBlocked() {
    setView(false);
    let my_data = data.map((i) =>
      i.id === id ? { ...i, isBlocked: false } : i
    );
    setData(my_data);
    setCause("");
  };

  function Save(a,b) {
    console.log('type', a, b);
    setView(false);
    axios
      .post(
        `https://app.nftrealworld.io/admin/collection/block/${a}`,
        {
         
          isBlocked: b,
          cause: cause,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      });
  }
  function SetVerified(a, b) {
    let my_data = data.map((i) => (i.id === b ? { ...i, isVerified: a } : i));
    setData(my_data);
    console.log(my_data);
    axios
      .post(
        `https://app.nftrealworld.io/admin/collection/verify/${b}`,
        {
         
          isVerified: a,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      });
  }

  let navigate = useNavigate();
  const name = localStorage.getItem("accessToken"); 
  React.useEffect(() => {
    name
      ? axios
          .get(`https://app.nftrealworld.io/admin/collections?fromAdmin=true&page=${page}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          })
          .then((res) => {
            console.log(res.data.collections);
            setData(res.data.collections);
            setTotal(res.data.collections);
          })
      : navigate("/");
  }, [name, navigate,page]);
  function SetBlocked(a, b) {
    let my_data = data.map((i) => (i.id === b ? { ...i, isBlocked: a } : i));
    setData(my_data);
    setBlocked(a);
    setId(b);
    console.log(a,b);
    !a ? Save(b,a) : setView(a);
  }
  return (
    <>
      <NavPanel />      
      <FirstString text="Preminted collections" link="/createcollection" />
      {total > 1 && <div className="page_search">
       
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
      </div>}
      <div className="main_preminted">
        <header className="header_categories header_my">
          <span>id</span>
          <span>name</span>
          <span>created</span>
          <span>image</span>
          <span>Verified</span>
          <span>Blocked</span>
        </header>
        <section className="data_categories">
          {data.map((i) => (
             <div className="data mobile editable">            
                <span>{i.id}</span>
                <span>{i.metadata.name}</span>
                <span>{new Date(i.created).toLocaleString()}</span>
                <Link
                  to="/createcollection"
                  title="edit collection"                 
                  state={{
                    id: i.id,
                    status: i.status,
                    image: i.metadata.image,
                    name: i.metadata.name,
                    description: i.metadata.description,
                    logo: i.logo,
                    banner: i.banner,
                    category: i.category
                  }}
                  className="image"
                  style={{ backgroundImage: `url(${i.metadata.image})`,width:'13%' }}
                />
              
                 
             
               
                 <span>
                <input
                  type="checkbox"
                  checked={i.isVerified}                 
                  onChange={() => SetVerified(!i.isVerified, i.id)}
                />
             </span>
             <span>
                <input
                  type="checkbox"
                  checked={i.isBlocked}
                  onChange={() => SetBlocked(!i.isBlocked, i.id)}
                />
             </span>
              </div>
           
          ))}
        </section>
        <div className={view ? "block_view" : "block_hide"}>
          <div className="data_edit">
            <p>
              <b>Enter cause blocked</b>
              <textarea
                type="textarea"
                rows="10"
                cols="45"
                value={cause}
                onChange={(e) => setCause(e.target.value)}
              />
            </p>
          </div>

          <p className="block_button">
            <button onClick={CancelBlocked}>Cancel</button>
            <button onClick={() => Save(id, blocked)}>Save</button>
          </p>
        </div>
      </div>
    </>
  );
};
