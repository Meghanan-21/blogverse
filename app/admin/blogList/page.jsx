"use client";
import React, { useEffect } from "react";
import BlogTableItem from "@/Components/AdminComponents/BlogTableItem";
import axios from "axios";
import { toast } from "react-toastify";

const page = () => {
  const [blogs, setBLogs] = React.useState([]);
  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blog"); //function to fetch all blogs
      const blogsData = response.data.blogs || response.data || [];
      setBLogs(blogsData);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
      toast.error("Failed to fetch blogs");
    }
  };
  const deleteBlog = async (mongoId) => {
    //function to delete blog
    try {
      // Use explicit query string to ensure id is sent correctly
      const response = await axios.delete(`/api/blog?id=${mongoId}`);
      toast.success(response.data.msg || "Blog deleted"); //show success message
      fetchBlogs(); //refresh the blog list
    } catch (err) {
      console.error("Failed to delete blog:", err);
      const message =
        err?.response?.data?.msg || err.message || "Delete failed";
      toast.error(message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []); //to call fetchBlogs function when page loads
  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1>All Blogs</h1>
      <div className="relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500 ">
          <thead className="text-sm text-gray-700 text-left uppercase bg-gray-50">
            <tr>
              <th scope="col" className="hidden sm:block px-6 py-3">
                Author Name
              </th>
              <th scope="col" className="px-6 py-3">
                Blog Title
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((item, index) => {
              return (
                <BlogTableItem
                  key={index}
                  mongoId={item._id}
                  title={item.title}
                  author={item.author}
                  authorImg={item.authorImg}
                  date={item.date}
                  deleteBlog={deleteBlog}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
