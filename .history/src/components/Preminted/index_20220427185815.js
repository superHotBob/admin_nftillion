import * as React from "react";
import "./styles.scss";
import {Link } from "react-router-dom";
import { NavPanel } from "../NavPanel";


export  const Preminted =()=> {
    const [data, setData] = React.useState([]);
    return(
        <>
        <NavPanel />
        <div className="main_preminted">
        <h1><span>List collections</span> <Link to="/createcollection"><b>create new</b></Link></h1>
        </div>
        </>
        
    )
}
