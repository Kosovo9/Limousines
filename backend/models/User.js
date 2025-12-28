import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const schema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true, trim: true },
  password: String,
  role: { type: String, default: 'client' },
  refreshTokenVersion: { type: Number, default: 0 },
}, { timestamps: true })

schema.pre('save', async function () {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 12)
})

schema.methods.comparePassword = function (p) {
  return bcrypt.compare(p, this.password)
}

export default mongoose.model('User', schema)
