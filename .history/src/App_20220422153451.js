import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Users } from "./components/Users";
import './App.css';
import { Collections } from "./components/Collections";

function App() {
  return (
    <div className="App">
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="users/:name" element={<Users />} />
        <Route path="collections" element={<Collections />} />
      </Routes>
    </div>
  );
}

export default App;
