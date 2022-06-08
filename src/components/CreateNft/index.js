import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import "./styles.scss";
import Tooltip from "../Tooltip";
import FirstString from "../FirstString";

export const CreateNft = () => {
  const [imageCategories, selectImageCategories] = React.useState();
  const [created, setCreated] = React.useState("");
  const [allCollection, setAllCollection] = React.useState([]);
  const location = useLocation();
  const navigation = useNavigate();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      maxSupply: location.state ? location.state.maxSupply : "",
      currentPrice: location.state ? location.state.currentPrice : "",
    },
  });

  const viewImage = async (event) => {
    let file = event.target.files[0];

    const reader = new FileReader();
    reader.onloadend = function () {
      selectImageCategories(reader.result);
    };
    reader.readAsDataURL(file);
  };
  React.useEffect(() => {
    if (location.state) {
      selectImageCategories(location.state.metadata.image);
    } else {
      selectImageCategories();
    }
  }, [location]);

  let navigate = useNavigate();
  const name = localStorage.getItem("accessToken");
  React.useEffect(() => {
    name
      ? axios
          .get("https://app.nftrealworld.io/admin/collections/fromAdmin", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          })
          .then((res) => {
            setAllCollection(
              res.data.collections
                .map((i) => [{ id: i.id, name: i.metadata.name }])
                .flat()
            );
          })
      : navigate("/");
  }, [name, navigate, location.state]);
  React.useEffect(
    () => setValue("collection", location.state ? location.state.collection : ""),
    [allCollection]
  );
  async function onSubmit(data) {
    const form = new FormData();
    const metadata = {
      name: data.nameNft,
      symbol: "&&",
      description: data.description,
    };
    form.append("metadata", JSON.stringify(metadata));
    form.append("type", data.type);
    form.append("collection", Number(data.collection));
    form.append("maxSupply", Number(data.maxSupply));
    form.append("currentPrice", data.currentPrice);
    // form.append("levels", JSON.stringify({ data: "" }));
    if (data.image[0]) {
      console.log(data.image[0]);
      form.append("file", data.image[0]);
    }
    if (location.state) {
      // form.append("status", null)
      form.append("promoData", data.promoData);
    }

    // event.preventDefault();

    if (location.state) {
      await axios
        .put(
          `https://app.nftrealworld.io/admin/item/update/${location.state.id}`,
          form,
          {
            headers: {
              "Content-Type": "multipart/form-data; boundary=something",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((res) => {
          setCreated("edited");
          setTimeout(() => setCreated(false), 2000);
        });
    } else {
      await axios
        .post("https://app.nftrealworld.io/admin/item/create", form, {
          headers: {
            "Content-Type": "multipart/form-data; boundary=something",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })

        .then((res) => {
          setCreated("created");
          setTimeout(() => setCreated(""), 2000);
        });
    }
  }
  function DeleteNft(a) {
    axios
      .delete(`https://app.nftrealworld.io/admin/item/${location.state.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        navigate("/nftadmin");
      });
  }
  return (
    <div style={{ marginTop: "5vh" }}>
      <FirstString
        text={
          created
            ? `Congratulations! NFT sucsessfully ${created}`
            : location.state
            ? "Edit NFT"
            : "Create  NFT"
        }
      />
      <form onSubmit={handleSubmit(onSubmit)} method="post">
        <div className="create_nft">
          <div
            className="image"
            style={{
              height: imageCategories ? "500px" : "150px",
              background: `#fff url(${imageCategories}) center / auto 90% no-repeat`,
            }}
          >
            {imageCategories && (
              <b className="close" onClick={() => selectImageCategories()}>
                {" \u26d2 "}
              </b>
            )}
            {!imageCategories && (
              <label style={{ justifyContent: "center", textAlign: "center" }}>
                <p>
                  Select image <br />
                  <b className="image_title">
                    (File type supported: JPG, PNG, GIF, SVG. Max size: 500 MB)
                  </b>
                </p>
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
              <span>
                Type <Tooltip text="this is text" />{" "}
              </span>
              <select
                {...register("type", {
                  value: "1",
                })}
              >
                <option value="0">artwork</option>
                <option value="1">nft</option>
              </select>
            </label>
            <label>
              <span>Collection</span>
              <select {...register("collection")}>
                {[...new Set(allCollection)].map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Current price</span>
              <input
                type="text"
                placeholder="current price"
                {...register("currentPrice")}
              />
            </label>
            <label>
              <span>Max Supply</span>
              <input
                type="text"
                required
                style={{ marginLeft: 8 }}
                {...register("maxSupply")}
              />
            </label>
            <label>
              <span>
                * Name
                <Tooltip text="this is text about Name" />
              </span>
              <input
                type="text"
                name="name"
                required
                style={{ marginLeft: 8 }}
                {...register("nameNft", {
                  value: location.state ? location.state.metadata.name : "",
                })}
              />
            </label>
            {/* <label>
              <span>Symbol <Tooltip text="This is text about Symbol"/></span>
              <input type="text" name="symbol" {...register("symbol",{
                  value: location.state ? location.state.metadata.symbol : "",
                })} />
            </label> */}
            <label>
              <span>Description</span>
              <textarea
                rows={3}
                placeholder="description nft"
                name="description"
                {...register("description", {
                  value: location.state
                    ? location.state.metadata.description
                    : "",
                })}
              />
            </label>
            {location.state && (
              <label>
                <span>Promo</span>
                <select
                  {...register("promoData", {
                    value: location.state ? location.state.promoData : "",
                  })}
                >
                  <option value="">none</option>
                  <option value="mainPage">Main page</option>
                </select>
              </label>
            )}
            <label className="buttons">
              <button
                className="button cancel"
                type="button"
                onClick={() => navigation("/nftadmin")}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="button"
                style={{ width: location.state ? "50%" : "60%" }}
              >
                {location.state ? "Save" : "Create new"}
              </button>

              {location.state && (
                <button
                  type="button"
                  onClick={() => DeleteNft(location.state.id)}
                  className="button delete"
                  style={{ background: "green", color: "#fff" }}
                >
                  Delete
                </button>
              )}
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};
