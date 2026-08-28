import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-24 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center px-5"
      >
        <p className="text-[clamp(8rem,20vw,16rem)] font-bold tracking-ultra leading-[0.8] text-learnly-primary">
          404
        </p>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tightest mb-3">
          This page took a study break.
        </h1>
        <p className="text-learnly-muted mb-8 max-w-md mx-auto">
          We couldn't find what you're looking for. Try the catalog or head back home.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary">
            <Home size={14} />
            Back home
          </Link>
          <Link to="/explore" className="btn-secondary">
            <ArrowLeft size={14} />
            Browse courses
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
