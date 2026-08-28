/**
 * Seed script - run with `npm run seed` after MongoDB is connected.
 * Populates the courses collection with a realistic initial catalog.
 */
import { connectDB } from '../config/db.js'
import { Course } from '../models/Course.js'
import { env } from '../config/env.js'

const COURSES = [
  {
    _id: 'google-ai-essentials',
    title: 'Google AI Essentials',
    provider: 'Google',
    type: 'Specialization',
    rating: 4.8,
    reviews: 25000,
    duration: '1 month',
    level: 'Beginner',
    category: 'ai',
    skills: ['AI Fundamentals', 'Prompt Engineering', 'Generative AI'],
    price: 'Free trial',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    badge: 'Top AI program',
    description: 'Master the fundamentals of artificial intelligence with Google experts.',
    enrolled: 145000,
    certificateAvailable: true,
  },
  {
    _id: 'google-data-analytics',
    title: 'Google Data Analytics',
    provider: 'Google',
    type: 'Professional Certificate',
    rating: 4.8,
    reviews: 158000,
    duration: '6 months',
    level: 'Beginner',
    category: 'data',
    skills: ['SQL', 'R Programming', 'Tableau', 'Spreadsheet', 'Data Visualization'],
    price: 'Free trial',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    badge: 'Bestseller',
    description: 'Launch your career in data analytics.',
    enrolled: 980000,
    certificateAvailable: true,
  },
  {
    _id: 'ibm-ai-engineering',
    title: 'IBM AI Engineering',
    provider: 'IBM',
    type: 'Professional Certificate',
    rating: 4.7,
    reviews: 36000,
    duration: '4 months',
    level: 'Intermediate',
    category: 'ai',
    skills: ['Machine Learning', 'Deep Learning', 'Python', 'Neural Networks'],
    price: 'Free trial',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    badge: 'Top AI program',
    description: 'Master machine learning, deep learning, and AI engineering.',
    enrolled: 87000,
    certificateAvailable: true,
  },
  {
    _id: 'deep-learning-ai',
    title: 'Deep Learning Specialization',
    provider: 'DeepLearning.AI',
    type: 'Specialization',
    rating: 4.8,
    reviews: 41000,
    duration: '5 months',
    level: 'Intermediate',
    category: 'ai',
    skills: ['Neural Networks', 'TensorFlow', 'CNN', 'RNN', 'Transformers'],
    price: 'Free trial',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
    badge: 'Most popular',
    description: 'Become a deep learning expert.',
    enrolled: 234000,
    certificateAvailable: true,
  },
  {
    _id: 'microsoft-back-end',
    title: 'Microsoft Back-End Developer',
    provider: 'Microsoft',
    type: 'Professional Certificate',
    rating: 4.6,
    reviews: 12000,
    duration: '7 months',
    level: 'Beginner',
    category: 'tech',
    skills: ['C#', '.NET', 'Azure', 'SQL Server', 'Web API'],
    price: 'Free trial',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80',
    badge: 'New',
    description: 'Build scalable back-end systems with Microsoft technologies.',
    enrolled: 31000,
    certificateAvailable: true,
  },
  {
    _id: 'aws-cloud-architect',
    title: 'AWS Cloud Solutions Architect',
    provider: 'Amazon Web Services',
    type: 'Professional Certificate',
    rating: 4.7,
    reviews: 18000,
    duration: '3 months',
    level: 'Intermediate',
    category: 'cloud',
    skills: ['AWS', 'Cloud Architecture', 'EC2', 'S3', 'IAM'],
    price: 'Free trial',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    badge: 'Trending right now',
    description: 'Design and deploy scalable, secure AWS infrastructure.',
    enrolled: 56000,
    certificateAvailable: true,
  },
]

async function seed() {
  await connectDB()
  if (!env.mongodbUri) {
    console.log('[seed] No MONGODB_URI set, skipping.')
    process.exit(0)
  }

  console.log('[seed] Clearing existing courses...')
  await Course.deleteMany({})
  console.log('[seed] Inserting courses...')
  await Course.insertMany(COURSES)
  console.log(`[seed] Inserted ${COURSES.length} courses.`)
  process.exit(0)
}

seed().catch((err) => {
  console.error('[seed] Failed:', err)
  process.exit(1)
})
