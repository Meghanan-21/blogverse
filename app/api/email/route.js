import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/config/db";
import EmailModel from "../../../lib/models/EmailModel";

const LoadDB = async () => {
  try {
    await connectDB();
  } catch (err) {
    console.error("DB connect error (email route):", err);
  }
};

LoadDB();

export async function POST(request) {
  try {
    // ensure DB connected
    await connectDB();

    const formData = await request.formData();
    const email = String(formData.get("email") || "").trim();

    if (!email) {
      return NextResponse.json(
        { success: false, msg: "email is required" },
        { status: 400 }
      );
    }

    await EmailModel.create({ email });

    return NextResponse.json({
      success: true,
      msg: "email subscribed successfully",
    });
  } catch (err) {
    console.error("Email subscribe error:", err);
    return NextResponse.json(
      { success: false, msg: "internal server error" },
      { status: 500 }
    );
  }
}
//custom handler function for get method
export async function GET(request) {
  const emails = await EmailModel.find({});
  return NextResponse.json({ emails });
} //this is like api end point where we can get all the subscribed emails

export async function DELETE(request) {
  const id = await request.nextUrl.searchParams.get("id");
  await EmailModel.findByIdAndDelete(id); //deleting email by id in mongodb databse with id which we send in req
  return NextResponse.json({
    success: true,
    msg: "email deleted successfully",
  });
}
