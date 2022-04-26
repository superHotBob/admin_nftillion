import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { LogIn } from "./components/Login";
import { Users } from "./components/Users";
import './App.css';
import { Collections } from "./components/Collections";
import { Preminted } from "./components/Preminted";
import { Create } from "./components/CreateCollection";

function App() {
  return (
    <div className="App">
    <Routes>
        <Route path="/" element={<LogIn />} />      
        <Route path="users" element={<Users />} />
        <Route path="collections" element={<Collections />} />
        <Route path="preminted" element={<Preminted />} />
        <Route path="createcollection" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;
