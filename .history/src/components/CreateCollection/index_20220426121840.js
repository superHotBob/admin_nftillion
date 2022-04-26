import * as React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const Create = () => {
  return (
    <>
      <h1>
        List collections <Link to="/createcollection"><b>new</b></Link>
      </h1>
    </>
  );
};
