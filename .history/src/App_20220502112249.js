import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { LogIn } from "./components/Login";
import { Users } from "./components/Users";
import {Helmet} from "react-helmet";
import './App.css';
import { Collections } from "./components/Collections";
import { Categories } from "./components/Categories";
import { Create } from "./components/CreateCollection";
import { PremintedCollections } from "./components/PremintedCollections";
import { CreateCategories } from "./components/CreateCategories";

function App() {
  return (
    <div className="App">
       <Helmet>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
       
      </Helmet>
    <Routes>
        <Route path="/" element={<LogIn />} />      
        <Route path="users" element={<Users />} />
        <Route path="collections" element={<Collections />} />
        <Route path="categories" element={<Categories />} />
        <Route path="premintedcollections" element={<PremintedCollections />} />
        <Route path="createcollection" element={<Create />} />
        <Route path="createcategory" element={<CreateCategories />} />
      </Routes>
    </div>
  );
}

export default App;
