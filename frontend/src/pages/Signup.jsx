import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, User, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'

const LOGO_URL = 'https://res.cloudinary.com/dy7z0znum/image/upload/v1787922582/f4b70d0c-b23b-4131-9b5a-babc30819215-removebg-preview_ciyhvj.png'

const PERKS = [
  'Personalized learning path with Learnly AI',
  'Hands-on projects and verified certificates',
  'Career guidance and resume building',
  'Study planner, quiz generator, PDF notes',
]

export default function Signup() {
  const { signup } = useAuth()
  const { success, error } = useToast()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name) e.name = 'Name is required'
    else if (form.name.length < 2) e.name = 'Name is too short'
    if (!form.email) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.password) e.password = 'Password is required'
    else if (form.password.length < 8) e.password = 'Password must be at least 8 characters'
    if (form.password !== form.confirmPassword)
      e.confirmPassword = 'Passwords do not match'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const user = await signup({
        name: form.name,
        email: form.email,
        password: form.password,
      })
      success(`Welcome to Learnly, ${user.name?.split(' ')[0]}`)
      navigate('/onboarding')
    } catch (err) {
      error(err.response?.data?.error || 'Signup failed. Try a different email.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left - visual */}
      <div className="hidden lg:flex flex-1 relative bg-learnly-ink">
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative z-10 p-12 flex flex-col justify-end text-learnly-paper">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tightest mb-4 leading-tight">
            Start your journey.
            <br />
            <span className="italic font-light text-learnly-primary">Become who you want.</span>
          </h2>
          <ul className="space-y-2 mt-6">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-white/80">
                <CheckCircle2 size={16} className="text-learnly-primary flex-shrink-0" />
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right - form */}
      <div className="flex-1 flex items-center justify-center px-5 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="flex items-center gap-2 mb-12">
            <img src={LOGO_URL} alt="Learnly" className="h-7" />
            <span className="font-bold text-xl tracking-tightest">Learnly</span>
          </Link>

          <p className="caption mb-3">Join free</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tightest mb-2">
            Create your account
          </h1>
          <p className="text-learnly-muted mb-8">
            Already have an account?{' '}
            <Link to="/login" className="text-learnly-ink border-b border-learnly-ink hover:text-learnly-primary hover:border-learnly-primary">
              Log in
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="label-learnly" htmlFor="name">Full name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-learnly-muted" />
                <input
                  id="name"
                  type="text"
                  placeholder="Syeda Khan"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-learnly pl-10"
                  autoComplete="name"
                />
              </div>
              {errors.name && <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label className="label-learnly" htmlFor="email">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-learnly-muted" />
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-learnly pl-10"
                  autoComplete="email"
                />
              </div>
              {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label className="label-learnly" htmlFor="password">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-learnly-muted" />
                <input
                  id="password"
                  type="password"
                  placeholder="At least 8 characters"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input-learnly pl-10"
                  autoComplete="new-password"
                />
              </div>
              {errors.password && <p className="mt-1.5 text-xs text-red-600">{errors.password}</p>}
            </div>

            <div>
              <label className="label-learnly" htmlFor="confirmPassword">Confirm password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-learnly-muted" />
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  className="input-learnly pl-10"
                  autoComplete="new-password"
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1.5 text-xs text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            <p className="text-xs text-learnly-muted">
              By signing up, you agree to our{' '}
              <a href="#" className="underline hover:text-learnly-ink">Terms</a> and{' '}
              <a href="#" className="underline hover:text-learnly-ink">Privacy Policy</a>.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center"
            >
              {loading ? 'Creating account...' : 'Create free account'}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          <Link to="/" className="mt-8 inline-flex items-center gap-2 text-sm text-learnly-muted hover:text-learnly-ink transition-colors">
            <ArrowLeft size={14} />
            Back to home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
