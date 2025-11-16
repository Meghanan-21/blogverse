"use client";
import { assets } from "@/Assets/Assets/assets";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  //When we select Image the image should be displayed in that region, thats why creating a state variable
  const [image, setImage] = useState(false);
  //We set image using (e)=> setImage(e.target.files[0]) and make it dynamically appear using ? operator at Image Tag

  //When we click on add the button, blog data should be added and stored in Database, one state variable that takes multiple data structure
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Meghana",
    authorImg: "/author_img.png",
  });

  //We need submitHandler function, i just missed the 'e' as parameter and it was not working.
  const onSubmitHandler = async (e) => {
    //Itll refresh the page when submit, so to prevent it
    e.preventDefault();
    //Now we will use the created API
    const formData = new FormData();
    formData.append("title", data.title); //field name and the actual data
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("authorImg", data.authorImg);
    formData.append("image", image); //we have stored image in image state

    //To send formdata on api we use axios, since backend and frontend run on the same port, we can just provide /api/blog
    try {
      const response = await axios.post("/api/blog", formData);
      if (response.data.success) {
        toast.success(response.data.message || "Blog added successfully!");
        setImage(false);
        setData({
          title: "",
          description: "",
          category: "Startup",
          author: "Meghana",
          authorImg: "/author_img.png",
        });
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //To save the data in title, description field we will use Controlled Components
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
    console.log(data);
  };
  //Link onChangeHandlre with Input field
  return (
    <>
      <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16 ">
        <p className="text-xl ">Upload Thumbnail</p>
        <label htmlFor="image">
          <Image
            className="mt-4 cursor-pointer"
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            width={250}
            height={125}
            alt="upload_area"
          />
        </label>
        {/* THe input is hidden, when click on the upload image, it will show option */}
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          hidden
          required
        />
        <p className="text-xl mt-4 ">Blog Title</p>
        {/* name="title" onChange={onChangeHandler} value={data.title} */}
        <input
          name="title"
          onChange={onChangeHandler}
          value={data.title}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border "
          type="text"
          placeholder="Type Here"
          required
        />
        <p className="text-xl mt-4 ">Blog Description</p>
        <textarea
          name="description"
          onChange={onChangeHandler}
          value={data.description}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border "
          type="text"
          placeholder="Write Your Content Here... Use html tags for designing: <h1>, <h2>, <h3> for heading, <p> for paragraphs and so on....."
          rows={6}
          required
        />
        <p className="text-xl mt-4">Blog Category</p>
        <select
          className="w-40 mt-4 py-3 px-4 border text-gray-500h cursor-pointer"
          name="category"
          onChange={onChangeHandler}
          value={data.category}
        >
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="LifeStyle">LifeStyle</option>
        </select>
        <br />
        <button
          type="submit"
          className="mt-8 w-40 h-12 bg-black text-white cursor-pointer"
        >
          ADD BLOG
        </button>
      </form>
    </>
  );
};

export default page;
