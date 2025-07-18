import connectToMongo from "../../middleware/mongoose";
import BookCar from "../../models/BookCar";

export async function PUT(req) {
  try {
    await connectToMongo();

    const searchParams = req.nextUrl.searchParams;
    const slug = searchParams.get("slug");

    if (!slug) {
      return new Response(JSON.stringify({ error: "Missing slug" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Remove booking object with matching slug from the bookings array
    const updatedCar = await BookCar.findOneAndUpdate(
      { "bookings.slug": slug }, // Find where bookings has this slug
      { $pull: { bookings: { slug } } }, // Pull it out of the array
      { new: true } // Return the updated document
    );

    if (!updatedCar) {
      return new Response(JSON.stringify({ error: "Booking not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({
      message: "Booking removed successfully",
      updatedCar
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("❌ Error removing booking:", error);
    return new Response(JSON.stringify({ error: "Failed to remove booking" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
