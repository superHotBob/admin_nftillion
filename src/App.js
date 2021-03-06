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
import { Nft } from "./components/Nft";
import { CreateNft } from "./components/CreateNft";
import { NftAdmin } from "./components/NftAdmin";
import { CollectionsAdmin } from "./components/CollectionsAdmin";
import { Promo } from "./components/Promo";

function App() {
  return (
    <div className="App">
       <Helmet>
        <meta charSet="utf-8" />
        <title>Admin app</title>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
       
      </Helmet>
    <Routes>
        <Route path="/" element={<LogIn />} />      
        <Route path="users" element={<Users />} />
        <Route path="nft" element={<Nft />} />
        <Route path="promonft" element={<Promo />} />
        <Route path="nftadmin" element={<NftAdmin />} />
        <Route path="createnft" element={<CreateNft />} />
        <Route path="collectionsadmin" element={<CollectionsAdmin />} />
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
