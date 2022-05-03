import * as React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import "./styles.scss";

export const Create = () => {
  // const [author, setAuthor] = React.useState("");
  // const [category, setCategory] = React.useState("");
  // const [type, setType] = React.useState("");
  // const [nameCollection, setNameCollection] = React.useState("");
  // const [symbol, setSymbol] = React.useState("");
  // const [description, setDescription] = React.useState("");

  const [imageCollection, selectImageCollection] = React.useState();
  const [bannerCollection, selectBannerCollection] = React.useState();
  const [logoCollection, selectLogoCollection] = React.useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const viewImage = async (event) => {
    let file = event.target.files[0];

    
    
    const reader = new FileReader();
    reader.onloadend = function () {
      selectImageCollection(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const viewBanner = async (event) => {
    let file = event.target.files[0];
    // selectBannerCollection(file)
    const reader = new FileReader();
    reader.onloadend = function () {
      selectBannerCollection(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const viewLogo = async (event) => {
    let file = event.target.files[0];
   //selectLogoCollection(file)
    const reader = new FileReader();
    reader.onloadend = function () {
     selectLogoCollection(reader.result);
     };
    reader.readAsDataURL(file);
  };
  async function onSubmit(data) {
    const form = new FormData();
    const metadata = {
      name: data.nameCollection,
      symbol: data.symbol,
      description: data.description,
    };
    form.append("author", data.author);
    form.append("type", data.type);
    form.append("category", data.Category);
    form.append("metadata", JSON.stringify(metadata));
    form.append("image", data.image[0]);
    form.append("logo", data.banner[0]);
    form.append("banner", data.logo[0]);

   console.log(data.author)
   const res =  await fetch("https://app.nftillion.io/admin/collection/create", {
      method: "POST",
      body: form,      
      headers: {        
        "Content-Type": "multipart/form-data",
        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json());

    alert(JSON.stringify(`${res.message}, status: ${res.status}`));
  }
  return (
    <>
      <h1 className="header">Create new collection</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="main_block_create"
        
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
                  {...register("image",{onChange:(e) => viewImage(e)})}
                  accept="image/png, image/gif, image/webp, image/jpeg, video/mp4,audio/mp3"
                  
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
                  {...register("banner",{onChange:(e) => viewBanner(e)})}
                  accept="image/png, image/gif, image/webp, image/jpeg, video/mp4,audio/mp3"
                  
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
                  {...register("logo",{onChange:(e) => viewLogo(e)})}
                  accept="image/png, image/gif, image/webp, image/jpeg, video/mp4,audio/mp3"
                  
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
              name="author"
              // value={author}
              {...register("author")}
              // onChange={(e) => setAuthor(e.target.value)}
            />
          </label>
          <label>
            Category
            <select {...register("Category")}>
        <option value="Art">Art</option>
        <option value="Music"> Music</option>
        <option value="Sports"> Sports</option>
      </select>
          </label>
          <label>
            Type
            <input
              type="text"
              name="type"
              pattern="[0-9]+"
              // value={type}
              {...register("type")}
              // onChange={(e) => setType(e.target.value)}
            />
          </label>
          <label>
            Name*
            <input
              type="text"
              name="name"
              required
              style={{ marginLeft: 8 }}
              // value={nameCollection}
              {...register("nameCollection")}
              // onChange={(e) => setNameCollection(e.target.value)}
            />
          </label>
          <label>
            Symbol
            <input
              type="text"
              name="symbol"
              // value={symbol}
              {...register("symbol")}
              // onChange={(e) => setSymbol(e.target.value)}
            />
          </label>
          <label>
            Description
            <textarea
              rows={5}
              name="description"
              // value={description}
              {...register("description")}
              // onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            <Link to="/premintedcollections">
              <button className="cancel">Cancel</button>
            </Link>
            <button type="submit">Create</button>
          </label>
        </div>
      </form>
    </>
  );
};
