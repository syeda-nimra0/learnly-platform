import React, { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import LearnlyAIWidget from './components/LearnlyAIWidget.jsx'
import CustomCursor from './components/animations/CustomCursor.jsx'
import ScrollToTopButton from './components/ui/ScrollToTopButton.jsx'
import PageLoader from './components/ui/PageLoader.jsx'
import ProtectedRoute from './components/auth/ProtectedRoute.jsx'
import { useAuth } from './context/AuthContext.jsx'

// Lazy load pages for code-splitting
const Landing = lazy(() => import('./pages/Landing.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const Signup = lazy(() => import('./pages/Signup.jsx'))
const Onboarding = lazy(() => import('./pages/Onboarding.jsx'))
const Welcome = lazy(() => import('./pages/Welcome.jsx'))
const Explore = lazy(() => import('./pages/Explore.jsx'))
const CourseDetail = lazy(() => import('./pages/CourseDetail.jsx'))
const MyLearning = lazy(() => import('./pages/MyLearning.jsx'))
const Learn = lazy(() => import('./pages/Learn.jsx'))
const Lesson = lazy(() => import('./pages/Lesson.jsx'))
const Profile = lazy(() => import('./pages/Profile.jsx'))
const Degrees = lazy(() => import('./pages/Degrees.jsx'))
const Business = lazy(() => import('./pages/Business.jsx'))
const Universities = lazy(() => import('./pages/Universities.jsx'))
const Government = lazy(() => import('./pages/Government.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  const location = useLocation()
  const { loading } = useAuth()

  if (loading) {
    return <PageLoader fullScreen />
  }

  return (
    <>
      <CustomCursor />
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/onboarding"
                element={
                  <ProtectedRoute>
                    <Onboarding />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/welcome"
                element={
                  <ProtectedRoute>
                    <Welcome />
                  </ProtectedRoute>
                }
              />
              <Route path="/explore" element={<Explore />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route
                path="/my-learning"
                element={
                  <ProtectedRoute>
                    <MyLearning />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/learn/:courseId"
                element={
                  <ProtectedRoute>
                    <Learn />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/learn/:courseId/lesson/:lessonId"
                element={
                  <ProtectedRoute>
                    <Lesson />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="/degrees" element={<Degrees />} />
              <Route path="/business" element={<Business />} />
              <Route path="/universities" element={<Universities />} />
              <Route path="/government" element={<Government />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
      <LearnlyAIWidget />
      <ScrollToTopButton />
    </>
  )
}
