import User from "../../models/User";
import connectToMongo from "../../middleware/mongoose";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

export async function DELETE(req) {
    try {
        await connectToMongo();

        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
        }

        const findUser = await User.findOneAndDelete({ email });
        if (!findUser) {
            return NextResponse.json({ error: "User not found." }, { status: 400 });
        }

        const matchPassword = await bcrypt.compare(password, findUser.password);
        if (!matchPassword) {
            return NextResponse.json({ error: "Invalid credentials." }, { status: 400 });
        }

        if (findUser && matchPassword) {
            const token = jwt.sign(
                { email: findUser.email, name: findUser.name },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "2d" }
            );

            return NextResponse.json({ success: true });
        }
    } catch (err) {
        console.error("❌ Server Error:", err);
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}
