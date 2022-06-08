import * as React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { NavPanel } from "../NavPanel";
import FirstString from "../FirstString";

export const Categories = () => {
  const [data, setData] = React.useState([]);
  let navigate = useNavigate();
  const name = localStorage.getItem("accessToken");
  React.useEffect(() => {
    name
      ? axios
          .get("https://app.nftrealworld.io/admin/categories", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          })
          .then((res) => {
            console.log(res.data.categories);
            setData(res.data.categories);
          })
      : navigate("/");
  }, [name, navigate]);

  return (
    <>
      <NavPanel />
      <FirstString text="Categories" link="/createcategory" />
      
      <div className="main_categories">
        <header className="header_categories">
          <span style={{ width: "10%" }}>id</span>
          <span>name</span>
          <span>created</span>
          <span className="last_image">image</span>
        </header>
        <section className="data_categories">
          {data.map((i) => (
            <Link
              to="/createcategory"
              state={{ id: Number(i.id), image: i.image, name: i.name }}
            >
              <p className="data mobile editable" title="click for edit">
                <span style={{ width: "10%" }}>{i.id}</span>
                <span>{i.name}</span>
                <span>{new Date(i.created).toLocaleString()}</span>
                <span
                  className="image"
                  style={{
                    backgroundImage: `url(${i.image})`,
                    backgroundColor: "#ccc",
                  }}
                />
              </p>
            </Link>
          ))}
        </section>
      </div>
    </>
  );
};
