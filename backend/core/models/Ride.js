import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  serviceType: { 
    type: String, 
    enum: [
      'limo', 'taxi', 'shuttle', 'bus', 'bike', 
      'water', 'heli', 'cargo', 'pet', 'senior', 
      'eco', 'party', 'armored'
    ], 
    required: true 
  },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  pickup: {
    address: String,
    lat: Number,
    lng: Number,
    date: Date
  },
  dropoff: {
    address: String,
    lat: Number,
    lng: Number
  },
  price: Number,
  status: { type: String, enum: ['pending','confirmed','on-route','completed','cancelled'], default: 'pending' },
  paymentMethod: { type: String, enum: ['mp','paypal','cash'], default: 'mp' },
  metadata: mongoose.Schema.Types.Mixed // For specialized fields like 'champagne', 'petWeight', etc.
}, { timestamps: true })

export default mongoose.model('Ride', schema)
