import Car from "../../../app/models/Car";
import connectToMongo from "../../../app/middleware/mongoose";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await connectToMongo();

        const searchParams = req.nextUrl.searchParams;
        const name = searchParams.get("carname");

        if (!name) {
            return NextResponse.json({ error: "Car name is required" }, { status: 400 });
        }

        const searchCar = await Car.findOne({
            name: { $regex: name, $options: "i" },
        });

        if (!searchCar) {
            return NextResponse.json({ message: "No car found" }, { status: 404 });
        }

        return NextResponse.json({ searchCar }, { status: 200 });
    } catch (error) {
        console.error("SearchCar API error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
