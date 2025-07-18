import { NextResponse } from "next/server";
import connectToMongo from "../../../app/middleware/mongoose";
import { Rental } from "../../models/Rental";

export async function POST(req: Request) {
  await connectToMongo();

  try {
    const body = await req.json();

    const rental = await Rental.create({
      userId: body.userId,
      carId: body.carId,
      pickupDate: new Date(body.pickupDate),
      returnDate: new Date(body.returnDate),
    });

    return NextResponse.json({ success: true, rental });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to create rental." },
      { status: 500 }
    );
  }
}
