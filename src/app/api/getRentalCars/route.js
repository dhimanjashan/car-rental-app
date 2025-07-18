import connectToMongo from "../../middleware/mongoose";
import { Rental } from "../../models/Rental";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    console.log(userId)

    await connectToMongo();
    const car = await Rental.find({ userId });
    console.log(car)

    return new Response(JSON.stringify({ car }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("❌ Error fetching car:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch car" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
