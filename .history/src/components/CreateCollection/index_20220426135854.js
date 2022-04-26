import * as React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "./styles.scss";

export const Create = () => {
  return (
    <>
      <h1 className="header">
       Create new collection
      </h1>
      <div className="main_block_create">
      <div className="image_block">
          <h2>image block</h2>

      </div>
      <div className="data_block">
          <h2>data block</h2>
          <label>
              Author
              <input type="text" />
          </label>
          <label>
              Category
              <input type="text" />
          </label>
          <label>
              Type
              <input type="text" />
          </label>
          <label>
             Metadata
              <input type="text" />
          </label>

      </div>
      </div>
    </>
  );
};
