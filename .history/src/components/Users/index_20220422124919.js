import * as React from "react";
import "./styles.scss";
import { useParams } from "react-router-dom";

export const Users = () => {
  let params = useParams(); 

  return <>
    <h1 className="header">Hello {params.name}</h1>;
    <div className="mainblock">

    </div>
  </>
};
