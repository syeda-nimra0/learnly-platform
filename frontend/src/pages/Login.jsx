import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { Input } from '../components/ui/Input.jsx'
import PageLoader from '../components/ui/PageLoader.jsx'

const LOGO_URL = 'https://res.cloudinary.com/dy7z0znum/image/upload/v1787922582/f4b70d0c-b23b-4131-9b5a-babc30819215-removebg-preview_ciyhvj.png'

export default function Login() {
  const { login } = useAuth()
  const { success, error } = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'

  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.email) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.password) e.password = 'Password is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const user = await login(form)
      success(`Welcome back, ${user.name?.split(' ')[0] || 'learner'}`)
      navigate(from)
    } catch (err) {
      error(err.response?.data?.error || 'Login failed. Check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left - form */}
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

          <p className="caption mb-3">Welcome back</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tightest mb-2">
            Log in to continue learning
          </h1>
          <p className="text-learnly-muted mb-8">
            Don't have an account?{' '}
            <Link to="/signup" className="text-learnly-ink border-b border-learnly-ink hover:text-learnly-primary hover:border-learnly-primary">
              Join for free
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input-learnly pl-10"
                  autoComplete="current-password"
                />
              </div>
              {errors.password && <p className="mt-1.5 text-xs text-red-600">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-learnly-primary" />
                <span className="text-learnly-muted">Remember me</span>
              </label>
              <a href="#" className="text-learnly-primary hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center"
            >
              {loading ? 'Logging in...' : 'Log in'}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          <Link to="/" className="mt-8 inline-flex items-center gap-2 text-sm text-learnly-muted hover:text-learnly-ink transition-colors">
            <ArrowLeft size={14} />
            Back to home
          </Link>
        </motion.div>
      </div>

      {/* Right - visual */}
      <div className="hidden lg:flex flex-1 relative bg-learnly-ink">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-10 p-12 flex flex-col justify-end text-learnly-paper">
          <blockquote className="text-3xl font-medium tracking-tight leading-snug mb-4">
            "Learnly rebuilt my confidence and showed me I could dream bigger."
          </blockquote>
          <p className="text-white/70">Noeris B. — Junior Frontend Developer</p>
        </div>
      </div>
    </div>
  )
}
