import mongoose from 'mongoose'

const enrollmentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    courseId: { type: String, ref: 'Course', required: true, index: true },
    status: { type: String, enum: ['active', 'completed', 'dropped'], default: 'active' },
    enrolledAt: { type: Date, default: Date.now },
    completedAt: { type: Date, default: null },
    progress: {
      foundation: { type: Number, default: 0, min: 0, max: 100 },
      practice: { type: Number, default: 0, min: 0, max: 100 },
      jobReady: { type: Number, default: 0, min: 0, max: 100 },
      overall: { type: Number, default: 0, min: 0, max: 100 },
    },
    completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
    certificateId: { type: String, default: null },
  },
  { timestamps: true }
)

enrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true })
enrollmentSchema.index({ userId: 1, status: 1 })

export const Enrollment = mongoose.model('Enrollment', enrollmentSchema)

const quizAttemptSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: String, ref: 'Course', required: true },
    lessonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
    quizType: { type: String, enum: ['official', 'ai_generated'], default: 'official' },
    score: { type: Number, default: 0, min: 0, max: 100 },
    totalQuestions: { type: Number, default: 0 },
    correctAnswers: { type: Number, default: 0 },
    answers: [
      {
        questionId: String,
        selectedOption: Number,
        isCorrect: Boolean,
      },
    ],
    startedAt: { type: Date, default: Date.now },
    completedAt: { type: Date, default: null },
  },
  { timestamps: true }
)

quizAttemptSchema.index({ userId: 1, courseId: 1 })

export const QuizAttempt = mongoose.model('QuizAttempt', quizAttemptSchema)

const certificateSchema = new mongoose.Schema(
  {
    certificateId: { type: String, required: true, unique: true, index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: String, ref: 'Course', required: true },
    userName: { type: String, required: true },
    courseTitle: { type: String, required: true },
    issuedAt: { type: Date, default: Date.now },
    verificationHash: { type: String, required: true },
    pdfUrl: { type: String, default: '' },
  },
  { timestamps: true }
)

export const Certificate = mongoose.model('Certificate', certificateSchema)
