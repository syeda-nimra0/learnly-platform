import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach the access token (also stored in localStorage for SPA refresh)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('learnly_access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auto-refresh on 401
let isRefreshing = false
let failedQueue = []

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return api(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const { data } = await axios.post(
          `${API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        )
        const newToken = data.accessToken
        localStorage.setItem('learnly_access_token', newToken)
        api.defaults.headers.Authorization = `Bearer ${newToken}`
        failedQueue.forEach(({ resolve }) => resolve(newToken))
        failedQueue = []
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return api(originalRequest)
      } catch (refreshError) {
        failedQueue.forEach(({ reject }) => reject(refreshError))
        failedQueue = []
        localStorage.removeItem('learnly_access_token')
        if (window.location.pathname !== '/login') {
          window.location.href = '/login'
        }
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default api

// ----- Auth -----
export const authApi = {
  signup: (payload) => api.post('/auth/signup', payload),
  login: (payload) => api.post('/auth/login', payload),
  logout: () => api.post('/auth/logout'),
  refresh: () => api.post('/auth/refresh'),
  me: () => api.get('/auth/me'),
  updateProfile: (payload) => api.patch('/auth/me', payload),
  completeOnboarding: (payload) => api.post('/auth/onboarding', payload),
}

// ----- Courses -----
export const courseApi = {
  list: (params) => api.get('/courses', { params }),
  search: (q, params) => api.get('/courses/search', { params: { q, ...params } }),
  get: (id) => api.get(`/courses/${id}`),
  getModules: (id) => api.get(`/courses/${id}/modules`),
  categories: () => api.get('/courses/categories'),
  recentlyViewed: () => api.get('/courses/recently-viewed'),
  trackView: (id) => api.post(`/courses/${id}/view`),
}

// ----- Enrollments -----
export const enrollmentApi = {
  list: () => api.get('/enrollments'),
  enroll: (courseId) => api.post('/enrollments', { courseId }),
  get: (courseId) => api.get(`/enrollments/${courseId}`),
  updateProgress: (courseId, payload) =>
    api.patch(`/enrollments/${courseId}/progress`, payload),
  submitQuiz: (courseId, quizId, payload) =>
    api.post(`/enrollments/${courseId}/quizzes/${quizId}/submit`, payload),
}

// ----- Profile -----
export const profileApi = {
  get: () => api.get('/profile'),
  update: (payload) => api.patch('/profile', payload),
  uploadAvatar: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/profile/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  achievements: () => api.get('/profile/achievements'),
  certificates: () => api.get('/profile/certificates'),
}

// ----- AI -----
export const aiApi = {
  chat: (payload) => api.post('/ai/chat', payload),
  generateQuiz: (payload) => api.post('/ai/quiz', payload),
  generateNotes: (payload) => api.post('/ai/notes', payload),
  generatePDF: (payload) =>
    api.post('/ai/pdf', payload, { responseType: 'blob' }),
  translate: (payload) => api.post('/ai/translate', payload),
  suggestPath: () => api.get('/ai/career-path'),
}

// ----- Degrees -----
export const degreeApi = {
  list: (params) => api.get('/degrees', { params }),
  get: (id) => api.get(`/degrees/${id}`),
}
