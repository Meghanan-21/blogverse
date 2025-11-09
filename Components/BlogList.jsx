import React, { useState } from "react";

import { blog_data } from "@/Assets/Assets/assets";
import BlogItem from "./BlogItem";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
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
        {blog_data
          .filter((item) => (menu === "All" ? true : item.category === menu))
          .map((item, index) => (
            <BlogItem
              key={index}
              id={item.id}
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
