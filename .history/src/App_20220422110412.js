import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Home } from "../components/Home/home";
import { Users } from "../components/Users";
import './App.css';

function App() {
  return (
    <div className="App">
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="users" element={<Users />} />
      </Routes>
    </div>
  );
}

export default App;
