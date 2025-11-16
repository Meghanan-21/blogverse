// Import required modules using ES Modules (Next.js 16 requires this format)
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { connectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
const fs = require("fs");

// Function to connect to the database when API starts
const LoadDB = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error("Failed to connect to database:", error.message);
  }
};
// Call the function immediately
LoadDB();

// Handling GET requests — supports optional ?id=
export async function GET(request) {
  console.log("Received GET request for /api/blog");
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (id) {
      const blog = await BlogModel.findById(id).lean();
      if (!blog)
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json({ blog });
    }

    const blogs = await BlogModel.find().sort({ date: -1 }).lean();
    return NextResponse.json({ blogs });
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Handling POST requests — for uploading an image
export async function POST(request) {
  try {
    // getting blog data as form data
    const formData = await request.formData();

    // Create unique, sanitized filename using timestamp
    const timestamp = Date.now();

    // Get the image from the form data
    const image = formData.get("image");
    if (!image || typeof image.name !== "string") {
      throw new Error("No image file provided");
    }

    // logic to store image in public folder by converting to byte data
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData); // convert byte data to Node.js Buffer

    // Sanitize filename: replace spaces and unsafe chars with underscore
    const safeName = image.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const filename = `${timestamp}_${safeName}`;
    const publicPath = path.join(process.cwd(), "public", filename);
    await writeFile(publicPath, buffer); // save image file

    // Create an image URL to access it later (encodeURIComponent to be safe)
    const imgUrl = `/${encodeURIComponent(filename)}`;
    console.log("Saved image to:", publicPath, "-> url:", imgUrl);

    // Normalize authorImg: admin UI uses default "/author_img.png" which may not exist in /public
    const rawAuthorImg = formData.get("authorImg");
    console.log("Raw authorImg from form:", rawAuthorImg);
    const authorImg =
      rawAuthorImg && rawAuthorImg !== "/author_img.png" ? rawAuthorImg : "";

    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
      image: imgUrl,
      authorImg: authorImg,
      date: new Date(),
    };

    const savedBlog = await BlogModel.create(blogData);
    console.log("Blog saved:", savedBlog);

    // Transform the response to remove _id and __v
    const responseData = {
      id: savedBlog._id.toString(),
      title: savedBlog.title,
      description: savedBlog.description,
      category: savedBlog.category,
      author: savedBlog.author,
      image: savedBlog.image,
      authorImg: savedBlog.authorImg,
      date: savedBlog.date,
    };

    return NextResponse.json({
      success: true,
      message: "Blog created successfully",
      blog: responseData,
    });
  } catch (error) {
    console.error(" Error uploading image or saving blog:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload image" },
      { status: 500 }
    );
  }
}
//api end point to delete method
export async function DELETE(request) {
  const id = new URL(request.url).searchParams.get("id"); // FIX 1

  const blog = await BlogModel.findById(id);

  if (!blog) {
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  }

  if (blog.image) {
    fs.unlink(`./public${blog.image}`, () => {}); // FIX 2
  }

  await BlogModel.findByIdAndDelete(id);

  return NextResponse.json({ msg: "Blog deleted successfully" });
}
