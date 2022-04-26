import * as React from "react";
import axios from "axios";
import {Link, useNavigate } from "react-router-dom";
import { NavPanel } from "../NavPanel";


export  const Preminted =()=> {
    return(
        <>
        <NavPanel />
        <h1>List collections <Link to="/createcollection"><b>new</b></Link></h1>
        </>
        
    )
}
