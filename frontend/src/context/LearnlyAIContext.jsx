import React, { createContext, useContext, useState, useCallback, useRef } from 'react'
import { aiApi } from '../lib/api'
import { useAuth } from './AuthContext'

const LearnlyAIContext = createContext(null)

/**
 * LearnlyAIContext manages the chat widget state.
 * All requests go through aiApi which calls the backend /api/ai/chat endpoint.
 * The Gemini API key NEVER touches the browser.
 */
export function LearnlyAIProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [activeFeature, setActiveFeature] = useState('career_navigator')
  const { user } = useAuth()
  const conversationRef = useRef([])

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((v) => !v), [])

  const sendMessage = useCallback(
    async (text, options = {}) => {
      if (!text?.trim()) return
      const userMsg = { role: 'user', content: text, id: Date.now() }
      const aiMsgPlaceholder = {
        role: 'assistant',
        content: '',
        id: Date.now() + 1,
        pending: true,
      }
      setMessages((prev) => [...prev, userMsg, aiMsgPlaceholder])
      setIsTyping(true)
      conversationRef.current.push({ role: 'user', content: text })

      try {
        const { data } = await aiApi.chat({
          message: text,
          feature: options.feature || activeFeature,
          context: options.context || {},
          history: conversationRef.current.slice(-10),
        })

        const aiText = data.response || data.message || 'Sorry, I could not generate a response.'
        setMessages((prev) =>
          prev.map((m) =>
            m.id === aiMsgPlaceholder.id ? { ...m, content: aiText, pending: false } : m
          )
        )
        conversationRef.current.push({ role: 'assistant', content: aiText })
        return aiText
      } catch (err) {
        const fallback =
          err.response?.data?.error ||
          'I had trouble reaching the server. Please try again in a moment.'
        setMessages((prev) =>
          prev.map((m) =>
            m.id === aiMsgPlaceholder.id
              ? { ...m, content: fallback, pending: false, error: true }
              : m
          )
        )
        throw err
      } finally {
        setIsTyping(false)
      }
    },
    [activeFeature]
  )

  const reset = useCallback(() => {
    setMessages([])
    conversationRef.current = []
  }, [])

  const value = {
    isOpen,
    open,
    close,
    toggle,
    messages,
    isTyping,
    sendMessage,
    reset,
    activeFeature,
    setActiveFeature,
    user,
  }

  return <LearnlyAIContext.Provider value={value}>{children}</LearnlyAIContext.Provider>
}

export function useLearnlyAI() {
  const ctx = useContext(LearnlyAIContext)
  if (!ctx) throw new Error('useLearnlyAI must be used inside LearnlyAIProvider')
  return ctx
}
