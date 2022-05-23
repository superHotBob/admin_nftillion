import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./styles.scss";

export const CreateNft = () => {
  // const [author, setAuthor] = React.useState("");
  // const [category, setCategory] = React.useState("");
  // const [type, setType] = React.useState("");
  // const [nameCollection, setNameCollection] = React.useState("");
  // const [symbol, setSymbol] = React.useState("");
  // const [description, setDescription] = React.useState("");

  const [imageCategories, selectImageCategories] = React.useState();
  const [created, setCreated] = React.useState(false);
  const [allCollection, setAllCollection] = React.useState([]);
  const location = useLocation();
  const { register, handleSubmit } = useForm();
  const viewImage = async (event) => {
    let file = event.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.onloadend = function () {
      selectImageCategories(reader.result);
    };
    reader.readAsDataURL(file);
  };
  React.useEffect(() => {
    if (location.state) {
      selectImageCategories(location.state.image);
    } else {
      selectImageCategories();
    }
  }, [location]);

  let navigate = useNavigate();
  const name = localStorage.getItem("accessToken");
  React.useEffect(() => {
    name
      ? axios
          .get("https://app.nftillion.io/admin/collections", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          })
          .then((res) => {
            console.log(
              res.data.map((i) => [{ id: i.id, name: i.metadata.name }]).flat()
            );

            setAllCollection(
              res.data.map((i) => [{ id: i.id, name: i.metadata.name }]).flat()
            );
          })
      : navigate("/");
  }, [name, navigate]);
  async function onSubmit(data) {
    const form = new FormData();
    const metadata = {
      name: data.nameCollection,
      symbol: data.symbol,
      description: data.description,
      maxSupply: data.maxSupply,
    };
    form.append("metadata", JSON.stringify(metadata));
    form.append("type", data.type);
    form.append("collection", Number(data.collection));
    form.append("currenPrice", data.currentPrice);
    form.append("levels", JSON.stringify({ name: "bob" }));
    form.append("file", data.image[0]);

    // event.preventDefault();
    await axios
      .post("https://app.nftillion.io/admin/item/create", form, {
        headers: {
          "Content-Type": "multipart/form-data; boundary=something",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })

      .then((res) => {
        setCreated(true);
        setTimeout(() => setCreated(false), 2000);
      });
  }
  return (
    <>
      <h1
        className={`header_users ${created ? 'new created' : 'new'}`}
        
      >
        {created
          ? "Congratulations! NFT sucsessfully created"
          : "Create new NFT"}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} method="post">
        <div className="create_nft">
          <div
            className="image"
            style={{
              height: imageCategories ? "400px" : "auto",
              background: `#fff url(${imageCategories}) center / auto 90% no-repeat`,
            }}
          >
            {imageCategories && (
              <img
                src="/icon_close.png"
                alt="close"
                height={25}
                width={25}
                style={{ float: "right", margin: 5, cursor: "pointer" }}
                onClick={() => selectImageCategories()}
              />
            )}
            {!imageCategories && (
              <label style={{ justifyContent: "center" }}>
                Select image
                <input
                  type="file"
                  required
                  style={{ display: "none" }}
                  {...register("image", {
                    onChange: (e) => viewImage(e),
                  })}
                  accept="image/png, image/gif, image/webp, image/jpeg, video/mp4,audio/mp3"
                />
              </label>
            )}
          </div>
          <div className="inputs">
            <label>
              <span>Type</span>
              <select {...register("type")}>
                <option value="0">artwork</option>
                <option value="1">nft</option>
              </select>
            </label>
            <label>
              <span>Collection</span>
              <select {...register("collection")}>
                {allCollection.map((i) => (
                  <option value={i.id}>{i.name}</option>
                ))}
              </select>
            </label>

            <label>
              <span>Current price</span>
              <input
                type="text"
                pattern="[0-9]+"
                placeholder="current price"
                {...register("currentPrice", {
                  value: location.state ? location.state.id : "",
                })}
              />
            </label>
            <label>
              <span>Max Supply</span>
              <input
                type="text"
                required
                style={{ marginLeft: 8 }}
                {...register("maxSupply", {
                  value: location.state ? location.state.name : "",
                })}
              />
            </label>
            <label>
              <span>Name*</span>
              <input
                type="text"
                name="name"
                required
                style={{ marginLeft: 8 }}
                {...register("nameCollection")}
              />
            </label>
            <label>
              <span>Symbol</span>
              <input type="text" name="symbol" {...register("symbol")} />
            </label>
            <label>
              <span>Description</span>
              <textarea
                rows={3}
                name="description"
                {...register("description")}
              />
            </label>
            <div className="buttons">
              <button className="cancel">
                <Link to="/nft">Cancel</Link>
              </button>

              <button type="submit">Create</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
