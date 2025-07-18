import Message from "@/app/models/Message";
import connectToMongo from "@/app/middleware/mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToMongo();
    const body = await req.json();
    const { name, email, message } = body;
    console.log(name,email,message);
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    const existUser=await Message.findOne({email});
    if(existUser){
        existUser.messages.push({ content: message });
        await existUser.save();
    }
    if(!existUser){
        const newMessage=new Message({
            name,email,messages:[{ content: message }]
        })
        await newMessage.save();
    }
    return NextResponse.json(
  { success: true, message: "Message stored successfully" },
  { status: 200 }
);
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to stored message" }), {
      status: 500,
    });
  }
}
