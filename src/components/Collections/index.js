import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import search from "../../image/search.svg";
import "./styles.scss";
import { NavPanel } from "../NavPanel";
import FirstString from "../FirstString";

export const Collections = () => {
  const [data, setData] = React.useState([]);

  const [view, setView] = React.useState(false);
  const [cause, setCause] = React.useState("");
  const [id, setId] = React.useState("");
  const [blocked, setBlocked] = React.useState();
  const [page, setPage] = React.useState(1);

  function CancelBlocked() {
    setView(false);
    let my_data = data.map((i) =>
      i.id === id ? { ...i, isBlocked: false } : i
    );
    setData(my_data);
    setCause("");
  }

  function Save(a, b) {
    console.log("type", a, b);
    setCause("");
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
  let navigate = useNavigate();
  const name = localStorage.getItem("accessToken");
  React.useEffect(() => {
    name
      ? axios
          .get(`https://app.nftrealworld.io/admin/collections?fromAdmin=false&page=${page}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          })
          .then((res) => {
            console.log(res.data.collections);
            setData(res.data.collections);
          })
      : navigate("/");
  }, [name, navigate,page]);
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

  function SetBlocked(a, b) {
    let my_data = data.map((i) => (i.id === b ? { ...i, isBlocked: a } : i));
    setData(my_data);
    setBlocked(a);
    setId(b);
    console.log(my_data);
    !a ? Save(b, a) : setView(a);
  }
  function Search(e) {
    if (e.target.value) {
      axios
        .get(
          `https://app.nftrealworld.io/admin/collections?fromAdmin=false&search=${e.target.value}&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((res) => {
          setData(res.data.collections);
        });
    } else {
      axios
        .get(`https://app.nftrealworld.io/admin/collections?fromAdmin=false&page=${page}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          setData(res.data.collections);
        });
    }
  }
  return (
    <>
      <NavPanel />
      <FirstString text="List of Collections" />
      <div className="page_search">
      <input type="search" placeholder="enter for search" onChange={Search} />
        <img
          src={search}
          width="25"
          alt="search"
          height="25"
          className="image"
        />
      {page - 1 ? (
            <b
              title="prev page"
              className="pagers prev"
              onClick={() => setPage(page - 1)}
            >
              prev
            </b>
          ): null}
          <b
            title="next page"
            className="pagers next"
            onClick={() => setPage(page + 1)}
          >
            next
          </b>
      </div>
      <div className="main_categories">      
        <header>
          <span>address</span>
          <span>name</span>
          <span>owner</span>
          <span>amount NFTs</span>
          <span>Verified</span>
          <span>Blocked</span>
        </header>
        <section>
       
          {data.map((i) => (
            <p className="data" key={i.id}>
              <span>
                {i.author.wallet.address.slice(0, 8)}
                <strong>...</strong>
                {i.author.wallet.address.slice(40, 100)}
              </span>
              <span>{i.metadata.name}</span>
              <span>{new Date(i.author.joined).toLocaleString()}</span>
              <span>{i.items.length}</span>
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
