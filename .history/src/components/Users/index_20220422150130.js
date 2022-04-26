import * as React from "react";
import axios from "axios";

import "./styles.scss";
import { useParams } from "react-router-dom";

export const Users = () => {
  let params = useParams();
  const [data, setData] = React.useState([])
  React.useEffect(()=>{

    axios
    .get(`https://jsonplaceholder.typicode.com/users`)
    .then((res) => {
      console.log(res.data);
      setData(res.data);      
      
    });
  },[])  

  return <>
    <h1 className="header">admin: {params.name}</h1>
    <div className="mainblockuser">
        {data.length}

    </div>
  </>
};
