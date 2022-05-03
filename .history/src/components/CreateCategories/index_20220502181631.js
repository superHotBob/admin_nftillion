import * as React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import "./styles.scss";

export const CreateCategories = () => {
  // const [author, setAuthor] = React.useState("");
  // const [category, setCategory] = React.useState("");
  // const [type, setType] = React.useState("");
  // const [nameCollection, setNameCollection] = React.useState("");
  // const [symbol, setSymbol] = React.useState("");
  // const [description, setDescription] = React.useState("");

  const [imageCategories, selectImageCategories] = React.useState();

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

  async function onSubmit(data) {
    const form = new FormData();

    form.append("id", data.id);
    form.append("type", data.type);
    form.append("category", data.category);

    form.append("image", data.image[0]);

    // event.preventDefault();
    await fetch("https://app.nftillion.io/admin/collection/create", form, {
      method: "Post",

      headers: {
        "X-Content-Type-Options": "nosniff",
        "Content-Type": "multipart/form-data; boundary=something",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json());
  }
  return (
    <>
      <h1 className="header_users">Create new category</h1>
      <form onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
        <div className="create_category">
          <div
            className="image"
            style={{
              height: imageCategories ? "300px" : "auto",
              background: `url(${imageCategories}) center / auto 90% no-repeat`,
            }}
          >
            {imageCategories && (
              <img
                src="/icon_close.png"
                alt="close"
                height={25}
                width={25}
                style={{ float: "right", margin: 10, cursor: "pointer" }}
                onClick={() => selectImageCategories()}
              />
            )}
            {!imageCategories && (
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

          <label>
            <span>Id</span>
            <input
              type="text"
              pattern="[0-9]+"
              placeholder="id of created user"
             
              {...register("id")}
              // onChange={(e) => setAuthor(e.target.value)}
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
              // onChange={(e) => setNameCollection(e.target.value)}
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
