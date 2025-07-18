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

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User not found. Please create an account." },
        { status: 404 }
      );
    }

    let bookCar = await BookCar.findOne({ email });

    if (bookCar) {
      const alreadyBooked = bookCar.bookings.find((b) => b.slug === slug);
      if (alreadyBooked) {
        return NextResponse.json(
          { message: "This car is already booked for your account." },
          { status: 200 }
        );
      }

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
        { message: "Booking added successfully." },
        { status: 200 }
      );
    }

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
      { message: "Car booked successfully." },
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Something went wrong while booking." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
