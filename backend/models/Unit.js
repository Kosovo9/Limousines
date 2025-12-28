import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { 
    type: String, 
    enum: [
      'limo', 'party', 'armored', 'shuttle', 'bus', 'bike', 
      'water', 'heli', 'cargo', 'pet', 'senior', 'eco'
    ], 
    required: true 
  },
  title: String,
  description: String,
  images: [String], // Cloudinary
  video: String,
  city: String,
  features: [String],
  calendar: [{ date: Date, available: Boolean }],
  packages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Package' }],
  active: { type: Boolean, default: true }
}, { timestamps: true })

export default mongoose.model('Unit', schema)
