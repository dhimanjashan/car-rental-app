import connectToMongo from "../../middleware/mongoose";
import { Rental } from "../../models/Rental";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new Response(JSON.stringify({ error: "Missing userId" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectToMongo();
    const car = await Rental.find({ userId });

    return new Response(JSON.stringify({ car }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("❌ Error fetching rental data:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch rental data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
