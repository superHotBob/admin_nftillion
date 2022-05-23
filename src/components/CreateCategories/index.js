import * as React from "react";
import { Link , useLocation} from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import "./styles.scss";

export const CreateCategories = () => {
  // const [author, setAuthor] = React.useState("");
  // const [category, setCategory] = React.useState("");
  // const [type, setType] = React.useState("");
  // const [nameCollection, setNameCollection] = React.useState("");
  // const [symbol, setSymbol] = React.useState("");
  // const [description, setDescription] = React.useState("");

  const [imageCategories, selectImageCategories] = React.useState();
  const location = useLocation()
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
  React.useEffect(()=>{
    if(location.state) {
       selectImageCategories(location.state.image)
    } else {
      selectImageCategories()
    }
   
  },[location])
  async function onSubmit(data) {
    const form = new FormData();
   
    form.append("name", data.name);
    form.append("file", data.image[0]);

    // event.preventDefault();
    await axios.post("https://app.nftillion.io/admin/category/create", form, {     
      headers: {        
        "Content-Type": "multipart/form-data; boundary=something",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json());
  }
  return (
    <>
      <h1 className="header_users new">{location.state ? 'Edit category' : 'Create new category'}</h1>
      <form onSubmit={handleSubmit(onSubmit)} method="post">
        <div className="create_category">
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
              <label style={{justifyContent: 'center'}}>
                Select image
                <input
                  type="file"
                  style={{ display: "none" }}
                  {...register("image",{
                    onChange: (e) => viewImage(e)
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
           <span>Name*</span> 
            <input
              type="text"
              name="name"
              required
              style={{ marginLeft: 8 }}            
              {...register("name", {value: location.state ? location.state.name : ''})}
              
            />
          </label>
          <label>
            <Link to="/categories" className="button cancel">
              Cancel
            </Link>
            <button type="submit" className="button size">Create new</button>
          </label>
        </div>
      </form>
    </>
  );
};
