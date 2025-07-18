// import User from "@/app/models/User";
import connectToMongo from "../../../app/middleware/mongoose"
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import BookCar from "../../../app/models/BookCar"
import dotenv from "dotenv";
dotenv.config();


export async function GET(req) {
  try {
    await connectToMongo();
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);  // make sure .env is set

    // You can now use decoded.userId or decoded.email
    console.log("Decoded user:", decoded.email);
    const email = decoded.email;
    const findUser = await BookCar.findOne({ email })


    return NextResponse.json({ user: findUser });
  } catch (error) {
    console.error("Token error:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

}