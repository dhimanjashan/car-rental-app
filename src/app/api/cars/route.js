import connectToMongo from "../../../app/middleware/mongoose"
import Car from "../../../app/models/Car"

export async function GET() {
    try {
        await connectToMongo();
        const Cars = await Car.find();
        return new Response(JSON.stringify({ Cars }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("❌ Error fetching Cars:", error); // Add this line
        return new Response(JSON.stringify({ error: "Failed to fetch Cars" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}