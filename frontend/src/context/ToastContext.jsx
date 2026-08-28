import React, { createContext, useContext, useState, useCallback } from 'react'
import toast, { Toaster } from 'react-hot-toast'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const success = useCallback((message) => toast.success(message), [])
  const error = useCallback((message) => toast.error(message), [])
  const info = useCallback((message) => toast(message), [])

  return (
    <ToastContext.Provider value={{ success, error, info }}>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#0A0A0A',
            color: '#FFFFFF',
            fontFamily: '"Cabinet Grotesk", sans-serif',
            fontSize: '14px',
            borderRadius: '0',
            padding: '12px 16px',
            border: '1px solid #1F2937',
          },
          success: {
            iconTheme: { primary: '#80B7FA', secondary: '#0A0A0A' },
          },
          error: {
            iconTheme: { primary: '#EF4444', secondary: '#0A0A0A' },
          },
        }}
      />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside ToastProvider')
  return ctx
}
