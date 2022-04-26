import * as React from "react";
import axios from "axios";

import "./styles.scss";
import { useParams } from "react-router-dom";

export const Users = () => {
  let params = useParams();
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);

  return (
    <>
      <h1 className="header">
        <b>admin: {params.name}</b>
        List of users
      </h1>
      <div className="mainblockuser">
        <header>
          <span>id</span>
          <span>name</span>
          <span>user name</span>
          <span>email</span>
          <span>phone</span>
          <span>website</span>
        </header>
        <section>
          {data.map((i) => (
            <p className="data">
              <span>{i.id}</span>
              <span>{i.name}</span>
              <span>{i.username}</span>
              <span>{i.email}</span>
              <span>{i.phone}</span>
              <span>{i.website}</span>
            </p>
          ))}
        </section>
      </div>
    </>
  );
};
