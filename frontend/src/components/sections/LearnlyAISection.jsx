import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Sparkles,
  FileText,
  GraduationCap,
  Globe,
  BookOpen,
  ClipboardList,
  Briefcase,
  Compass,
  TrendingUp,
  Calendar,
} from 'lucide-react'
import BlurText from '../animations/BlurText.jsx'

const AI_FEATURES = [
  {
    id: 'career_navigator',
    label: 'Career Navigator',
    description: 'Personalized career paths based on your goals, skills, and progress. AI explains why each path fits and what to learn next.',
    icon: Compass,
    color: '#80B7FA',
  },
  {
    id: 'course_advisor',
    label: 'Course Advisor',
    description: 'Analyzes whether a course is right for your level. Recommends prerequisites or alternatives when a course is too advanced.',
    icon: BookOpen,
    color: '#95C3FA',
  },
  {
    id: 'lesson_tutor',
    label: 'Lesson Tutor',
    description: 'Asks questions about your current lesson, gets simpler explanations, examples, and code walkthroughs.',
    icon: Sparkles,
    color: '#80B7FA',
  },
  {
    id: 'quiz_generator',
    label: 'AI Quiz Generator',
    description: 'Practice quizzes from any lesson: multiple-choice, true/false, scenario-based. Adjustable difficulty, with answer explanations.',
    icon: ClipboardList,
    color: '#95C3FA',
  },
  {
    id: 'study_planner',
    label: 'Study Planner',
    description: 'Daily and weekly plans that fit your available study time, current progress, and target completion date.',
    icon: Calendar,
    color: '#80B7FA',
  },
  {
    id: 'notes_pdf',
    label: 'Notes & PDF Assistant',
    description: 'Concise revision notes, key concepts, definitions, and downloadable PDFs from authorized course content.',
    icon: FileText,
    color: '#95C3FA',
  },
  {
    id: 'translation',
    label: 'Translation Assistant',
    description: 'Translate course content and notes into supported languages. Preserves technical terms and code syntax.',
    icon: Globe,
    color: '#80B7FA',
  },
  {
    id: 'resume',
    label: 'Career & Resume Assistant',
    description: 'Build resumes using only your verified skills, courses, certificates, and projects. Never invents experience.',
    icon: GraduationCap,
    color: '#95C3FA',
  },
  {
    id: 'progress',
    label: 'Learning Progress',
    description: 'Explains your current progress, identifies strengths and weak areas, recommends what to learn next.',
    icon: TrendingUp,
    color: '#80B7FA',
  },
]

/**
 * LearnlyAISection - showcases the AI assistant with all 9 features.
 * Uses the FlowingMenu animation for an interactive feel.
 */
export default function LearnlyAISection() {
  return (
    <section className="section-padding bg-learnly-ink text-learnly-paper relative overflow-hidden">
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="container-learnly relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
          <div>
            <p className="caption text-learnly-primary mb-4">Learnly AI</p>
            <h2 className="text-5xl md:text-7xl font-bold tracking-ultra leading-[0.95] mb-6">
              <BlurText text="Your AI learning" />
              <br />
              <span className="italic font-light text-learnly-primary">partner, deeply</span>
              <br />
              <BlurText text="integrated." delay={0.2} />
            </h2>
            <p className="text-lg text-white/70 max-w-lg leading-relaxed">
              Not a generic chatbot. Not a separate ChatGPT clone. Learnly AI is woven into every
              part of the platform—understanding your context, respecting your privacy, and
              helping you decide what to learn next.
            </p>
          </div>

          <div className="relative">
            <div className="bg-white/5 border border-white/10 p-8 backdrop-blur-sm">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 bg-learnly-primary text-learnly-ink flex items-center justify-center font-bold flex-shrink-0">
                  L
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-learnly-primary mb-1">Learnly AI</p>
                  <p className="text-sm text-white/80 leading-relaxed">
                    Based on your goal of becoming a Data Scientist and your progress in Python
                    Programming, I recommend starting the IBM AI Engineering certificate next.
                    Want me to draft a 6-week study plan?
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/40">
                <Sparkles size={12} className="text-learnly-primary" />
                <span>Powered by Gemini · Server-side secured · Privacy-first</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {AI_FEATURES.map((feature, i) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5% 0px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
              className="bg-learnly-ink p-6 hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                  style={{ background: feature.color, color: '#0A0A0A' }}
                >
                  <feature.icon size={16} />
                </div>
                <h3 className="font-semibold tracking-tight pt-1.5">{feature.label}</h3>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-learnly-primary text-learnly-ink px-8 py-4 font-medium hover:bg-learnly-paper transition-colors"
          >
            Try Learnly AI free
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
