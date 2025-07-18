import connectToMongo from "../../../app/models/BookCar";
import BookCar from "../../../app/models/BookCar"

export async function GET(req) {
  try {
    await connectToMongo();
    const searchParams = req.nextUrl.searchParams;
    const email = searchParams.get("email");
    // const slug = searchParams.get("slug");
    // console.log("Here is the slug",slug);
    console.log("Here is the email",email);

    const car = await BookCar.findOne({ email });
    console.log(car)
    // const booking = car.bookings.find(
    //   (b) => b.slug === slug
    // );

    // console.log("Dhiman", booking)

    return new Response(JSON.stringify({car }), {
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
