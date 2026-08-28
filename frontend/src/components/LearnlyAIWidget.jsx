import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, X, Sparkles, MessageSquare } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useLearnlyAI } from '../context/LearnlyAIContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { cn } from '../lib/utils.js'
import TextLoader from './animations/TextLoader.jsx'

const AI_FEATURES = [
  { id: 'career_navigator', label: 'Career Navigator', icon: 'target' },
  { id: 'course_advisor', label: 'Course Advisor', icon: 'book' },
  { id: 'lesson_tutor', label: 'Lesson Tutor', icon: 'sparkles' },
  { id: 'quiz_generator', label: 'Quiz Generator', icon: 'list' },
  { id: 'study_planner', label: 'Study Planner', icon: 'calendar' },
  { id: 'notes_pdf', label: 'Notes & PDF', icon: 'file' },
  { id: 'translation', label: 'Translation', icon: 'globe' },
  { id: 'resume', label: 'Resume Help', icon: 'briefcase' },
  { id: 'progress', label: 'My Progress', icon: 'trending-up' },
]

const QUICK_PROMPTS = {
  career_navigator: 'What career path should I follow based on my goals?',
  course_advisor: 'Which course should I take next?',
  lesson_tutor: 'Can you explain a concept from my current lesson?',
  quiz_generator: 'Generate a 5-question practice quiz from my current lesson.',
  study_planner: 'Create a study plan for this week.',
  notes_pdf: 'Generate revision notes for my current lesson.',
  translation: 'Translate my latest lesson notes to Spanish.',
  resume: 'Help me build a resume using my verified skills.',
  progress: 'How is my learning progress? What should I focus on?',
}

export default function LearnlyAIWidget() {
  const {
    isOpen,
    open,
    close,
    toggle,
    messages,
    isTyping,
    sendMessage,
    activeFeature,
    setActiveFeature,
    user,
  } = useLearnlyAI()
  const { isAuthenticated } = useAuth()
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isTyping])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 200)
    }
  }, [isOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isTyping) return
    const text = input.trim()
    setInput('')
    try {
      await sendMessage(text)
    } catch (err) {
      // error is already shown in messages
    }
  }

  const handleQuickPrompt = (prompt) => {
    if (isTyping) return
    sendMessage(prompt)
  }

  // Floating launcher button (visible only when authenticated)
  if (!isAuthenticated) return null

  return (
    <>
      {/* Floating launcher */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        onClick={toggle}
        className={cn(
          'fixed bottom-6 right-6 z-40 w-14 h-14 bg-learnly-ink text-learnly-paper hover:bg-learnly-primary hover:text-learnly-ink transition-colors flex items-center justify-center shadow-lg',
          isOpen && 'bg-learnly-primary text-learnly-ink'
        )}
        aria-label="Open Learnly AI"
      >
        {isOpen ? <X size={22} /> : <Sparkles size={22} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-learnly-paper rounded-full" />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 z-40 w-[calc(100vw-3rem)] sm:w-[440px] h-[600px] max-h-[calc(100vh-8rem)] bg-learnly-paper border border-learnly-line shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="bg-learnly-ink text-learnly-paper p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-learnly-primary text-learnly-ink flex items-center justify-center font-bold">
                  L
                </div>
                <div>
                  <p className="font-semibold tracking-tight text-sm">Learnly AI</p>
                  <p className="text-[10px] text-white/60 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block" />
                    Online · Powered by Gemini
                  </p>
                </div>
              </div>
              <button onClick={close} className="text-white/70 hover:text-white">
                <X size={18} />
              </button>
            </div>

            {/* Feature tabs */}
            <div className="border-b border-learnly-line bg-learnly-mist p-2 flex gap-1 overflow-x-auto scrollbar-hide">
              {AI_FEATURES.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFeature(f.id)}
                  className={cn(
                    'px-2.5 py-1.5 text-[11px] font-medium whitespace-nowrap transition-colors',
                    activeFeature === f.id
                      ? 'bg-learnly-ink text-learnly-paper'
                      : 'text-learnly-muted hover:text-learnly-ink'
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto chat-scroll p-4 space-y-4 bg-learnly-paper">
              {messages.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-12 h-12 mx-auto mb-3 bg-learnly-primary text-learnly-ink flex items-center justify-center">
                    <Sparkles size={20} />
                  </div>
                  <h3 className="font-semibold text-lg tracking-tight mb-1">
                    Hello{user?.name ? `, ${user.name.split(' ')[0]}` : ''}.
                  </h3>
                  <p className="text-sm text-learnly-muted mb-4">
                    I am your AI learning assistant. Try one of these:
                  </p>
                  <button
                    onClick={() => handleQuickPrompt(QUICK_PROMPTS[activeFeature])}
                    className="inline-flex items-center gap-2 text-xs font-medium border border-learnly-line px-3 py-2 hover:border-learnly-ink transition-colors"
                  >
                    <MessageSquare size={12} />
                    {QUICK_PROMPTS[activeFeature]}
                  </button>
                </div>
              )}

              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    'flex',
                    m.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-[85%] px-4 py-2.5 text-sm leading-relaxed',
                      m.role === 'user'
                        ? 'bg-learnly-ink text-learnly-paper'
                        : 'bg-learnly-mist text-learnly-ink border border-learnly-line'
                    )}
                  >
                    {m.pending ? (
                      <TextLoader text="Learnly is thinking" duration={1400} />
                    ) : m.role === 'assistant' ? (
                      <div className="prose prose-sm max-w-none [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 [&_li]:my-0.5 [&_code]:bg-learnly-paper [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-xs [&_pre]:bg-learnly-ink [&_pre]:text-learnly-paper [&_pre]:p-2 [&_pre]:text-xs [&_pre]:overflow-x-auto">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {m.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      m.content
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="border-t border-learnly-line p-3 bg-learnly-paper flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Ask Learnly AI · ${AI_FEATURES.find((f) => f.id === activeFeature)?.label}`}
                disabled={isTyping}
                className="flex-1 px-3 py-2 bg-learnly-mist border border-learnly-line text-sm focus:border-learnly-ink focus:outline-none disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 bg-learnly-ink text-learnly-paper hover:bg-learnly-primary hover:text-learnly-ink transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={14} />
              </button>
            </form>

            <p className="text-[10px] text-learnly-muted text-center pb-2 px-3">
              AI responses may be inaccurate. Verify important info. Not for medical, legal, or financial advice.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
