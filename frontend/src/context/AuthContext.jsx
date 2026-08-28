import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { authApi } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Try to load user on mount
  useEffect(() => {
    const token = localStorage.getItem('learnly_access_token')
    if (!token) {
      setLoading(false)
      return
    }
    authApi
      .me()
      .then(({ data }) => {
        setUser(data.user)
        setIsAuthenticated(true)
      })
      .catch(() => {
        localStorage.removeItem('learnly_access_token')
      })
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (payload) => {
    const { data } = await authApi.login(payload)
    localStorage.setItem('learnly_access_token', data.accessToken)
    setUser(data.user)
    setIsAuthenticated(true)
    return data.user
  }, [])

  const signup = useCallback(async (payload) => {
    const { data } = await authApi.signup(payload)
    localStorage.setItem('learnly_access_token', data.accessToken)
    setUser(data.user)
    setIsAuthenticated(true)
    return data.user
  }, [])

  const logout = useCallback(async () => {
    try {
      await authApi.logout()
    } catch (e) {
      // ignore network errors on logout
    }
    localStorage.removeItem('learnly_access_token')
    setUser(null)
    setIsAuthenticated(false)
  }, [])

  const updateProfile = useCallback(async (payload) => {
    const { data } = await authApi.updateProfile(payload)
    setUser(data.user)
    return data.user
  }, [])

  const completeOnboarding = useCallback(async (payload) => {
    const { data } = await authApi.completeOnboarding(payload)
    setUser(data.user)
    return data.user
  }, [])

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    signup,
    logout,
    updateProfile,
    completeOnboarding,
    setUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
