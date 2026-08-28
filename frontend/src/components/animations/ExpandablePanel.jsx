import React, { useState, useEffect, useRef } from 'react'
import { cn } from '../../lib/utils.js'

/**
 * ExpandablePanel - vertical accordion of image panels.
 * Clicking a panel expands it; others shrink to a thin sliver.
 *
 * Adapted from components.md - converted to plain JS (removed 'use client' and TS).
 *
 * Usage:
 *   <ExpandablePanel panels={[{ image, alt }, ...]} />
 */
const ExpandablePanel = ({
  panels = [],
  className = '',
  panelClassName = '',
  expandedWidth = '60%',
  collapsedWidth = '10%',
  minWidth = '40px',
  height = '80vh',
  gap = '0.5rem',
  borderRadius = '0',
  transitionDuration = '500ms',
  defaultExpanded = 0,
}) => {
  const [expandedIndex, setExpandedIndex] = useState(defaultExpanded)
  const panelRef = useRef(null)

  const handleClick = (index) => setExpandedIndex(index)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setExpandedIndex(defaultExpanded)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [defaultExpanded])

  return (
    <div
      ref={panelRef}
      className={cn('expandable-panel', className)}
      style={{ height, gap }}
    >
      {panels.map((panel, index) => (
        <div
          key={index}
          onClick={() => handleClick(index)}
          className={cn('expandable-panel-item', panelClassName)}
          style={{
            flex: index === expandedIndex ? expandedWidth : collapsedWidth,
            minWidth,
            backgroundImage: `url(${panel.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius,
            transition: `flex ${transitionDuration} cubic-bezier(0.22, 1, 0.36, 1)`,
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div className="expandable-panel-overlay">
            <span className="expandable-panel-alt">{panel.alt || ''}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ExpandablePanel
