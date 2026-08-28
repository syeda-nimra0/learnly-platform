import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils.js'

const DEFAULT_ITEMS = [
  { label: 'Career Navigator', description: 'Get personalized career paths based on your goals and progress' },
  { label: 'Course Advisor', description: 'Find courses matched to your skill level and ambitions' },
  { label: 'Lesson Tutor', description: 'Get explanations and examples for any lesson concept' },
  { label: 'AI Quiz Generator', description: 'Practice with quizzes generated from your lesson content' },
  { label: 'Study Planner', description: 'Build a daily plan that fits your schedule and targets' },
  { label: 'Notes & PDF', description: 'Generate revision notes and downloadable study PDFs' },
]

/**
 * FlowingMenu - vertical menu where hovering an item pushes others aside and reveals a description.
 * Adapted from components.md.
 *
 * Usage:
 *   <FlowingMenu items={DEFAULT_ITEMS} onItemClick={(item) => ...} />
 */
export default function FlowingMenu({
  items = DEFAULT_ITEMS,
  className = '',
  onItemClick = () => {},
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <div className={cn('flowing-menu', className)}>
      {items.map((item, i) => (
        <FlowingMenuItem
          key={i}
          item={item}
          index={i}
          isHovered={hoveredIndex === i}
          anyHovered={hoveredIndex !== null}
          onHoverStart={() => setHoveredIndex(i)}
          onHoverEnd={() => setHoveredIndex(null)}
          onClick={() => onItemClick(item)}
        />
      ))}
    </div>
  )
}

function FlowingMenuItem({
  item,
  index,
  isHovered,
  anyHovered,
  onHoverStart,
  onHoverEnd,
  onClick,
}) {
  return (
    <motion.div
      className="flowing-menu-item"
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onClick={onClick}
      animate={{
        opacity: anyHovered && !isHovered ? 0.45 : 1,
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flowing-menu-line" />
      <div className="flowing-menu-content">
        <motion.h3
          className="flowing-menu-label"
          animate={{
            x: isHovered ? 24 : 0,
            letterSpacing: isHovered ? '-0.04em' : '-0.02em',
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {item.label}
        </motion.h3>
        <AnimatePresence>
          {isHovered && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flowing-menu-description"
            >
              {item.description}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
