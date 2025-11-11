import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  authorImg: { type: String },
});

//Since it will always create a model when we run, we use OR operator to make sure that if model already exists then there is no need of creating one
const BlogModel = mongoose.models.blog || mongoose.model("blog", Schema);

export default BlogModel;
