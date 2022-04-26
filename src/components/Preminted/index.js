import * as React from "react";
import axios from "axios";
import "./styles.scss";
import {Link, useNavigate } from "react-router-dom";
import { NavPanel } from "../NavPanel";


export  const Preminted =()=> {
    return(
        <>
        <NavPanel />
        <div className="main_preminted">
        <h1><span>List collections</span> <Link to="/createcollection"><b>create new</b></Link></h1>
        </div>
        </>
        
    )
}
