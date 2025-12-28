import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: [
      'limo', 'taxi', 'shuttle', 'bus', 'bike', 
      'water', 'heli', 'cargo', 'pet', 'senior', 
      'eco', 'party', 'armored'
    ], 
    required: true 
  },
  brand: String,
  model: String,
  plate: { type: String, unique: true },
  capacity: Number,
  amenities: [String], // wifi, ac, bar, red-carpet, etc.
  images: [String], // Cloudinary URLs
  active: { type: Boolean, default: true }
}, { timestamps: true })

export default mongoose.model('Vehicle', schema)
