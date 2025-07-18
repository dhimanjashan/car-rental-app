import connectToMongo from "../../middleware/mongoose";
import BookCar from "../../models/BookCar";

export async function PUT(req) {
  try {
    await connectToMongo();

    const searchParams = req.nextUrl.searchParams;
    const slug = searchParams.get("slug");

    if (!slug) {
      return new Response(JSON.stringify({ error: "Slug is required." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const updatedCar = await BookCar.findOneAndUpdate(
      { "bookings.slug": slug },
      { $pull: { bookings: { slug } } },
      { new: true }
    );

    if (!updatedCar) {
      return new Response(JSON.stringify({ error: "Booking not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ message: "Booking deleted successfully.", updatedCar }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete booking." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
