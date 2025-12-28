import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  unit: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit' },
  name: { type: String, enum: ['Normal', 'Plus', 'Premium'] },
  price: Number,
  features: [String],
  photosLimit: Number,
  videoIncluded: Boolean,
  supportLevel: { type: String, enum: ['email', 'chat', 'whatsapp'] }
})

export default mongoose.model('Package', schema)
