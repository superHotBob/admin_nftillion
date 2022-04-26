import * as React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "./styles.scss";

export const Create = () => {
  return (
    <>
      <h1 className="header">Create new collection</h1>
      <div className="main_block_create">
        <div className="image_block">        
        </div>
        <div className="data_block">
         
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
          <fieldset>
            <legend>Metadata</legend>
            <label>
              Name
              <input type="text" />
            </label>
            <label>
           Symbol
              <input type="text" />
            </label>
            <label>
             Description
              <input type="text" />
            </label>
          </fieldset>

          <button>CREATE</button>
        </div>
      </div>
    </>
  );
};
