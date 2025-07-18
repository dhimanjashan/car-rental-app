import connectToMongo from "../../../app/middleware/mongoose";
import BookCar from "../../../app/models/BookCar";
import User from "../../../app/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToMongo();
    const body = await req.json();
    const {
      username,
      email,
      phone,
      slug,
      location,
      pickupdate,
      dropoffdate,
      image,
      name,
      price,
    } = body;

    // 1️⃣ Check if user exists in the `User` model
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User not found. Please register first." },
        { status: 404 }
      );
    }

    // 2️⃣ Check if a BookCar record already exists for this email
    let bookCar = await BookCar.findOne({ email });

    if (bookCar) {
      const alreadyBooked = bookCar.bookings.find((b) => b.slug === slug);
      if (alreadyBooked) {
        return NextResponse.json(
          { message: "This car is already booked." },
          { status: 200 }
        );
      }

      // Add booking to existing user's bookings
      bookCar.bookings.push({
        slug,
        pickupdate,
        dropoffdate,
        location,
        image,
        name,
        price,
      });
      await bookCar.save();

      return NextResponse.json(
        { message: "New car booked successfully." },
        { status: 200 }
      );
    }

    // 3️⃣ If BookCar entry doesn't exist, create a new one
    const newBooking = new BookCar({
      username,
      email,
      phone,
      bookings: [
        { slug, pickupdate, dropoffdate, location, image, name, price },
      ],
    });

    await newBooking.save();

    return NextResponse.json(
      { message: "Booked car successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error in booking car:", error);
    return new Response(JSON.stringify({ error: "Failed to book car" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
