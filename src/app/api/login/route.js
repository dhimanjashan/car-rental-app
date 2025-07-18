import User from "../../../app/models/User"
import connectToMongo from "../../../app/middleware/mongoose";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import dotenv from "dotenv";
dotenv.config();

export async function POST(req) {
    try {
        console.log("frist")
        await connectToMongo();
        console.log("second");
        const body = await req.json();
        const { email, password } = body;
        if (!email || !password) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }
        console.log("third");
        const findUser = await User.findOne({ email });
        if (!findUser) {
            return NextResponse.json({ error: "User was not found" }, { status: 400 })
        }
        console.log("fourth");
        const matchPassword = await bcrypt.compare(password, findUser.password);
        if (!matchPassword) {
            return NextResponse.json({ error: "Invaild Credentials" }, { status: 400 })
        }
        console.log("fifth");
        if (findUser && matchPassword) {
            let token = jwt.sign({ email: findUser.email, name: findUser.name, }, process.env.JWT_SECRET_KEY, { expiresIn: "2d" })
            console.log("sixth");

            return NextResponse.json({
                success: true,
                token,
                email: findUser.email,
            });
        }
    }
    catch (err) {
        console.error("❌ Server Error:", err);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}