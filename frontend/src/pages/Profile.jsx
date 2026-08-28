import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  Camera,
  Award,
  BookOpen,
  TrendingUp,
  Clock,
  Edit3,
  Save,
  X,
  CheckCircle2,
  Star,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'
import { Input, Textarea } from '../components/ui/Input.jsx'
import { cn, getInitials } from '../lib/utils.js'

const ACHIEVEMENTS = [
  { id: 1, label: 'First Course Enrolled', icon: BookOpen, earned: true },
  { id: 2, label: 'Foundation Level Complete', icon: TrendingUp, earned: true },
  { id: 3, label: 'Quiz Master — 90%+ avg', icon: Star, earned: true },
  { id: 4, label: 'Practice Level Complete', icon: Award, earned: false },
  { id: 5, label: 'First Certificate', icon: Award, earned: false },
  { id: 6, label: 'Job Ready Graduate', icon: CheckCircle2, earned: false },
]

export default function Profile() {
  const { user, updateProfile } = useAuth()
  const { success, error: showError } = useToast()
  const fileInputRef = useRef(null)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    age: user?.age || '',
    avatar: user?.avatar || '',
  })

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateProfile(form)
      success('Profile updated')
      setEditing(false)
    } catch (err) {
      showError(err.response?.data?.error || 'Could not update profile')
    } finally {
      setSaving(false)
    }
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      showError('Image must be under 5MB')
      return
    }
    if (!file.type.startsWith('image/')) {
      showError('Please upload an image file')
      return
    }
    // For demo - in production this would upload to Cloudinary via the backend
    const reader = new FileReader()
    reader.onload = () => {
      setForm({ ...form, avatar: reader.result })
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="container-learnly">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Left - profile card */}
          <aside className="lg:col-span-4">
            <div className="border border-learnly-line p-6 sticky top-24">
              {/* Avatar */}
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 bg-learnly-ink text-learnly-paper flex items-center justify-center text-3xl font-bold tracking-tight overflow-hidden">
                  {form.avatar ? (
                    <img src={form.avatar} alt={form.name} className="w-full h-full object-cover" />
                  ) : (
                    getInitials(form.name)
                  )}
                </div>
                <button
                  onClick={handleAvatarClick}
                  className="absolute -bottom-1 -right-1 w-8 h-8 bg-learnly-primary text-learnly-ink flex items-center justify-center hover:bg-learnly-secondary transition-colors"
                  aria-label="Change avatar"
                >
                  <Camera size={14} />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>

              <h1 className="text-2xl font-bold tracking-tightest mb-1">{form.name || 'Learner'}</h1>
              <p className="text-sm text-learnly-muted mb-4">{user?.email}</p>

              {form.bio && <p className="text-sm text-learnly-ink leading-relaxed mb-4">{form.bio}</p>}

              {form.age && (
                <p className="text-xs text-learnly-muted">
                  Age: <span className="font-medium text-learnly-ink">{form.age}</span>
                </p>
              )}

              <button
                onClick={() => setEditing(!editing)}
                className="mt-4 w-full btn-secondary"
              >
                <Edit3 size={14} />
                {editing ? 'Cancel edit' : 'Edit profile'}
              </button>
            </div>
          </aside>

          {/* Right - main content */}
          <main className="lg:col-span-8 space-y-12">
            {/* Edit form */}
            {editing && (
              <motion.section
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-learnly-line p-6"
              >
                <h2 className="heading-4 mb-6">Edit profile</h2>
                <div className="space-y-5">
                  <Input
                    label="Full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <Input
                    label="Age"
                    type="number"
                    min="13"
                    max="120"
                    value={form.age}
                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                  />
                  <Textarea
                    label="Bio"
                    placeholder="Tell us about yourself..."
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  />
                  <div className="flex gap-3">
                    <button onClick={handleSave} disabled={saving} className="btn-primary">
                      <Save size={14} />
                      {saving ? 'Saving...' : 'Save changes'}
                    </button>
                    <button onClick={() => setEditing(false)} className="btn-ghost">
                      <X size={14} />
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.section>
            )}

            {/* Stats */}
            <section>
              <h2 className="heading-4 mb-6">Learning stats</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-learnly-line border border-learnly-line">
                {[
                  { label: 'Courses enrolled', value: 3, icon: BookOpen },
                  { label: 'Courses completed', value: 1, icon: Award },
                  { label: 'Hours learned', value: 24, icon: Clock },
                  { label: 'Avg quiz score', value: '87%', icon: TrendingUp },
                ].map((stat) => (
                  <div key={stat.label} className="bg-learnly-paper p-5 text-center">
                    <stat.icon size={18} className="mx-auto mb-2 text-learnly-primary" />
                    <div className="text-2xl font-bold tracking-tightest">{stat.value}</div>
                    <div className="text-xs text-learnly-muted">{stat.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Achievements */}
            <section>
              <h2 className="heading-4 mb-6">Achievements</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {ACHIEVEMENTS.map((a) => (
                  <div
                    key={a.id}
                    className={cn(
                      'p-5 border text-center',
                      a.earned
                        ? 'border-learnly-ink bg-learnly-paper'
                        : 'border-learnly-line bg-learnly-mist opacity-60'
                    )}
                  >
                    <a.icon
                      size={28}
                      className={cn(
                        'mx-auto mb-3',
                        a.earned ? 'text-learnly-primary' : 'text-learnly-muted'
                      )}
                    />
                    <p className="text-sm font-medium tracking-tight">{a.label}</p>
                    {a.earned && (
                      <p className="text-xs text-emerald-700 mt-1 flex items-center justify-center gap-1">
                        <CheckCircle2 size={11} /> Earned
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Certificates */}
            <section>
              <h2 className="heading-4 mb-6">Certificates</h2>
              <div className="border border-dashed border-learnly-line p-8 text-center">
                <Award size={32} className="text-learnly-muted mx-auto mb-3" />
                <p className="text-sm text-learnly-muted">
                  No certificates yet. Complete all three levels of any course to earn your first
                  verified certificate.
                </p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
