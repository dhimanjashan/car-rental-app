// models/Rental.ts
import mongoose, { Document, Schema } from "mongoose";

interface RentalType extends Document {
  userId: mongoose.Types.ObjectId;
  carId: mongoose.Types.ObjectId;
  pickupDate: Date;
  returnDate: Date;
  pickupConfirmed: boolean;
  returnConfirmed: boolean;
  rentalStatus: "pending" | "active" | "completed" | "cancelled";
}

const rentalSchema = new Schema<RentalType>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  carId: { type: Schema.Types.ObjectId, ref: "Car", required: true },
  pickupDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  pickupConfirmed: { type: Boolean, default: false },
  returnConfirmed: { type: Boolean, default: false },
  rentalStatus: {
    type: String,
    enum: ["pending", "active", "completed", "cancelled"],
    default: "pending",
  },
});

export const Rental = mongoose.models.Rental as mongoose.Model<RentalType> || mongoose.model<RentalType>("Rental", rentalSchema);
