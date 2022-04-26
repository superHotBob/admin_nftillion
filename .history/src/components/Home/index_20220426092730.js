import * as React from "react";
import "./styles.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  let navigate = useNavigate();

  function login(event) {
    event.preventDefault();
    axios
      .post(`https://app.nftillion.io/admin/login`, {
        username: name,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.accessToken) {
          localStorage.setItem("accessToken", res.data.accessToken);
          navigate("/users");
        } else {
          navigate("/");
        }
      });
  }
  return (
    <div className="mainblock">
      <h2>Sign in</h2>
      <form onSubmit={login}>
        <label>
         
          <input
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
        </label>
        <label>        
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </label>
        <button type="submit">Sign in</button>
        <p>Change password</p>
      </form>
    </div>
  );
};
