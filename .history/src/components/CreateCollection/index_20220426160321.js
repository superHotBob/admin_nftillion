import * as React from "react";
import axios from "axios";

import "./styles.scss";

export const Create = () => {
  const [imageNft, selectedImageNft] = React.useState();
  const viewImage = async (event) => {
    let file = event.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.onloadend = function () {
      selectedImageNft(reader.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <>
      <h1 className="header">Create new collection</h1>
      <div className="main_block_create">
        <div className="image_block">
          <form>
            <div className="image" style={{background: `url(${imageNft}) center / auto 90% no-repeat`}}>
                <img src='/icon_close.png' alt="close" height={25} width={25} style={{float: 'right',margin: 10}}/>
              {!imageNft && <label>
                Select image
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="file"
                  name="file"
                  accept="image/png, image/gif, image/webp, image/jpeg, video/mp4,audio/mp3"
                  onChange={(e) => viewImage(e)}
                />
              </label>}
            </div>
            <div className="banner" style={{background: `url(${imageNft}) center / auto 90% no-repeat`}}>
              {!imageNft && <label>
                Select image
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="file"
                  name="file"
                  accept="image/png, image/gif, image/webp, image/jpeg, video/mp4,audio/mp3"
                  onChange={(e) => viewImage(e)}
                />
              </label>}
            </div>
            <div className="logo" style={{background: `url(${imageNft}) center / auto 90% no-repeat`}}>
              {!imageNft && <label>
                Select image
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="file"
                  name="file"
                  accept="image/png, image/gif, image/webp, image/jpeg, video/mp4,audio/mp3"
                  onChange={(e) => viewImage(e)}
                />
              </label>}
            </div>
          </form>
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