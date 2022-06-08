import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./styles.scss";

import { NavPanel } from "../NavPanel";
import FirstString from "../FirstString";

export const Users = () => {
  let navigate = useNavigate();
  const name = localStorage.getItem("accessToken");
  const [data, setData] = React.useState([]);
  const [view, setView] = React.useState(false);
  const [cause, setCause] = React.useState("");
  const [id, setId] = React.useState("");
  const [blocked, setBlocked] = React.useState();
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);

  function CancelBlocked() {
    setView(false);
    let my_data = data.map((i) =>
      i.id === id ? { ...i, isBlocked: false } : i
    );
    setData(my_data);
    setCause("");
  }

  function WriteToClipboard(a) {
    navigator.clipboard.writeText(a);
  }

  function Save(a, b) {
    console.log("type", a, b);
    setView(false);
    axios
      .post(
        "https://app.nftrealworld.io/admin/user/block",
        {
          id: a,
          isBlocked: b,
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
    let my_data = data.map((i) => (i.id === b ? { ...i, isVerified: a } : i));
    setData(my_data);
    console.log(my_data);
    axios
      .post(
        "https://app.nftrealworld.io/admin/user/verify",
        {
          id: b,
          verified: a,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {});
  }
  function SetBlocked(a, b) {
    let my_data = data.map((i) => (i.id === b ? { ...i, isBlocked: a } : i));
    setData(my_data);
    setBlocked(a);
    setId(b);
    !a ? Save(b, a) : setView(a);
  }
  React.useEffect(() => {
    name
      ? axios
          .get(`https://app.nftrealworld.io/admin/users?page=${page}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          })
          .then((res) => {
            setTotal(res.data.total);
            setData(res.data.users);
          })
      : navigate("/");
  }, [name, navigate, page]);

  return (
    <>
      <NavPanel />
      <FirstString text="List of users" title={`Total users: ${total}`} />
      <div className="page_search">
        {/* <input type="search" placeholder="enter id for search" /> */}
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
      <div className="main_users">
        <header>
          <span style={{ width: "18%" }}>Wallet</span>
          <span>Date registration</span>
          <span>Date last authorization</span>
          <span>Count collections</span>
          <span>Count NFTs</span>
          <span>Verified</span>
          <span>Blocked</span>
        </header>
        <section>
          {data.map((i) => (
            <div className="data" key={i.id}>
              <span onClick={() => WriteToClipboard(i.wallet.address)} style={{width: '18%'}}>
                {i.wallet.address.slice(0, 8)}
                <strong>...</strong>
                {i.wallet.address.slice(41, 100)}
                <img
                  src="/copy.png"
                  title="copy address"
                  width={30}
                  height={20}
                  alt="copy"
                />
              </span>
              <span>{new Date(i.wallet.created).toLocaleString()}</span>
              <span>{new Date(i.joined).toLocaleString()}</span>
              <span>{i.count}</span>
              <span className="count">{i.items}</span>
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
      </div>
    </>
  );
};
