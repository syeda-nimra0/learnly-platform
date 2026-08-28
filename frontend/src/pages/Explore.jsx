import { useState, useEffect, useMemo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, X, SlidersHorizontal, Grid3x3, List } from 'lucide-react'
import CourseCard from '../components/cards/CourseCard.jsx'
import { EmptyState } from '../components/ui/index.jsx'
import { COURSES, CATEGORIES } from '../data/courses.js'
import { cn, debounce } from '../lib/utils.js'

const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced']
const TYPES = ['Course', 'Specialization', 'Professional Certificate', 'Guided Project', 'Project']
const SORT_OPTIONS = [
  { id: 'popular', label: 'Most popular' },
  { id: 'rating', label: 'Highest rated' },
  { id: 'newest', label: 'Newest' },
  { id: 'duration', label: 'Shortest first' },
]

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const initialCategory = searchParams.get('category') || ''

  const [query, setQuery] = useState(initialQuery)
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [selectedDifficulty, setSelectedDifficulty] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [showFilters, setShowFilters] = useState(false)

  // Debounced search
  const debouncedSet = useMemo(() => debounce(setDebouncedQuery, 300), [])
  useEffect(() => {
    debouncedSet(query)
  }, [query, debouncedSet])

  // Sync URL
  useEffect(() => {
    const params = {}
    if (query) params.q = query
    if (selectedCategory) params.category = selectedCategory
    setSearchParams(params, { replace: true })
  }, [query, selectedCategory, setSearchParams])

  // Filter + sort
  const filteredCourses = useMemo(() => {
    let list = [...COURSES]

    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase()
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.provider.toLowerCase().includes(q) ||
          c.skills?.some((s) => s.toLowerCase().includes(q)) ||
          c.type?.toLowerCase().includes(q)
      )
    }

    if (selectedCategory) list = list.filter((c) => c.category === selectedCategory)
    if (selectedDifficulty) list = list.filter((c) => c.level === selectedDifficulty)
    if (selectedType) list = list.filter((c) => c.type === selectedType)

    switch (sortBy) {
      case 'rating':
        list.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        list.sort((a, b) => (b.badge === 'New' ? 1 : 0) - (a.badge === 'New' ? 1 : 0))
        break
      case 'duration':
        list.sort((a, b) => parseDuration(a.duration) - parseDuration(b.duration))
        break
      default:
        list.sort((a, b) => b.enrolled - a.enrolled)
    }
    return list
  }, [debouncedQuery, selectedCategory, selectedDifficulty, selectedType, sortBy])

  const clearFilters = () => {
    setQuery('')
    setSelectedCategory('')
    setSelectedDifficulty('')
    setSelectedType('')
    setSortBy('popular')
  }

  const hasActiveFilters = query || selectedCategory || selectedDifficulty || selectedType

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="container-learnly">
        {/* Header */}
        <div className="mb-10">
          <p className="caption mb-3">Course catalog</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tightest mb-4">
            Find your next course
          </h1>
          <p className="text-lg text-learnly-muted max-w-2xl">
            Browse {COURSES.length}+ courses across {CATEGORIES.length} categories. Use filters to
            narrow by difficulty, type, or skill.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative mb-6">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-learnly-muted" />
          <input
            type="search"
            placeholder="Search by title, provider, or skill..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-4 bg-learnly-paper border border-learnly-line text-lg focus:border-learnly-ink focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-learnly-muted hover:text-learnly-ink"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Filter row */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              'inline-flex items-center gap-2 px-4 py-2 border text-sm font-medium transition-colors',
              showFilters || selectedDifficulty || selectedType
                ? 'bg-learnly-ink text-learnly-paper border-learnly-ink'
                : 'border-learnly-line hover:border-learnly-ink'
            )}
          >
            <SlidersHorizontal size={14} />
            Filters
            {(selectedDifficulty || selectedType) && (
              <span className="px-1.5 py-0.5 bg-learnly-primary text-learnly-ink text-[10px]">
                {[selectedDifficulty, selectedType].filter(Boolean).length}
              </span>
            )}
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-learnly-line text-sm font-medium focus:border-learnly-ink focus:outline-none bg-learnly-paper"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.id} value={o.id}>
                Sort: {o.label}
              </option>
            ))}
          </select>

          <div className="ml-auto text-sm text-learnly-muted">
            {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-learnly-primary hover:underline"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Expandable filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 p-6 border border-learnly-line bg-learnly-mist"
          >
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-learnly-muted mb-3">
                  Difficulty
                </p>
                <div className="space-y-2">
                  {DIFFICULTIES.map((d) => (
                    <label key={d} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="difficulty"
                        checked={selectedDifficulty === d}
                        onChange={() => setSelectedDifficulty(d)}
                        className="accent-learnly-primary"
                      />
                      <span className="text-sm">{d}</span>
                    </label>
                  ))}
                  <button
                    onClick={() => setSelectedDifficulty('')}
                    className="text-xs text-learnly-primary hover:underline"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-learnly-muted mb-3">Type</p>
                <div className="space-y-2">
                  {TYPES.map((t) => (
                    <label key={t} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="type"
                        checked={selectedType === t}
                        onChange={() => setSelectedType(t)}
                        className="accent-learnly-primary"
                      />
                      <span className="text-sm">{t}</span>
                    </label>
                  ))}
                  <button
                    onClick={() => setSelectedType('')}
                    className="text-xs text-learnly-primary hover:underline"
                  >
                    Clear
                  </button>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest text-learnly-muted mb-3">
                  Category
                </p>
                <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin">
                  {CATEGORIES.map((c) => (
                    <label key={c.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === c.id}
                        onChange={() => setSelectedCategory(c.id)}
                        className="accent-learnly-primary"
                      />
                      <span className="text-sm">{c.name}</span>
                    </label>
                  ))}
                  <button
                    onClick={() => setSelectedCategory('')}
                    className="text-xs text-learnly-primary hover:underline"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Course grid */}
        {filteredCourses.length === 0 ? (
          <EmptyState
            title="No courses match your filters"
            description="Try removing a filter or searching with different keywords."
            icon={Search}
            action={
              <button onClick={clearFilters} className="btn-primary">
                Clear filters
              </button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function parseDuration(d = '') {
  const match = d.match(/(\d+)\s*(month|week|day|hour)/i)
  if (!match) return 0
  const n = parseInt(match[1])
  const unit = match[2].toLowerCase()
  if (unit.startsWith('month')) return n * 30
  if (unit.startsWith('week')) return n * 7
  if (unit.startsWith('day')) return n
  if (unit.startsWith('hour')) return n / 24
  return n
}
