import { motion } from 'framer-motion'
import Hero from '../components/sections/Hero.jsx'
import PersonalizedLearning from '../components/sections/PersonalizedLearning.jsx'
import PopularCareerPaths from '../components/sections/PopularCareerPaths.jsx'
import PopularCourses from '../components/sections/PopularCourses.jsx'
import TrendingSkills from '../components/sections/TrendingSkills.jsx'
import LearnlyAISection from '../components/sections/LearnlyAISection.jsx'
import ExploreCategories from '../components/sections/ExploreCategories.jsx'
import LearningSolutions from '../components/sections/LearningSolutions.jsx'
import Testimonials from '../components/sections/Testimonials.jsx'
import WhyLearnly from '../components/sections/WhyLearnly.jsx'
import FAQ from '../components/sections/FAQ.jsx'
import FinalCTA from '../components/sections/FinalCTA.jsx'
import ExpandablePanel from '../components/animations/ExpandablePanel.jsx'

const SHOWCASE_IMAGES = [
  {
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    alt: 'Students collaborating',
  },
  {
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
    alt: 'Lecture hall',
  },
  {
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
    alt: 'Online learning',
  },
  {
    image: 'https://images.unsplash.com/photo-1498252992634-8c386ec44d74?w=800&q=80',
    alt: 'Hands-on workshop',
  },
]

export default function Landing() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <PersonalizedLearning />
      <PopularCareerPaths />

      {/* Visual break - ExpandablePanel showcase */}
      <section className="py-20 md:py-28 bg-learnly-mist border-y border-learnly-line">
        <div className="container-learnly mb-12">
          <p className="caption mb-4">A guided journey</p>
          <h2 className="heading-2 max-w-3xl">
            Three levels. Foundation. Practice. Job ready.
          </h2>
        </div>
        <div className="container-learnly">
          <ExpandablePanel
            panels={SHOWCASE_IMAGES}
            height="60vh"
            expandedWidth="65%"
            collapsedWidth="12%"
            gap="0.25rem"
          />
        </div>
      </section>

      <PopularCourses title="Most popular certificates" />
      <TrendingSkills />
      <LearnlyAISection />

      <PopularCourses
        title="Free courses to start with"
        filter={(c) => c.price?.toLowerCase().includes('free')}
      />

      <ExploreCategories />
      <LearningSolutions />
      <Testimonials />
      <WhyLearnly />
      <FAQ />
      <FinalCTA />
    </motion.div>
  )
}
