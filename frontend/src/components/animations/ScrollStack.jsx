import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '../../lib/utils.js'

/**
 * ScrollStack - cards stack on top of each other as you scroll.
 * Adapted from components.md - simplified.
 *
 * Usage:
 *   <ScrollStack items={[{title, body}, ...]} />
 */
export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className={cn('scroll-stack-item', itemClassName)}>{children}</div>
)

export default function ScrollStack({
  items = [],
  renderItem,
  className = '',
  itemClassName = '',
}) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <div ref={containerRef} className={cn('scroll-stack-container', className)}>
      <div className="scroll-stack-sticky">
        {items.map((item, i) => {
          const progress = useTransform(
            scrollYProgress,
            [i / items.length, (i + 1) / items.length],
            [0, 1]
          )
          const scale = useTransform(scrollYProgress, [i / items.length, 1], [1 - i * 0.04, 1 - i * 0.04])
          const y = useTransform(progress, [0, 1], [60, 0])
          const opacity = useTransform(progress, [0, 1], [0, 1])

          return (
            <motion.div
              key={i}
              style={{
                scale,
                y,
                opacity,
                top: `${i * 24}px`,
                zIndex: i,
              }}
              className="scroll-stack-card"
            >
              {renderItem ? renderItem(item, i) : item.content}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
