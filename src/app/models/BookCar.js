import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  slug: String,
  pickupdate: String,
  dropoffdate: String, bookedOn: {
    type: String,
    default: () => new Date().toISOString().split("T")[0],
  }, location: String,
  image: String,
  name: String,
  price: Number,
});

const bookCarSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  phone: String,
  bookings: [bookingSchema],
});

export default mongoose.models.BookCar || mongoose.model("BookCar", bookCarSchema);
