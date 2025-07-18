// import User from "@/app/models/User";
import connectToMongo from "../../../app/middleware/mongoose"
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "../../../app/models/User"



export async function GET(req) {
try {
    await connectToMongo();
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
  
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token,"JashanisASECRET");  // make sure .env is set
  
      // You can now use decoded.userId or decoded.email
      console.log("Decoded user:", decoded.email);
      const email=decoded.email;
      const findUser=await User.findOne({email})
      console.log(findUser._id)
  
      return NextResponse.json({ id: findUser._id,user:findUser });
    } catch (error) {
      console.error("Token error:", error);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

}