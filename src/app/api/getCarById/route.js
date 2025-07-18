import connectToMongo from "../../../app/middleware/mongoose";
import Car from "../../../app/models/Car"

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const carId = searchParams.get("carId");
    console.log("carId",carId)

    await connectToMongo();
    const car = await Car.findById(carId);
    console.log("Cardata",car)

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
