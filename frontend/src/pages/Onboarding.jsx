import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowRight, ArrowLeft, Check } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import {
  ONBOARDING_GOALS,
  ONBOARDING_ROLES,
  ONBOARDING_SKILLS,
  EDUCATION_LEVELS,
} from '../data/courses.js'
import { cn } from '../lib/utils.js'

const LOGO_URL = 'https://res.cloudinary.com/dy7z0znum/image/upload/v1787922582/f4b70d0c-b23b-4131-9b5a-babc30819215-removebg-preview_ciyhvj.png'

const TOTAL_STEPS = 5

export default function Onboarding() {
  const { user, completeOnboarding } = useAuth()
  const { error: showError } = useToast()
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [data, setData] = useState({
    goal: '',
    roles: [],
    skills: [],
    jobTitle: '',
    education: '',
  })
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [showAllRoles, setShowAllRoles] = useState(false)

  const toggleArrayItem = (key, value) => {
    setData((prev) => {
      const arr = prev[key]
      if (arr.includes(value)) {
        return { ...prev, [key]: arr.filter((v) => v !== value) }
      }
      return { ...prev, [key]: [...arr, value] }
    })
  }

  const canProceed = () => {
    if (step === 1) return !!data.goal
    if (step === 2) return data.roles.length > 0
    if (step === 3) return data.skills.length > 0
    if (step === 4) return !!data.jobTitle.trim()
    if (step === 5) return !!data.education
    return false
  }

  const handleNext = () => {
    if (!canProceed()) return
    if (step < TOTAL_STEPS) setStep(step + 1)
    else handleFinish()
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleFinish = async () => {
    setLoading(true)
    try {
      await completeOnboarding(data)
      navigate('/welcome')
    } catch (err) {
      showError(err.response?.data?.error || 'Could not save your answers.')
    } finally {
      setLoading(false)
    }
  }

  const visibleRoles = showAllRoles ? ONBOARDING_ROLES : ONBOARDING_ROLES.slice(0, 9)
  const filteredSkills = ONBOARDING_SKILLS.filter((s) =>
    s.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-learnly-paper pt-24 pb-12">
      <div className="container-learnly max-w-4xl">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-2">
            <img src={LOGO_URL} alt="Learnly" className="h-7" />
            <span className="font-bold text-lg tracking-tightest">Learnly</span>
          </div>
          <div className="text-sm text-learnly-muted">
            Signed in as <span className="font-medium text-learnly-ink">{user?.email}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-2 text-sm">
            <span className="text-learnly-muted">
              Tell me a little about yourself so I can make the best recommendations.
            </span>
            <span className="font-medium">
              Step {step} of {TOTAL_STEPS}
            </span>
          </div>
          <div className="h-1 bg-learnly-line">
            <motion.div
              className="h-full bg-learnly-primary"
              initial={{ width: 0 }}
              animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Step 1 - Goal */}
            {step === 1 && (
              <div>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tightest mb-2">
                  First, what's your goal?
                </h1>
                <p className="text-learnly-muted mb-10">
                  We'll tailor everything around this answer.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {ONBOARDING_GOALS.map((goal) => (
                    <button
                      key={goal.id}
                      onClick={() => setData({ ...data, goal: goal.id })}
                      className={cn(
                        'text-left p-5 border transition-all duration-200',
                        data.goal === goal.id
                          ? 'border-learnly-ink bg-learnly-ink text-learnly-paper'
                          : 'border-learnly-line bg-learnly-paper hover:border-learnly-ink'
                      )}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold tracking-tight">{goal.label}</h3>
                        {data.goal === goal.id && <Check size={18} />}
                      </div>
                      <p className={cn(
                        'text-sm',
                        data.goal === goal.id ? 'text-white/70' : 'text-learnly-muted'
                      )}>
                        {goal.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2 - Roles */}
            {step === 2 && (
              <div>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tightest mb-2">
                  Great! Which role(s) are you interested in?
                </h1>
                <p className="text-learnly-muted mb-8">Select all that apply.</p>

                <div className="relative mb-6">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-learnly-muted" />
                  <input
                    type="search"
                    placeholder="Find your best role"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input-learnly pl-10"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {visibleRoles
                    .filter((r) => r.toLowerCase().includes(search.toLowerCase()))
                    .map((role) => (
                      <button
                        key={role}
                        onClick={() => toggleArrayItem('roles', role)}
                        className={cn(
                          'p-4 border text-left transition-all duration-200',
                          data.roles.includes(role)
                            ? 'border-learnly-ink bg-learnly-ink text-learnly-paper'
                            : 'border-learnly-line bg-learnly-paper hover:border-learnly-ink'
                        )}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="w-9 h-9 bg-learnly-primary text-learnly-ink flex items-center justify-center text-xs font-bold">
                            {role.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                          </div>
                          {data.roles.includes(role) && <Check size={14} />}
                        </div>
                        <p className="text-sm font-medium leading-tight">{role}</p>
                      </button>
                    ))}
                </div>

                {!showAllRoles && (
                  <button
                    onClick={() => setShowAllRoles(true)}
                    className="mt-6 text-sm font-medium border-b border-learnly-ink pb-1 hover:text-learnly-primary hover:border-learnly-primary"
                  >
                    View more roles
                  </button>
                )}
              </div>
            )}

            {/* Step 3 - Skills */}
            {step === 3 && (
              <div>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tightest mb-2">
                  Select the skills you'd like to develop
                </h1>
                <p className="text-learnly-muted mb-8">
                  Below are some of our most popular skills.
                </p>

                <div className="relative mb-6">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-learnly-muted" />
                  <input
                    type="search"
                    placeholder="Search skills..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input-learnly pl-10"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {filteredSkills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => toggleArrayItem('skills', skill)}
                      className={cn(
                        'px-4 py-2 border text-sm font-medium transition-all duration-200',
                        data.skills.includes(skill)
                          ? 'border-learnly-ink bg-learnly-ink text-learnly-paper'
                          : 'border-learnly-line bg-learnly-paper hover:border-learnly-ink'
                      )}
                    >
                      {skill}
                    </button>
                  ))}
                </div>

                {data.skills.length > 0 && (
                  <p className="mt-6 text-sm text-learnly-muted">
                    {data.skills.length} skill{data.skills.length > 1 ? 's' : ''} selected
                  </p>
                )}
              </div>
            )}

            {/* Step 4 - Job title */}
            {step === 4 && (
              <div>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tightest mb-2">
                  What's your current job title?
                </h1>
                <p className="text-learnly-muted mb-8">
                  This helps us understand your starting point.
                </p>

                <div className="relative mb-6">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-learnly-muted" />
                  <input
                    type="text"
                    placeholder="e.g. Marketing Coordinator, Student, Software Engineer..."
                    value={data.jobTitle}
                    onChange={(e) => setData({ ...data, jobTitle: e.target.value })}
                    className="input-learnly pl-10"
                    autoFocus
                  />
                </div>

                <p className="text-sm text-learnly-muted mb-3">Or pick a common one:</p>
                <div className="flex flex-wrap gap-2">
                  {['Student', 'Software Engineer', 'Teacher', 'Marketing Manager', 'Designer', 'Data Analyst', 'Project Manager', 'Not employed'].map((title) => (
                    <button
                      key={title}
                      onClick={() => setData({ ...data, jobTitle: title })}
                      className={cn(
                        'px-3 py-1.5 border text-xs font-medium transition-all',
                        data.jobTitle === title
                          ? 'border-learnly-ink bg-learnly-ink text-learnly-paper'
                          : 'border-learnly-line hover:border-learnly-ink'
                      )}
                    >
                      {title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5 - Education */}
            {step === 5 && (
              <div>
                <h1 className="text-3xl md:text-5xl font-bold tracking-tightest mb-2">
                  Got it! What's your highest level of education?
                </h1>
                <p className="text-learnly-muted mb-8">This helps us calibrate recommendations.</p>

                <div className="space-y-2">
                  {EDUCATION_LEVELS.map((edu) => (
                    <button
                      key={edu}
                      onClick={() => setData({ ...data, education: edu })}
                      className={cn(
                        'w-full text-left p-4 border transition-all duration-200 flex items-center justify-between',
                        data.education === edu
                          ? 'border-learnly-ink bg-learnly-ink text-learnly-paper'
                          : 'border-learnly-line bg-learnly-paper hover:border-learnly-ink'
                      )}
                    >
                      <span className="text-sm font-medium">{edu}</span>
                      {data.education === edu && <Check size={16} />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer nav */}
        <div className="flex items-center justify-between mt-12 pt-6 border-t border-learnly-line">
          <button
            onClick={handleBack}
            disabled={step === 1 || loading}
            className="btn-secondary disabled:opacity-30"
          >
            <ArrowLeft size={14} />
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed() || loading}
            className="btn-primary"
          >
            {loading ? 'Saving...' : step === TOTAL_STEPS ? 'Finish' : 'Next'}
            {!loading && <ArrowRight size={14} />}
          </button>
        </div>
      </div>
    </div>
  )
}
