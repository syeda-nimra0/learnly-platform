import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Twitter, Linkedin, Youtube, Github } from 'lucide-react'

const LOGO_URL = 'https://res.cloudinary.com/dy7z0znum/image/upload/v1787922582/f4b70d0c-b23b-4131-9b5a-babc30819215-removebg-preview_ciyhvj.png'

const FOOTER_COLUMNS = [
  {
    title: 'Explore',
    links: [
      { label: 'All Courses', to: '/explore' },
      { label: 'Categories', to: '/explore' },
      { label: 'Career Paths', to: '/explore' },
      { label: 'Certificates', to: '/explore' },
      { label: 'Degrees', to: '/degrees' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'For Individuals', to: '/explore' },
      { label: 'For Business', to: '/business' },
      { label: 'For Universities', to: '/universities' },
      { label: 'For Government', to: '/government' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'What We Offer', to: '/' },
      { label: 'Leadership', to: '/' },
      { label: 'Careers', to: '/' },
      { label: 'Become a Partner', to: '/' },
      { label: 'Press', to: '/' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Learners', to: '/' },
      { label: 'Partners', to: '/' },
      { label: 'Beta Testers', to: '/' },
      { label: 'Blog', to: '/' },
      { label: 'The Learnly Podcast', to: '/' },
    ],
  },
  {
    title: 'More',
    links: [
      { label: 'Terms', to: '/' },
      { label: 'Privacy', to: '/' },
      { label: 'Help', to: '/' },
      { label: 'Accessibility', to: '/' },
      { label: 'Contact', to: '/' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-learnly-ink text-learnly-paper border-t border-learnly-ink">
      {/* Newsletter strip */}
      <div className="border-b border-white/10">
        <div className="container-learnly py-14 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="caption text-learnly-primary mb-3">Stay in the loop</p>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tightest leading-tight">
              Get the best of Learnly, weekly.
            </h3>
            <p className="text-white/60 mt-3 max-w-md">
              New courses, career guides, AI study tips, and product updates. No spam, unsubscribe anytime.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex gap-2 w-full"
          >
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="flex-1 px-4 py-3 bg-white/5 border border-white/20 text-learnly-paper placeholder-white/40 focus:border-learnly-primary focus:outline-none"
            />
            <button type="submit" className="btn-primary bg-learnly-primary text-learnly-ink hover:bg-learnly-paper">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="container-learnly py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
        <div className="col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <img src={LOGO_URL} alt="Learnly" className="h-8 w-auto" />
          </Link>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            Learnly helps you understand what to learn, why to learn it, how to learn it, and what to do next.
            Powered by Learnly AI.
          </p>
          <div className="flex items-center gap-4 mt-6">
            {[
              { icon: Twitter, label: 'Twitter' },
              { icon: Linkedin, label: 'LinkedIn' },
              { icon: Youtube, label: 'YouTube' },
              { icon: Github, label: 'GitHub' },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="text-white/60 hover:text-learnly-primary transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold tracking-widest uppercase mb-4 text-white/40">
              {col.title}
            </h4>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-white/70 hover:text-learnly-primary transition-colors inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-learnly py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Learnly. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-learnly-primary transition-colors">Terms</Link>
            <Link to="/" className="hover:text-learnly-primary transition-colors">Privacy</Link>
            <Link to="/" className="hover:text-learnly-primary transition-colors">Cookies Preference Center</Link>
            <Link to="/" className="hover:text-learnly-primary transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>

      {/* Giant brand watermark */}
      <div className="overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="container-learnly pb-12"
        >
          <h2 className="text-[18vw] lg:text-[14vw] font-bold tracking-ultra leading-[0.8] text-white/5 select-none">
            LEARNLY
          </h2>
        </motion.div>
      </div>
    </footer>
  )
}
