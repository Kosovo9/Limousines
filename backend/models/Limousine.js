import mongoose from 'mongoose'

export default mongoose.model(
  'Limousine',
  new mongoose.Schema({
    name: String,
    seats: Number,
    img: String,
    pricePerHour: Number,
    available: { type: Boolean, default: true },
  }, { timestamps: true })
)
