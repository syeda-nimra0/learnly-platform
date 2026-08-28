import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils.js'

/**
 * AnimatedList - items animate in when scrolled into view, with stagger.
 * Hover lifts the item; click fires onClick.
 *
 * Adapted from components.md - simplified for plain JS + Framer Motion.
 *
 * Usage:
 *   <AnimatedList items={careerPaths} renderItem={(item) => <CareerCard {...item} />} />
 */
const AnimatedItem = ({ children, delay = 0, index, onMouseEnter, onClick }) => {
  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      className="animated-list-item"
    >
      {children}
    </motion.li>
  )
}

export default function AnimatedList({
  items = [],
  renderItem,
  className = '',
  itemClassName = '',
  staggerDelay = 0.06,
  onClick,
}) {
  return (
    <ul className={cn('animated-list', className)}>
      {items.map((item, i) => (
        <AnimatedItem
          key={item.id || i}
          index={i}
          delay={i * staggerDelay}
          onClick={onClick ? () => onClick(item, i) : undefined}
        >
          {renderItem(item, i)}
        </AnimatedItem>
      ))}
    </ul>
  )
}
