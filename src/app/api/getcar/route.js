import connectToMongo from "../../../app/middleware/mongoose";
import Car from "../../models/Car";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return new Response(JSON.stringify({ error: "Missing car identifier" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectToMongo();
    const car = await Car.findOne({ slug });

    return new Response(JSON.stringify({ car }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("❌ Error fetching car:", error);
    return new Response(JSON.stringify({ error: "Failed to retrieve car details" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
