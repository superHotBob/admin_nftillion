import * as React from "react";
import "./styles.scss";
import {
    useParams,
    useNavigate,
    useLocation,
  } from "react-router-dom";


export  const Users = () => {
    let params = useParams();
    console.log(params)
    return(
        <h1 className="header">Hello {params.name}</h1>
    )
}