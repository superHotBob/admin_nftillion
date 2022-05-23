import * as React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import "./styles.scss";
import axios from "axios";

export const Create = () => {
  const [viewAnswer, setViewAnswer] = React.useState(false);

  const [imageCollection, selectImageCollection] = React.useState();
  const [bannerCollection, selectBannerCollection] = React.useState();
  const [logoCollection, selectLogoCollection] = React.useState();

  const {
    register,
    handleSubmit    
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
    const reader = new FileReader();
    reader.onloadend = function () {
      selectBannerCollection(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const viewLogo = async (event) => {
    let file = event.target.files[0];   
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
    // form.append("author", Number(data.author));
    form.append("type", Number(data.type));
    form.append("category", Number(data.Category));
    form.append("metadata", JSON.stringify(metadata));
    form.append("image", data.image[0]);
    form.append("logo", data.banner[0]);
    form.append("banner", data.logo[0]);

    console.log(data.image[0]);
     await axios
      .post("https://app.nftillion.io/admin/collection/create", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => setViewAnswer(true))
      .then(res=>setTimeout(()=>setViewAnswer(false),2000));   
  }
  return (
    <div>
      <h1 className="header_users new">Create new collection</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="main_block_create">
        <div className="image_block" style={{ marginTop: 40 }}>
          <div
            className="image"
            style={{
              height: imageCollection ? "300px" : "auto",
              background: `#fff url(${imageCollection}) center / auto 90% no-repeat`,
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
                  {...register("image", {
                    onChange: (e) => viewImage(e)
                  })}                 
                  accept="image/png, image/gif, image/webp, image/jpeg, video/mp4,audio/mp3"
                />
              </label>
            )}
          </div>
          <div
            className="banner"
            style={{
              height: bannerCollection ? "300px" : "auto",
              background: `#fff url(${bannerCollection}) center / auto 90% no-repeat`,
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
                  {...register("banner", { onChange: (e) => viewBanner(e) })}
                  accept="image/png, image/gif, image/webp, image/jpeg, video/mp4,audio/mp3"
                />
              </label>
            )}
          </div>
          <div
            className="logo"
            style={{
              height: logoCollection ? "50px" : "auto",
              background: `#fff url(${logoCollection}) center / auto 90% no-repeat`,
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
                  {...register("logo", { onChange: (e) => viewLogo(e) })}
                  accept="image/png, image/gif, image/webp, image/jpeg, video/mp4,audio/mp3"
                />
              </label>
            )}
          </div>
        </div>
        <div className="data_block">
          {/* <label>
            Author
            <input
              type="text"
              pattern="[0-9]+"
              placeholder="id of created user"
              name="author"             
              {...register("author")}
              // onChange={(e) => setAuthor(e.target.value)}
            />
          </label> */}
          <label>
            Category
            <select {...register("Category")}>
              <option value='1'>Art</option>
              <option value='2'> Music</option>
              <option value='3'> Sports</option>
            </select>
          </label>
          <label>
            Type
            <input
              type="text"
              name="type"
              pattern="[0-9]+"              
              {...register("type")}              
            />
          </label>
          <label>
            Name*
            <input
              type="text"
              name="name"
              required
              style={{ marginLeft: 8 }}             
              {...register("nameCollection")}              
            />
          </label>
          <label>
            Symbol
            <input
              type="text"
              name="symbol"              
              {...register("symbol")}              
            />
          </label>
          <label>
            Description
            <textarea
              rows={5}
              name="description"             
              {...register("description")}              
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
      <div className={viewAnswer ? 'answer' : 'answer hide'}>Collection created</div>
    </div>
  );
}
