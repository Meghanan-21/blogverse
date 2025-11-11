import React, { useEffect, useState } from "react";

import { blog_data } from "@/Assets/Assets/assets";
import BlogItem from "./BlogItem";
import axios from "axios";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]); //state variable to store api data initially empty array
  const fetchBlogs = async () => {
    const response = await axios.get("/api/blog"); //api end point
    setBlogs(response.data.blogs); //blogs array which will be stored in blogs state
    console.log(response.data.blogs);
  };
  useEffect(() => {
    fetchBlogs();
  }, []); //executes frst time when components get loaded

  // normalize menu comparison and defensively handle blogs data
  const filteredBlogs = Array.isArray(blogs)
    ? blogs.filter((item) =>
        menu === "All"
          ? true
          : (item.category || "").toLowerCase() === menu.toLowerCase()
      )
    : [];

  return (
    <div>
      {/* Category Buttons */}
      <div className="flex justify-center gap-6 my-10">
        <button
          onClick={() => setMenu("All")}
          className={
            menu === "All" ? "bg-black text-white px-4 py-1 rounded-sm" : ""
          }
        >
          All
        </button>
        <button
          onClick={() => setMenu("Technology")}
          className={
            menu === "Technology"
              ? "bg-black text-white px-4 py-1 rounded-sm"
              : ""
          }
        >
          Technology
        </button>
        <button
          onClick={() => setMenu("Startup")}
          className={
            menu == "Startup" ? "bg-black text-white px-4 py-1 rounded-sm" : ""
          }
        >
          Startup
        </button>
        <button
          onClick={() => setMenu("Lifestyle")}
          className={
            menu === "Lifestyle"
              ? "bg-black text-white px-4 py-1 rounded-sm"
              : ""
          }
        >
          Lifestyle
        </button>
      </div>

      {/* Blog Cards */}
      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
        {filteredBlogs.map((item, index) => (
          <BlogItem
            key={item._id || index}
            id={item._id}
            image={item.image}
            title={item.title}
            description={item.description}
            category={item.category}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
