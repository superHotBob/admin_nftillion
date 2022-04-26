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
      .post(`https://jsonplaceholder.typicode.com/users`, {
        name: name,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        if(res.data.name === 'bob') {
            navigate("/users:name=bob");
        } else {
            navigate("/");
        }
        
      });
  }
  return (
    <div className="mainblock">
      <h2>Welcom to admin panel</h2>
      <form onSubmit={login}>
        <input
          type="text"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
          placeholder="enter name"
        />
        <label>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder="enter password"
          />
        </label>
        <button type="submit">
          SUBMIT
        </button>
      </form>
    </div>
  );
};
