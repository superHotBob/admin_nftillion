import * as React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

export default function FirstString(props) {
  return (
    <div className="firststring">
      <span title={props.title}
      
      >{props.text}</span> 
      {/* {props.number&&<strong>({props.number})</strong>} */}
      {props.link && (
        <Link to={props.link} className="firststring__button">
          Сreate new
        </Link>
      )}
    </div>
  );
}
