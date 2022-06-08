import * as React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import search from "../../image/search.svg";
import { useNavigate } from "react-router-dom";
import { NavPanel } from "../NavPanel";
import FirstString from "../FirstString";

export const NftAdmin = () => {
  const [nft, setNft] = React.useState([]);
  const [view, setView] = React.useState(false);
  const [cause, setCause] = React.useState("");
  const [id, setId] = React.useState("");
  const [blocked, setBlocked] = React.useState();
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [collection, setCollection] = React.useState();
  const [fiterCollection, setFilterCollection] = React.useState('');

  function CancelBlocked() {
    setView(false);
    let my_data = nft.map((i) =>
      i.id === id ? { ...i, isBlocked: false } : i
    );
    setNft(my_data);
    setCause("");
  }

  function Save(a, b) {
    console.log("type", a, b);
    setView(false);
    axios
      .post(
        `https://app.nftrealworld.io/admin/item/block/${a}`,
        {
          blocked: b,
          cause: cause,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {});
  }

  function SetVerified(a, b) {
    let form = new FormData();
    form.append("status", Number(a));
    let my_data = nft.map((i) => (i.id === b ? { ...i, isVerified: a } : i));
    setNft(my_data);
    axios
      .put(
        `https://app.nftrealworld.io/admin/item/update/${b}`,
        { isVerified: a },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {});
  }
  let navigate = useNavigate();
  const name = localStorage.getItem("accessToken");
  React.useEffect(
    (i) => {
      axios
        .get("https://app.nftrealworld.io/admin/collections/fromAdmin", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          console.log(
            res.data.collections
              .map((i) => [{ id: i.id, name: i.metadata.name }])
              .flat()
          );
          setCollection(
            res.data.collections
              .map((i) => [{ id: i.id, name: i.metadata.name }])
              .flat()
          );
        });
    },
    [page]
  );
  React.useEffect(() => {
    name
      ? axios
          .get(
            `https://app.nftrealworld.io/admin/items/fromAdmin?collection=${fiterCollection}&page=${page}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          )
          .then((res) => {
            setNft(res.data.items);
            setTotal(res.data.total);
          })
      : navigate("/");

    axios
      .get("https://app.nftrealworld.io/admin/itemsWithPromo", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {});
  }, [name, navigate, page,fiterCollection]);
  function SetBlocked(a, b) {
    let my_data = nft.map((i) => (i.id === b ? { ...i, isBlocked: a } : i));
    setNft(my_data);
    setBlocked(a);
    setId(b);
    !a ? Save(b, a) : setView(a);
  }
 
  function Search(e) {
    if (e.target.value) {
      axios
        .get(`https://app.nftrealworld.io/admin/items/fromAdmin?search=${e.target.value}&page=${page}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          setNft(res.data.items);
        });
    } else {
      axios
        .get(
          `https://app.nftrealworld.io/admin/items/fromAdmin?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((res) => {
          setNft(res.data.items);
        });
    }
  }
  return (
    <>
      <NavPanel />
      <FirstString
        text="Nft ADMIN "
        link="/createnft"
        title={`Total NFT: ${total}`}
      />
      <div className="page_search">
        <input type="search" onChange={Search}  placeholder="enter for search"/> 
        <img
          src={search}
          width="25"
          alt="search"
          height="25"
          className="image"
        /> 
        
        {collection && <label>
        collection:
        <select defaultValue='all' onChange={(e)=>setFilterCollection(e.target.value)}>
          <option value="">All</option>
          <option value="single">Single</option>
          {collection.map(i=><option value={i.id}>{i.name}</option>)}
        </select>
        </label>}
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
      <div className="main_nft">
        <header className="header_categories">
          <span style={{ width: "8%" }}>Id</span>
          <span style={{ width: "20%" }}>Name</span>
          <span>Collection</span>
          <span>Created</span>
          <span className="last_image">Image</span>
          <span>Verified</span>
          <span>Blocked</span>
        </header>

        <section className="data_categories">
          {nft && collection  && (
            <>
              {nft.map((i) => (
                <p className="data mobile editable" key={i.id}>
                  <span style={{ width: "8%" }}>{i.id}</span>
                  <span style={{ width: "20%" }}>{i.metadata.name}</span>
                  <span>
                    {collection.filter((n) => n.id === i.collection)[0]
                      ? collection.filter((n) => n.id === i.collection)[0].name
                      : ''}
                  </span>
                  <span>{new Date(i.created).toLocaleString()}</span>
                  <Link
                    to="/createnft"
                    title="click for edit"
                    state={{
                      id: i.id,
                      maxSupply: i.maxSupply,
                      collection: i.collection,
                      metadata: i.metadata,
                      promoData: i.promoData,
                      currentPrice: i.currentPrice,
                    }}
                    className="image"
                    style={{
                      backgroundImage: `url(${i.metadata.image})`,
                      width: "15%",
                    }}
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
                </p>
              ))}
            </>
          )}
        </section>
        {view && (
          <div className={view ? "block_view" : "block_hide"}>
            <div className="data_edit">
              <div>
                <b>Enter cause blocked</b>
                <textarea
                  type="textarea"
                  rows="10"
                  cols="45"
                  value={cause}
                  onChange={(e) => setCause(e.target.value)}
                />
              </div>
            </div>
            <div className="block_button">
              <button onClick={CancelBlocked}>Cancel</button>
              <button onClick={() => Save(id, blocked)}>Save</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
