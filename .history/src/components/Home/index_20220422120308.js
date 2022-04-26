import * as React from "react";
import "./styles.scss";
import axios from "axios";

export const Home = () => {
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("")

  function sendPassword() {
    axios.post(`https://jsonplaceholder.typicode.com/users`, 
    {name:name,password: password})
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }
  return (
    <div className="mainblock">
      <h2>Welcom to admin panel</h2>
      <form>
      <input
          type="text"
          value={name}
          required
          onChange={(e)=>setName(e.target.value)}
          placeholder="enter name"
        />
      <label>
        <input
          type="password"
          value={password}
          required
          onChange={(e)=>setPassword(e.target.value)}
          placeholder="enter password"
        />
      </label>
      <button type="submit" onClick={sendPassword}>SUBMIT</button>
      </form>
    </div>
  );
};
