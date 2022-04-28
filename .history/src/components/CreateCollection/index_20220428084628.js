import * as React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import "./styles.scss";

export const Create = () => {
  const [author, setAuthor] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [type, setType] = React.useState("");
  const [nameCollection, setNameCollection] = React.useState("");
  const [symbol, setSymbol] = React.useState("");
  const [description, setDescription] = React.useState("");

  const [imageCollection, selectImageCollection] = React.useState();
  const [bannerCollection, selectBannerCollection] = React.useState();
  const [logoCollection, selectLogoCollection] = React.useState();

  const { register, handleSubmit } = useForm();

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
  async function onSubmit(data) {
  const form = new FormData();
  // const metadata = {
  //   name: nameCollection,
  //   symbol: symbol,
  //   description: description,
  // };
  
  // form.append("author", author);
  // form.append("type", type);
  // form.append("category", category);
  // form.append("metadata", metadata);
  form.append("image", data.file[0]);
  // form.append("logo", logoCollection);
  // form.append("banner", bannerCollection);

  
    // event.preventDefault();
    await axios("https://app.nftillion.io/admin/collection/create",{

      method: 'Post',

      body: form,
        // {
        //   image: imageCollection,
        //   logo: logoCollection,
        //   banner: bannerCollection,
        //   author: Number(author),
        //   category: Number(category),
        //   type: Number(type),
        //   metadata: {
        //     name: nameCollection,
        //     symbol: symbol,
        //     description: description,
        //   },
        // },
      
          headers: {
            "X-Content-Type-Options": "nosniff",
            "Content-Type": "multipart/form-data; boundary=something",
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="main_block_create"
        enctype="multipart/form-data"
      >
        <div className="image_block" style={{ marginTop: 40 }}>
          <div
            className="image"
            style={{
              height: imageCollection ? "300px" : "auto",
              background: `url(${imageCollection}) center / auto 90% no-repeat`,
            }}
          >
            {imageCollection && (
              <img
                src="/icon_close.png"
                alt="close"
                height={25}
                width={25}
                style={{ float: "right", margin: 10, cursor: "pointer" }}
                onClick={() => selectImageCollection()}
              />
            )}
            {!imageCollection && (
              <label>
                Select image
                <input
                  type="file"
                  style={{ display: "none" }}
                 
                  {...register("image")}
                  accept="image/png, image/gif, image/webp, image/jpeg, video/mp4,audio/mp3"
                  onChange={(e) => viewImage(e)}
                />
              </label>
            )}
          </div>
          <div
            className="banner"
            style={{
              height: bannerCollection ? "300px" : "auto",
              background: `url(${bannerCollection}) center / auto 90% no-repeat`,
            }}
          >
            {" "}
            {bannerCollection && (
              <img
                src="/icon_close.png"
                alt="close"
                height={25}
                width={25}
                style={{ float: "right", margin: 10, cursor: "pointer" }}
                onClick={() => selectBannerCollection()}
              />
            )}
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
            style={{
              height: logoCollection ? "50px" : "auto",
              background: `url(${logoCollection}) center / auto 90% no-repeat`,
            }}
          >
            {" "}
            {logoCollection && (
              <img
                src="/icon_close.png"
                alt="close"
                height={25}
                width={25}
                style={{ float: "right", margin: 10, cursor: "pointer" }}
                onClick={() => selectLogoCollection()}
              />
            )}
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
        </div>
        <div className="data_block">
          <label>
            Author
            <input
              type="text"
              pattern="[0-9]+"
              placeholder="id of created user"             
              value={author}
              {...register("author")}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </label>
          <label>
            Category
            <input
              type="text"             
              placeholder="id of category"
              pattern="[0-9]+"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </label>
          <label>
            Type
            <input
              type="text"
              name="type"
              pattern="[0-9]+"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </label>
          <label>
            Name*
            <input
              type="text"
              name="name"
              style={{marginLeft:8}}
              value={nameCollection}
              onChange={(e) => setNameCollection(e.target.value)}
            />
          </label>
          <label>
            Symbol
            <input
              type="text"
              name="symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
            />
          </label>
          <label>
            Description
            <textarea
              rows={5}
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label >
            <Link to="/preminted">
              <button className="cancel">Cancel</button>
            </Link>
            <button type="submit">Create</button>
          </label>
        </div>
      </form>
    </>
  );
};
