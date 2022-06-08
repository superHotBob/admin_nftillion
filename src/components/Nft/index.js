import * as React from "react";
import "./styles.scss";
import axios from "axios";
import search from "../../image/search.svg";
import { useNavigate } from "react-router-dom";
import { NavPanel } from "../NavPanel";
import FirstString from "../FirstString";

export const Nft = () => {
  const [nft, setNft] = React.useState([]);
  const [view, setView] = React.useState(false);

  const [cause, setCause] = React.useState("");
  const [id, setId] = React.useState("");
  const [blocked, setBlocked] = React.useState();
  const [filterCollection, setFilterCollection] = React.useState("");
  const [my_collection, setCollection] = React.useState();
  const [total, setTotal] = React.useState(0);

  function CancelBlocked() {
    setView(false);
    let my_data = nft.map((i) =>
      i.id === id ? { ...i, isBlocked: false } : i
    );
    setNft(my_data);
    setCause("");
  }

  function Save(a, b) {
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
    let my_data = nft.map((i) => (i.id === b ? { ...i, isVerified: a } : i));
    setNft(my_data);
    let form = new FormData();
    form.append("verified", Number(a));
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

  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    name
      ? axios
          .get(
            `https://app.nftrealworld.io/admin/items?collection=${filterCollection}&page=${page}`,
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
   
  }, [name, navigate, page, filterCollection]);

  function SetBlocked(a, b) {
    let my_data = nft.map((i) => (i.id === b ? { ...i, isBlocked: a } : i));
    setNft(my_data);
    setBlocked(a);
    setId(b);
    console.log(my_data);
    !a ? Save(b, a) : setView(a);
  }
  React.useEffect((i) => {
    axios
      .get('https://app.nftrealworld.io/admin/collections?page=0&take=100', {
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
  }, []);
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
      .then((res) => {});
  }
  function SelectCollection(e) {
    setFilterCollection(e.target.value);
    
  }
  function Search(e) {
    if (e.target.value) {
      axios
        .get(
          `https://app.nftrealworld.io/admin/items?search=${e.target.value}&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((res) => {
          setNft(res.data.items);
        });
    } else {
      axios
        .get(`https://app.nftrealworld.io/admin/items?page=${page}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          setNft(res.data.items);
        });
    }
  }
  return (
    <div>
      <NavPanel />
      <FirstString
        text="NFT"
        title={`Total NFT: ${total}`}       
      />
      <div className="page_search">
        <input type="search" placeholder="enter for search" onChange={Search} />
        <img
          src={search}
          width="25"
          alt="search"
          height="25"
          className="image"
        />
        {my_collection && (
          <label>
            collection:
            <select defaultValue="all" onChange={(e) => SelectCollection(e)}>
              <option value="">All</option>
              <option value="single">Single</option>
              {my_collection.map((i) => (
                <option value={i.id}>{i.name}</option>
              ))}
            </select>
          </label>
        )}
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
          <span>Name</span>
          <span>Collection</span>
          <span>Created</span>
          <span className="last_image">Image</span>
          <span>Verified</span>
          <span>Blocked</span>
          <span>Promo</span>
        </header>
        <section className="data_categories">
          {my_collection && (
            <>
              {nft.map((i) => (
                <div className="data mobile editable" key={i.id}>
                  <span style={{ width: "8%" }}>{i.id}</span>
                  <span>{i.metadata.name}</span>
                  <span onClick={() => setCollection(i.collection)}>
                    {!i.collection
                      ? ""
                      : my_collection.filter(
                          (a) => a.id === Number(i.collection)
                        ).length
                      ? my_collection.filter(
                          (a) => a.id === Number(i.collection)
                        )[0].name
                      : ""}
                  </span>

                  <span>{new Date(i.created).toLocaleString()}</span>
                  <span
                    className="image"
                    style={{ backgroundImage: `url(${i.metadata.image})` }}
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
                  <span>
                    <select
                      onChange={(e) => setPromo(e.target.value, i.id)}
                      defaultValue={i.promoData}
                    >
                      <option value="">none</option>
                      <option value="mainPage">Main page</option>
                    </select>
                  </span>
                </div>
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
    </div>
  );
};
