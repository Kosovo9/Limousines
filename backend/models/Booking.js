import mongoose from 'mongoose'

export default mongoose.model(
  'Booking',
  new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    limousine: { type: mongoose.Schema.Types.ObjectId, ref: 'Limousine' },
    date: Date,
    hours: Number,
    total: Number,
    status: { type: String, enum: ['pending', 'confirmed', 'done'], default: 'pending' },
  }, { timestamps: true })
)
