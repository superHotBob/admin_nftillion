import * as React from "react";
import axios from "axios";

import "./styles.scss";

export const Create = () => {
  const [author, setAuthor] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [type, setType] = React.useState('');
  const [nameCollection, setNameCollection] = React.useState('');
  const [symbol, setSymbol] = React.useState('');
  const [description, setDescription] = React.useState('');  

  const [imageCollection, selectImageCollection] = React.useState();
  const [bannerCollection, selectBannerCollection] = React.useState();
  const [logoCollection, selectLogoCollection] = React.useState();

  const viewImage = async (event) => {
    let file = event.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.onloadend = function () {
      selectImageCollection(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const viewBanner = async (event) => {
    let file = event.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.onloadend = function () {
      selectBannerCollection(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const viewLogo = async (event) => {
    let file = event.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.onloadend = function () {
      selectLogoCollection(reader.result);
    };
    reader.readAsDataURL(file);
  };
  function CreateCollection() {
    axios
    .post(
      "https://app.nftillion.io/admin/collection/create",
      {
        image: imageCollection,
        logo: logoCollection,
        banner: bannerCollection,
        author: author,
        category: category,
        type: type,
        metadata: {
            name: nameCollection,
            symbol: symbol,
            description: description
        }

      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
    .then((res) => {
      console.log(res.data);
    });
  }
  return (
    <>
      <h1 className="header">Create new collection</h1>
      <div className="main_block_create">
        <div className="image_block">
          <form>
            <div
              className="image"
              style={{height: imageCollection ? '300px' : 'auto',
                background: `url(${imageCollection}) center / auto 90% no-repeat`,
              }}
            >
              {imageCollection && <img
                src="/icon_close.png"
                alt="close"
                height={25}
                width={25}
                style={{ float: "right", margin: 10, cursor: 'pointer' }}
                onClick={()=>selectImageCollection()}
              />}
              {!imageCollection && (
                <label>
                  Select image
                  <input
                    type="file"
                    style={{ display: "none" }}
                    id="file"
                    name="file"
                    accept="image/png, image/gif, image/webp, image/jpeg, video/mp4,audio/mp3"
                    onChange={(e) => viewImage(e)}
                  />
                </label>
              )}
            </div>
            <div
              className="banner"
              style={{ height: bannerCollection ? '300px' : 'auto',
                background: `url(${bannerCollection}) center / auto 90% no-repeat`,
              }}
            > {bannerCollection && <img
                src="/icon_close.png"
                alt="close"
                height={25}
                width={25}
                style={{ float: "right", margin: 10, cursor: 'pointer' }}
                onClick={()=>selectBannerCollection()}
              />}
              {!bannerCollection && (
                <label>
                  Select banner
                  <input
                    type="file"
                    style={{ display: "none" }}
                    id="file"
                    name="file"
                    accept="image/png, image/gif, image/webp, image/jpeg, video/mp4,audio/mp3"
                    onChange={(e) => viewBanner(e)}
                  />
                </label>
              )}
            </div>
            <div
              className="logo"
              style={{height: logoCollection ? '50px' : 'auto',
                background: `url(${logoCollection}) center / auto 90% no-repeat`,
              }}
            > {logoCollection && <img
                src="/icon_close.png"
                alt="close"
                height={25}
                width={25}
                style={{ float: "right", margin: 10, cursor: 'pointer' }}
                onClick={()=>selectLogoCollection()}
              />}
              {!logoCollection && (
                <label>
                  Select logo
                  <input
                    type="file"
                    style={{ display: "none" }}
                    id="file"
                    name="file"
                    accept="image/png, image/gif, image/webp, image/jpeg, video/mp4,audio/mp3"
                    onChange={(e) => viewLogo(e)}
                  />
                </label>
              )}
            </div>
          </form>
        </div>
        <div className="data_block">
          <label>
            Author
            <input type="text" value={author} onChange={e=>setAuthor(e.target.value)}/>
          </label>
          <label>
            Category
            <input type="text" value={category} onChange={e=>setCategory(e.target.value)}/>
          </label>
          <label>
            Type
            <input type="text"value={type} onChange={e=>setType(e.target.value)}/>
          </label>
          <fieldset>
            <legend>Metadata</legend>
            <label>
              Name
              <input type="text" value={nameCollection}/>
            </label>
            <label>
              Symbol
              <input type="text" value={symbol}/>
            </label>
            <label>
              Description
              <input type="text" value={description}/>
            </label>
          </fieldset>

          <button onClick={CreateCollection}>CREATE</button>
        </div>
      </div>
    </>
  );
};