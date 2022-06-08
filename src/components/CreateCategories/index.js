import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";


import "./styles.scss";
import FirstString from "../FirstString";

export const CreateCategories = () => {
  // const [author, setAuthor] = React.useState("");
  // const [category, setCategory] = React.useState("");
  // const [type, setType] = React.useState("");
  // const [nameCollection, setNameCollection] = React.useState("");
  // const [symbol, setSymbol] = React.useState("");
  // const [description, setDescription] = React.useState("");

  const [imageCategories, selectImageCategories] = React.useState();
  const location = useLocation();
  let navigate = useNavigate();
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
 
  async function onSubmit(data) {
    const form = new FormData();
    form.append("name", data.name);
    if(data.image[0]) {
      form.append("file", data.image[0])
    }

    if (location.state) {
      await axios
        .put(
          `https://app.nftrealworld.io/admin/category/${location.state.id}`,
          form,
          {
            headers: {
              "Content-Type": "multipart/form-data; boundary=something",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((res) => navigate("/categories"));
    } else {
      await axios
        .post("https://app.nftrealworld.io/admin/category/create", form, {
          headers: {
            "Content-Type": "multipart/form-data; boundary=something",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => navigate("/categories"));
    }
  }
  function DeleteCategory(a) {
    axios
      .delete(`https://app.nftrealworld.io/admin/category/${location.state.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        navigate("/categories");
      });
  }
  return (
    <>
      
      <FirstString text= {location.state ? "Edit category" : "Create new category"} />
      <form onSubmit={handleSubmit(onSubmit)} method="post">
        <div className="create_category">
          <div
            className="image"
            style={{
              height: imageCategories ? "400px" : "auto",
              background: `#ccc url(${imageCategories}) center / auto 90% no-repeat`,
            }}
          >
            {imageCategories && (
               <b className="close" onClick={() => selectImageCategories()}>
               {" \u26d2 "}
             </b>
             
            )}
            {!imageCategories && (
              <label style={{ justifyContent: "center" }}>
               <p>Select image <br/> 
                <b className="image_title">(File type supported: JPG, PNG, GIF, SVG. Max size: 500 MB)</b>
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

          {/* <label>
            <span>Id</span>
            <input
              type="text"
              pattern="[0-9]+"
              placeholder="id of created user"             
              {...register("id", {value: location.state ? location.state.id : ''})}              
            />
          </label> */}
          <label>
            <span>* Name </span>
            <input
              type="text"
              placeholder="name category"
              name="name"
              required
              style={{ marginLeft: 8 }}
              {...register("name", {
                value: location.state ? location.state.name : "",
              })}
            />
          </label>
          <label>
            <Link to="/categories" className="button cancel">
              Cancel
            </Link>
            <button type="submit" className="button size">
              {location.state ? "Edit" : "Create new"}
            </button>
            {location.state && (
              <button
                type="button"
                onClick={() => DeleteCategory(location.state.id)}
                className="button delete"
                style={{ background: "green", color: "#fff", margin: 0 }}
              >
                Delete
              </button>
            )}
          </label>
        </div>
      </form>
    </>
  );
};
