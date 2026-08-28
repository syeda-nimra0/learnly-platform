import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    provider: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ['Course', 'Specialization', 'Professional Certificate', 'Guided Project', 'Project', 'Degree'],
      default: 'Course',
    },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviews: { type: Number, default: 0 },
    duration: { type: String, default: '' },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    category: { type: String, required: true, index: true },
    skills: [{ type: String }],
    prerequisites: [{ type: String }],
    price: { type: String, default: 'Free trial' },
    image: { type: String, default: '' },
    badge: { type: String, default: '' },
    description: { type: String, default: '' },
    enrolled: { type: Number, default: 0 },
    completionRate: { type: Number, default: 0, min: 0, max: 100 },
    certificateAvailable: { type: Boolean, default: true },
    modules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Module' }],
    instructors: [{ type: String }],
  },
  { timestamps: true, _id: false }
)

courseSchema.index({ title: 'text', description: 'text', skills: 'text' })
courseSchema.index({ category: 1, level: 1 })
courseSchema.index({ provider: 1 })

export const Course = mongoose.model('Course', courseSchema)

const moduleSchema = new mongoose.Schema(
  {
    courseId: { type: String, ref: 'Course', required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    level: { type: String, enum: ['foundation', 'practice', 'job-ready'], required: true },
    order: { type: Number, default: 0 },
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  },
  { timestamps: true }
)

export const Module = mongoose.model('Module', moduleSchema)

const lessonSchema = new mongoose.Schema(
  {
    moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true, index: true },
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ['video', 'reading', 'exercise', 'quiz', 'project'],
      default: 'video',
    },
    duration: { type: String, default: '' },
    content: { type: String, default: '' },
    order: { type: Number, default: 0 },
    resources: [
      {
        title: String,
        url: String,
        type: { type: String, enum: ['pdf', 'link', 'video', 'file'], default: 'link' },
      },
    ],
  },
  { timestamps: true }
)

export const Lesson = mongoose.model('Lesson', lessonSchema)
