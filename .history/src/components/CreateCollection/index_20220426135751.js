import * as React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "./styles.scss";

export const Create = () => {
  return (
    <>
      <h1>
       Create new collection
      </h1>
      <div className="main_block_create">
      <div className="image_block">
          <p>image block</p>

      </div>
      <div className="data_block">
          <p>data block</p>
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
