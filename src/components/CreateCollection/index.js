import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import "./styles.scss";
import axios from "axios";
import Tooltip from "../Tooltip";
import FirstString from "../FirstString";

export const Create = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [viewAnswer, setViewAnswer] = React.useState(false);
  const [dataCategories, setDataCategories] = React.useState([]);
  const [imageCollection, selectImageCollection] = React.useState();
  const [bannerCollection, selectBannerCollection] = React.useState();
  const [logoCollection, selectLogoCollection] = React.useState();

  const { register, handleSubmit, setValue } = useForm();

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

  React.useEffect(() => {
    if (location.state) {
      selectLogoCollection(location.state.logo);
      selectBannerCollection(location.state.banner);
      selectImageCollection(location.state.image);
    } else {
      selectLogoCollection();
    }
  }, [location]);
  React.useEffect(() => {
    axios
      .get("https://app.nftrealworld.io/admin/categories", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        console.log(res.data.categories.map((i) => [{ name: i.name, id: i.id }].flat()));
        setDataCategories(res.data.categories.map((i) => [{ name: i.name, id: i.id }]));
      });
  }, []);

  React.useEffect(() => {
    if (location.state) {
      setValue("Category", location.state.category.id);
    }
  }, [dataCategories])

  function Minted(a) {
    const form = new FormData();
    console.log("minted", a);
    // form.append('maxSupply', 1);   
    axios
      .post(`https://app.nftrealworld.io/admin/collection/mint/${a}`, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .catch((error) => console.log('This is erroe message', error.message));
  }
  function DeleteCollection(a) {
    axios
      .delete(
        `https://app.nftrealworld.io/admin/collection/${location.state.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        navigate("/premintedcollections");
      })
      .catch((error) => console.log(error.message));
  }
  async function onSubmit(data) {
    const form = new FormData();
    const metadata = {
      name: data.nameCollection,
      symbol: "NFRW",
      description: data.description,
    };
    // form.append("author", Number(data.author));   
    form.append("category", Number(data.Category));
    form.append("maxSupply", 1);
    form.append("metadata", JSON.stringify(metadata));
    if (data.image[0]) {
      form.append("image", data.image[0]);
    }
    if (data.logo[0]) {
      form.append("logo", data.logo[0]);
    }
    if (data.banner[0]) {
      form.append("banner", data.banner[0]);
    }

    if (location.state) {
      await axios
        .put(
          `https://app.nftrealworld.io/admin/collection/update/${location.state.id}`,
          form,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((res) => setViewAnswer(true))
        .then((res) => setTimeout(() => setViewAnswer(false), 2000));
    } else {
      await axios
        .post("https://app.nftrealworld.io/admin/collection/create", form, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then(res => Minted(res.data.id))
        .then((res) => setViewAnswer(true))
        .then((res) => {
          setTimeout(() => setViewAnswer(false), 2000);
          navigate("/premintedcollections");
        });
    }
  }
  return (
    <div>
      {/* <h1 className="header_users new">
        {location.state ? "Edit" : "Create"} collection
      </h1>  */}
      <FirstString text={location.state ? "Edit collection" : "Create collection"} />
      <form onSubmit={handleSubmit(onSubmit)} className="main_block_create">
        <div className="image_block">
          <div
            className="image"
            style={{
              height: imageCollection ? "200px" : "auto",
              background: `#fff url(${imageCollection}) center / auto 90% no-repeat`,
            }}
          >
            {imageCollection && (
              <b className="close" onClick={() => selectImageCollection()}>
                {" \u26d2 "}
              </b>
            )}

            {!imageCollection && (
              <label>
                <p>
                  Select image <br />
                  <b className="image_title">
                    (File type supported: JPG, PNG, GIF, SVG. Max size: 10 MB)
                  </b>
                </p>
                <input
                  type="file"
                  style={{ display: "none" }}
                  {...register("image", {
                    onChange: (e) => viewImage(e),
                  })}
                  accept="image/png, image/gif, image/webp, image/jpeg, video/mp4,audio/mp3"
                />
              </label>
            )}
          </div>
          <div
            className="banner"
            style={{
              height: bannerCollection ? "200px" : "auto",
              background: `#fff url(${bannerCollection}) center / auto 90% no-repeat`,
            }}
          >
            {" "}
            {bannerCollection && (
              <b className="close" onClick={() => selectBannerCollection()}>
                {" \u26d2 "}
              </b>
            )}
            {!bannerCollection && (
              <label>
                <p>
                  Select banner <br />
                  <b className="image_title">
                    (File type supported: JPG, PNG, GIF, SVG. Size: 1920x460)
                  </b>
                </p>
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
              height: logoCollection ? "200px" : "auto",
              background: `#fff url(${logoCollection}) center / auto 90% no-repeat`,
            }}
          >
            {" "}
            {logoCollection && (
              <b className="close" onClick={() => selectLogoCollection()}>
                {" \u26d2 "}
              </b>
            )}
            {!logoCollection && (
              <label>
                <p>
                  Select logo <br />
                  <b className="image_title">
                    (File type supported: JPG, PNG, GIF, SVG. Size: 186x186)
                  </b>
                </p>
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
          <label>
            <span>Category</span>
            <select {...register("Category")}>
              <option >select category</option>
              {dataCategories.flat().map((i) => (
                <option value={i.id}>{i.name}</option>
              ))}
            </select>
          </label>
          {/* <label>
            <span>Icon</span>
            <select {...register("Icon")}>
              {icons.map(i=><option value={i}><img src={i} width="20" height="20"/>{i} </option>)}              
            </select>
          </label> */}
          {/* <label>
            Type
            <input
              type="text"
              name="type"
              disabled
              style={{color: '#ddd'}}
              pattern="[0-9]+"              
              {...register("type", {value: 2})}              
            />
          </label> */}
          <label>
            <span>
              *Name <Tooltip text="text about Name" />{" "}
            </span>
            <input
              type="text"
              name="name"
              placeholder="enter name collection"
              required
              {...register("nameCollection", {
                value: location.state ? location.state.name : "",
              })}
            />
          </label>
          {/* <label>
            <span>Symbol <Tooltip text="text about Symbol" /></span>
            <input
              type="text"
              name="symbol"              
              {...register("symbol")}              
            />
          </label> */}
          <label>
            <span>Description</span>
            <textarea
              rows={5}
              name="description"
              {...register("description", {
                value: location.state ? location.state.description : "",
              })}
            />
          </label>

          <label className="buttons">
            <button
              className="cancel"
              onClick={() => navigate("/premintedcollections")}
            >
              Cancel
            </button>

            <button type="submit">{location.state ? "Save" : "Create"}</button>

            {location.state && (<>
              <button
                className="delete"
                onClick={() => DeleteCollection(location.state.id)}
                type="button"
              >
                Delete
              </button>
              {!location.state.mintAddress ?
                <button type="button" className="minted" onClick={() => Minted(location.state.id)}>Minted</button> :
                <button type="button" className="view_solscan"><a href={`https://solscan.io/token/${location.state.mintAddress}`} > Look at SolScan </a></button>
              }
            </>
            )}
          </label>
        </div>
      </form>
      <div className={viewAnswer ? "answer" : "answer hide"}>
        Collection {location.state ? "edited" : "Created"}
      </div>
    </div>
  );
};
