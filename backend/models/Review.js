import mongoose from 'mongoose'

export default mongoose.model(
  'Review',
  new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
    ipfsHash: String,
  }, { timestamps: true })
)
