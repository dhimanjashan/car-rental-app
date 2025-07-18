import connectToMongo from "../../../app/middleware/mongoose";
import Car from "../../../app/models/Car";

export async function GET() {
    try {
        await connectToMongo();
        const Cars = await Car.find();
        return new Response(JSON.stringify({ Cars }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Unable to fetch cars." }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
