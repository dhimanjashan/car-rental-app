import connectToMongo from "../../../app/middleware/mongoose";
import { Rental } from "../../models/Rental";

export async function GET(req) {
  await connectToMongo();

  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userId");

  if (!userId) {
    return Response.json({ error: "User ID is required." }, { status: 400 });
  }

  const now = new Date();

  const countCurrentRentals = await Rental.countDocuments({
    userId,
    rentalStatus: "active",
    pickupConfirmed: true,
    returnConfirmed: false,
    returnDate: { $gte: now },
  });

  const currentRentals = await Rental.find({
    userId,
    rentalStatus: "active",
    pickupConfirmed: true,
    returnConfirmed: false,
    returnDate: { $gte: now },
  });

  const totalRentals = await Rental.countDocuments({
    userId,
    rentalStatus: "completed",
    pickupConfirmed: true,
    returnConfirmed: true,
    returnDate: { $gte: now },
  });

  const pendingRentals = await Rental.countDocuments({
    userId,
    rentalStatus: "pending",
    pickupConfirmed: false,
    returnConfirmed: false,
    returnDate: { $gte: now },
  });

  return Response.json({
    countCurrentRentals,
    totalRentals,
    pendingRentals,
    currentRentals,
  });
}
