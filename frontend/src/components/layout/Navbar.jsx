import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Menu, X, ChevronDown, LogOut, User as UserIcon, BookOpen, LayoutGrid, GraduationCap, Sparkles } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import { cn } from '../../lib/utils.js'

const LOGO_URL = 'https://res.cloudinary.com/dy7z0znum/image/upload/v1787922582/f4b70d0c-b23b-4131-9b5a-babc30819215-removebg-preview_ciyhvj.png'

const EXPLORE_ITEMS = [
  { label: 'All Courses', to: '/explore', icon: LayoutGrid },
  { label: 'Degrees', to: '/degrees', icon: GraduationCap },
  { label: 'My Learning', to: '/my-learning', icon: BookOpen },
  { label: 'Profile', to: '/profile', icon: UserIcon },
]

const FOR_ITEMS = [
  { label: 'For Individuals', to: '/explore' },
  { label: 'For Business', to: '/business' },
  { label: 'For Universities', to: '/universities' },
  { label: 'For Government', to: '/government' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [exploreOpen, setExploreOpen] = useState(false)
  const [forOpen, setForOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false)
    setExploreOpen(false)
    setForOpen(false)
    setSearchOpen(false)
  }, [location.pathname])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-learnly-paper/95 backdrop-blur-md border-b border-learnly-line'
            : 'bg-transparent'
        )}
      >
        <nav className="container-learnly flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={LOGO_URL}
              alt="Learnly"
              className="h-7 md:h-9 w-auto transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-bold text-xl md:text-2xl tracking-tightest">Learnly</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Explore dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setExploreOpen(true)}
              onMouseLeave={() => setExploreOpen(false)}
            >
              <button className="px-4 py-2 text-sm font-medium tracking-tight flex items-center gap-1 hover:text-learnly-primary transition-colors">
                Explore
                <ChevronDown size={14} className={cn('transition-transform', exploreOpen && 'rotate-180')} />
              </button>
              <AnimatePresence>
                {exploreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 pt-2 w-56"
                  >
                    <div className="bg-learnly-paper border border-learnly-line shadow-lg py-2">
                      {EXPLORE_ITEMS.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-learnly-mist transition-colors"
                        >
                          <item.icon size={16} />
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* For dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setForOpen(true)}
              onMouseLeave={() => setForOpen(false)}
            >
              <button className="px-4 py-2 text-sm font-medium tracking-tight flex items-center gap-1 hover:text-learnly-primary transition-colors">
                Solutions
                <ChevronDown size={14} className={cn('transition-transform', forOpen && 'rotate-180')} />
              </button>
              <AnimatePresence>
                {forOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 pt-2 w-52"
                  >
                    <div className="bg-learnly-paper border border-learnly-line shadow-lg py-2">
                      {FOR_ITEMS.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className="block px-4 py-2.5 text-sm hover:bg-learnly-mist transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/degrees" className="px-4 py-2 text-sm font-medium tracking-tight hover:text-learnly-primary transition-colors">
              Degrees
            </Link>

            {/* Search trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="ml-2 px-3 py-2 text-sm font-medium flex items-center gap-2 border border-learnly-line hover:border-learnly-ink transition-colors min-w-[180px]"
            >
              <Search size={14} />
              <span className="text-learnly-muted">Search courses...</span>
            </button>
          </div>

          {/* Right side - auth */}
          <div className="hidden lg:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <Link to="/my-learning" className="btn-ghost text-sm">
                  My Learning
                </Link>
                <div className="relative group">
                  <button className="flex items-center gap-2 px-3 py-2 hover:bg-learnly-mist transition-colors">
                    <div className="w-8 h-8 bg-learnly-ink text-learnly-paper flex items-center justify-center text-xs font-semibold">
                      {user?.name?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <ChevronDown size={14} />
                  </button>
                  <div className="absolute top-full right-0 pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="bg-learnly-paper border border-learnly-line shadow-lg py-2">
                      <div className="px-4 py-2 border-b border-learnly-line">
                        <p className="text-sm font-medium">Hello, {user?.name?.split(' ')[0] || 'Learner'}</p>
                        <p className="text-xs text-learnly-muted truncate">{user?.email}</p>
                      </div>
                      <Link to="/profile" className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-learnly-mist">
                        <UserIcon size={14} /> Profile
                      </Link>
                      <Link to="/my-learning" className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-learnly-mist">
                        <BookOpen size={14} /> My Learning
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-learnly-mist w-full text-left"
                      >
                        <LogOut size={14} /> Log out
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-ghost text-sm">
                  Log in
                </Link>
                <Link to="/signup" className="btn-primary text-sm">
                  Join for Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden bg-learnly-paper pt-20 px-5 pb-6 overflow-y-auto"
          >
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-learnly-muted" />
                <input
                  type="search"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-learnly pl-10"
                />
              </div>
            </form>

            <div className="space-y-1">
              <p className="caption py-2">Explore</p>
              {EXPLORE_ITEMS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center gap-3 py-3 border-b border-learnly-line text-base font-medium"
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              ))}

              <p className="caption pt-4 pb-2">Solutions</p>
              {FOR_ITEMS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block py-3 border-b border-learnly-line text-base font-medium"
                >
                  {item.label}
                </Link>
              ))}

              <Link to="/degrees" className="block py-3 border-b border-learnly-line text-base font-medium">
                Degrees
              </Link>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              {isAuthenticated ? (
                <>
                  <Link to="/profile" className="btn-secondary w-full justify-center">Profile</Link>
                  <button onClick={handleLogout} className="btn-ghost w-full justify-center text-learnly-ink">
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn-secondary w-full justify-center">Log in</Link>
                  <Link to="/signup" className="btn-primary w-full justify-center">Join for Free</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-screen search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-learnly-paper/95 backdrop-blur-md flex items-start justify-center pt-32 px-5"
            onClick={() => setSearchOpen(false)}
          >
            <motion.form
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onSubmit={handleSearch}
              className="w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-learnly-muted" />
                <input
                  autoFocus
                  type="search"
                  placeholder="What do you want to learn?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-learnly-line bg-learnly-paper text-lg focus:border-learnly-ink focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-learnly-muted hover:text-learnly-ink"
                >
                  <X size={20} />
                </button>
              </div>
              <p className="mt-4 text-sm text-learnly-muted">
                Press Enter to search or ESC to close
              </p>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
