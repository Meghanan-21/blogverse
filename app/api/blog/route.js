// Import required modules using ES Modules (Next.js 16 requires this format)
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";

// Function to connect to the database when API starts
const LoadDB = async () => {
  try {
    await ConnectDB();
  } catch (error) {
    console.error("Failed to connect to database:", error.message);
  }
};
// Call the function immediately
LoadDB();

// Handling GET requests — just a test route
export async function GET(request) {
  // This will show a log in your terminal when you access /api/blog
  console.log("Received GET request for /api/blog");
  return NextResponse.json({ message: "API is working fine" });
}

// Handling POST requests — for uploading an image
export async function POST(request) {
  try {
    // getting blog data as form data
    const formData = await request.formData();

    // Create unique filename using timestamp
    const timestamp = Date.now();

    // Get the image from the form data
    const image = formData.get("image");

    // logic to store image in public folder by converting to byte data
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData); // convert byte data to Node.js Buffer

    // Save the image file in the public folder with timestamp prefix
    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path, buffer); // save image file

    // Create an image URL to access it later
    const imgUrl = `/${timestamp}_${image.name}`;
    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
      image: imgUrl,
      authorImg: formData.get("authorImg"),
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
