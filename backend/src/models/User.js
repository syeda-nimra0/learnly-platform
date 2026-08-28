import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['student', 'instructor', 'admin'], default: 'student' },
    avatar: { type: String, default: '' },
    bio: { type: String, default: '', maxlength: 500 },
    age: { type: Number, min: 13, max: 120, default: null },
    onboarding: {
      completed: { type: Boolean, default: false },
      goal: { type: String, default: '' },
      roles: [{ type: String }],
      skills: [{ type: String }],
      jobTitle: { type: String, default: '' },
      education: { type: String, default: '' },
      completedAt: { type: Date, default: null },
    },
    refreshTokens: [{ token: String, createdAt: Date }],
  },
  { timestamps: true }
)

userSchema.methods.toJSON = function () {
  const obj = this.toObject()
  delete obj.passwordHash
  delete obj.refreshTokens
  delete obj.__v
  return obj
}

export const User = mongoose.model('User', userSchema)
