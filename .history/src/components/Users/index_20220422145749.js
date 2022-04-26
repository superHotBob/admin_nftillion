import * as React from "react";
import axios from "axios";

import "./styles.scss";
import { useParams } from "react-router-dom";

export const Users = () => {
  let params = useParams();


  return <>
    <h1 className="header">admin: {params.name}</h1>
    <div className="mainblockuser">

    </div>
  </>
};
