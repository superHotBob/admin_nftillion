import * as React from "react";
import "./styles.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const LogIn = () => {
  const [password, setPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [viewNewPassword, setViewNewPassword] = React.useState(false);
  const [name, setName] = React.useState("");
  const [change_pass, setChange] = React.useState(false);
  let navigate = useNavigate();

  function login(event) {
    event.preventDefault();
    axios
      .post(`https://app.nftrealworld.io/admin/login`, {
        username: name,
        password: password,
      })
      .then((res) => {
        console.log(res.status);
        if (res.data.accessToken) {
          localStorage.setItem("accessToken", res.data.accessToken);
          navigate("/users");
        } else {
          navigate('/');
          setPassword('');
          setName('')
        }
      })
      .catch((error)=>{
        console.log('This is',error)
      });;
  }
  function change(event) {
    event.preventDefault();
    axios
      .post(`https://app.nftrealworld.io/admin/changePassword`, {
        username: name,
        password: password,
        newPassword: newPassword,
      })
      .then((res) => {
        console.log(res.data);
        setName("");
        setPassword("");
        setChange(true);
        setViewNewPassword(false);
        setNewPassword();
        setTimeout(()=>setChange(false),2000);
      })
      .catch((error)=>console.log(error));
  }
  function ChangePassword() {
    setViewNewPassword(true);
  }
  return (
    <div style={{backgroundColor: '#ddd', height: '100vh'}}>
    <div className="mainblock">
      <span className={change_pass ? "change_password" : "change_password hide"}>password changed</span>
      <h2>{viewNewPassword ? "Change password" : "Sign in"}</h2>
      <form onSubmit={viewNewPassword ? change : login}>
        <label>
          <input
            className="input"
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
            className="input"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            placeholder={viewNewPassword ? "Old password" : "Password"}
          />
        </label>
        {viewNewPassword && (
          <label>
            <input
              type="password"
              className="input"
              value={newPassword}
              required
              minLength={8}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password"
            />
          </label>
        )}
        <button type="submit" className="signIn">
          {viewNewPassword ? "Change" : "Sign in"}
        </button>
        {!viewNewPassword && <p onClick={ChangePassword}>change password</p>}
      </form>
      
    </div>
    </div>
  );
};
