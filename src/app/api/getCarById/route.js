import connectToMongo from "../../../app/middleware/mongoose";
import Car from "../../../app/models/Car";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const carId = searchParams.get("carId");

    if (!carId) {
      return new Response(JSON.stringify({ error: "Missing carId" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connectToMongo();
    const car = await Car.findById(carId);

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
