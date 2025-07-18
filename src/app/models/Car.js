import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
    name: { type: String, required: true },
    fuelType: { type: String, required: true },
    transmission: { type: String, required: true },
    price: { type: Number, required: true },
    vehicle: { type: String, required: true },
    image: { type: String, required: true }
})

export default mongoose.models.Car || mongoose.model('Car', CarSchema);