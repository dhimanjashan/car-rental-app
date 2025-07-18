// app/api/createRental/route.ts
import { NextResponse } from "next/server";
import connectToMongo from "../../../app/middleware/mongoose";
import  {Rental}  from "../../models/Rental";

export async function POST(req: Request) {
  await connectToMongo();

  try {
    const body = await req.json();

    const rental = await Rental.create({
      userId: body.userId,
      carId: body.carId,
      pickupDate: new Date(body.pickupDate),
      returnDate: new Date(body.returnDate),
      // pickupConfirmed and returnConfirmed will default to false
      // rentalStatus defaults to "pending"
    });

    return NextResponse.json({ success: true, rental });
  } catch (error) {
    console.error("Error saving rental:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
