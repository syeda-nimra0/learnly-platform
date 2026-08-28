/**
 * Seed catalog used by the frontend when the backend is offline (dev mode).
 * The backend serves a richer version when MongoDB is connected.
 */

export const CATEGORIES = [
  { id: 'tech', name: 'Technology & Software Development', icon: 'code', count: 28 },
  { id: 'data', name: 'Data Science & Analytics', icon: 'database', count: 22 },
  { id: 'ai', name: 'Artificial Intelligence & Machine Learning', icon: 'cpu', count: 18 },
  { id: 'cyber', name: 'Cybersecurity', icon: 'shield', count: 14 },
  { id: 'cloud', name: 'Cloud Computing & DevOps', icon: 'cloud', count: 16 },
  { id: 'business', name: 'Business', icon: 'briefcase', count: 24 },
  { id: 'finance', name: 'Finance', icon: 'dollar', count: 12 },
  { id: 'marketing', name: 'Digital Marketing', icon: 'megaphone', count: 15 },
  { id: 'design', name: 'Design & UI/UX', icon: 'palette', count: 19 },
  { id: 'pm', name: 'Project Management', icon: 'clipboard', count: 11 },
  { id: 'career', name: 'Career Development', icon: 'trending-up', count: 9 },
  { id: 'personal', name: 'Personal Development', icon: 'sun', count: 8 },
]

export const CAREERS = [
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    description:
      'A Data Scientist analyzes large datasets to uncover insights, using statistics, machine learning, and visualization to inform business strategies.',
    avgSalary: '$120,000 - $180,000',
    growthRate: '+36% by 2032',
    skills: ['Python', 'Statistics', 'Machine Learning', 'SQL', 'Data Visualization'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
  {
    id: 'frontend-dev',
    name: 'Frontend Developer',
    description:
      'A Frontend Developer builds user interfaces for web applications using HTML, CSS, JavaScript, and modern frameworks like React.',
    avgSalary: '$80,000 - $140,000',
    growthRate: '+16% by 2032',
    skills: ['JavaScript', 'React', 'CSS', 'TypeScript', 'Accessibility'],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
  },
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    description:
      'A Data Analyst collects, cleans, and interprets data, using tools like Excel, SQL, and Tableau to analyze trends and provide insights for decisions.',
    avgSalary: '$65,000 - $110,000',
    growthRate: '+25% by 2032',
    skills: ['Excel', 'SQL', 'Tableau', 'Python', 'Statistics'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  },
  {
    id: 'ml-engineer',
    name: 'Machine Learning Engineer',
    description:
      'A Machine Learning Engineer builds and optimizes algorithms that enable computers to learn from data, using large datasets and neural networks.',
    avgSalary: '$130,000 - $200,000',
    growthRate: '+40% by 2032',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'ML', 'Mathematics'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
  },
  {
    id: 'backend-dev',
    name: 'Backend Developer',
    description:
      'A Backend Developer builds server-side logic, APIs, and databases that power web and mobile applications.',
    avgSalary: '$90,000 - $150,000',
    growthRate: '+18% by 2032',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'APIs', 'System Design'],
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80',
  },
  {
    id: 'cyber-analyst',
    name: 'Cybersecurity Analyst',
    description:
      'A Cybersecurity Analyst protects systems and networks from threats by monitoring, detecting, and responding to security incidents.',
    avgSalary: '$95,000 - $160,000',
    growthRate: '+32% by 2032',
    skills: ['Network Security', 'Linux', 'SIEM', 'Incident Response', 'Cryptography'],
    image: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800&q=80',
  },
  {
    id: 'ux-designer',
    name: 'UI/UX Designer',
    description:
      'A UI/UX Designer researches, prototypes, and designs user-friendly interfaces for digital products, balancing aesthetics with usability.',
    avgSalary: '$70,000 - $130,000',
    growthRate: '+13% by 2032',
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Visual Design'],
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
  },
  {
    id: 'digital-marketer',
    name: 'Digital Marketer',
    description:
      'A Digital Marketer drives growth through SEO, paid ads, email marketing, social media, and content strategy across digital channels.',
    avgSalary: '$60,000 - $120,000',
    growthRate: '+10% by 2032',
    skills: ['SEO', 'Google Ads', 'Analytics', 'Content', 'Email Marketing'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  },
]

export const ONBOARDING_GOALS = [
  {
    id: 'start',
    label: 'Start my career',
    description: 'I am new to the workforce and want to begin my professional journey.',
  },
  {
    id: 'change',
    label: 'Change my career',
    description: 'I want to switch industries or roles and need a new direction.',
  },
  {
    id: 'grow',
    label: 'Grow in my current role',
    description: 'I want to advance in my current field and take on more responsibility.',
  },
  {
    id: 'explore',
    label: 'Explore topics outside of work',
    description: 'I want to learn something new for personal interest, not for work.',
  },
]

export const ONBOARDING_ROLES = [
  'Data Scientist',
  'Frontend Developer',
  'Machine Learning Engineer',
  'Backend Developer / Engineer',
  'Data Analyst',
  'Systems Integration Engineer / Specialist',
  'Python Developer',
  'Cloud Architect',
  'Application Developer / Engineer',
  'Cybersecurity Analyst',
  'DevOps Engineer',
  'Mobile Developer',
  'UX Designer',
  'UI Designer',
  'Product Manager',
  'Digital Marketer',
  'Business Analyst',
  'Project Manager',
  'Full Stack Developer',
  'AI Researcher',
]

export const ONBOARDING_SKILLS = [
  'Data Analysis',
  'Finance',
  'Computer Programming',
  'Python Programming',
  'Project Management',
  'Artificial Intelligence and Machine Learning (AI/ML)',
  'Machine Learning',
  'Artificial Intelligence',
  'Critical Thinking',
  'SQL',
  'Statistics',
  'Cloud Computing',
  'Cybersecurity',
  'Web Development',
  'UX Design',
  'Digital Marketing',
  'Leadership',
  'Communication',
  'DevOps',
  'Blockchain',
]

export const EDUCATION_LEVELS = [
  'Less than high school diploma (or equivalent)',
  'High school diploma (or equivalent)',
  'Some college, but no degree',
  'Associate Degree (e.g., AA, AS)',
  "Bachelor's degree (e.g., BA, AB, BS)",
  "Master's degree (e.g., MA, MS, MEng, MEd, MSW, MBA)",
  'Professional school degree (e.g., MD, DDS, DVM, LLB, JD)',
  'Doctorate degree (e.g., PhD, EdD)',
]

export const COURSES = [
  {
    id: 'google-ai-essentials',
    title: 'Google AI Essentials',
    provider: 'Google',
    type: 'Specialization',
    rating: 4.8,
    reviews: 25000,
    duration: '1 month',
    level: 'Beginner',
    category: 'ai',
    skills: ['AI Fundamentals', 'Prompt Engineering', 'Generative AI'],
    price: 'Free trial',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    badge: 'Top AI program',
    description:
      'Master the fundamentals of artificial intelligence with Google experts. Learn how generative AI works, write effective prompts, and apply AI tools to real-world tasks.',
    enrolled: 145000,
  },
  {
    id: 'google-data-analytics',
    title: 'Google Data Analytics',
    provider: 'Google',
    type: 'Professional Certificate',
    rating: 4.8,
    reviews: 158000,
    duration: '6 months',
    level: 'Beginner',
    category: 'data',
    skills: ['SQL', 'R Programming', 'Tableau', 'Spreadsheet', 'Data Visualization'],
    price: 'Free trial',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    badge: 'Bestseller',
    description:
      'Launch your career in data analytics. Learn the tools and techniques used by entry-level data analysts and build a portfolio of real projects.',
    enrolled: 980000,
  },
  {
    id: 'ibm-ai-engineering',
    title: 'IBM AI Engineering',
    provider: 'IBM',
    type: 'Professional Certificate',
    rating: 4.7,
    reviews: 36000,
    duration: '4 months',
    level: 'Intermediate',
    category: 'ai',
    skills: ['Machine Learning', 'Deep Learning', 'Python', 'Neural Networks'],
    price: 'Free trial',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    badge: 'Top AI program',
    description:
      'Master machine learning, deep learning, and AI engineering with hands-on projects using IBM Watson, PyTorch, and TensorFlow.',
    enrolled: 87000,
  },
  {
    id: 'deep-learning-ai',
    title: 'Deep Learning Specialization',
    provider: 'DeepLearning.AI',
    type: 'Specialization',
    rating: 4.8,
    reviews: 41000,
    duration: '5 months',
    level: 'Intermediate',
    category: 'ai',
    skills: ['Neural Networks', 'TensorFlow', 'CNN', 'RNN', 'Transformers'],
    price: 'Free trial',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
    badge: 'Most popular',
    description:
      'Become a deep learning expert. Build and train neural networks, work with leading ML frameworks, and apply AI to real problems.',
    enrolled: 234000,
  },
  {
    id: 'microsoft-back-end',
    title: 'Microsoft Back-End Developer',
    provider: 'Microsoft',
    type: 'Professional Certificate',
    rating: 4.6,
    reviews: 12000,
    duration: '7 months',
    level: 'Beginner',
    category: 'tech',
    skills: ['C#', '.NET', 'Azure', 'SQL Server', 'Web API'],
    price: 'Free trial',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80',
    badge: 'New',
    description:
      'Build scalable back-end systems with Microsoft technologies. Learn C#, .NET, Azure cloud services, and SQL Server.',
    enrolled: 31000,
  },
  {
    id: 'aws-cloud-architect',
    title: 'AWS Cloud Solutions Architect',
    provider: 'Amazon Web Services',
    type: 'Professional Certificate',
    rating: 4.7,
    reviews: 18000,
    duration: '3 months',
    level: 'Intermediate',
    category: 'cloud',
    skills: ['AWS', 'Cloud Architecture', 'EC2', 'S3', 'IAM'],
    price: 'Free trial',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    badge: 'Trending right now',
    description:
      'Design and deploy scalable, secure AWS infrastructure. Prepare for the AWS Solutions Architect certification.',
    enrolled: 56000,
  },
  {
    id: 'google-prompting',
    title: 'Google Prompting Essentials',
    provider: 'Google',
    type: 'Specialization',
    rating: 4.8,
    reviews: 7900,
    duration: '1 month',
    level: 'Beginner',
    category: 'ai',
    skills: ['Prompt Engineering', 'LLMs', 'AI Tools', 'Productivity'],
    price: 'Free trial',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
    badge: 'Top AI program',
    description:
      'Learn the art and science of prompting AI models. Get more out of ChatGPT, Gemini, and other LLMs with proven techniques.',
    enrolled: 42000,
  },
  {
    id: 'ms-sql-powerbi',
    title: 'Microsoft Data Analysis with SQL, Excel & Power BI',
    provider: 'Microsoft',
    type: 'Specialization',
    rating: 4.6,
    reviews: 9500,
    duration: '5 months',
    level: 'Intermediate',
    category: 'data',
    skills: ['SQL', 'Excel', 'Power BI', 'Data Modeling', 'DAX'],
    price: 'Free trial',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    badge: 'Hot new release',
    description:
      'Become a complete data analyst using Microsoft stack: SQL Server for data, Excel for analysis, Power BI for dashboards.',
    enrolled: 28000,
  },
  {
    id: 'cyber-security-spec',
    title: 'Cybersecurity Fundamentals',
    provider: 'IBM',
    type: 'Professional Certificate',
    rating: 4.6,
    reviews: 22000,
    duration: '4 months',
    level: 'Beginner',
    category: 'cyber',
    skills: ['Network Security', 'Linux', 'SIEM', 'Threat Analysis', 'Incident Response'],
    price: 'Free trial',
    image: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=800&q=80',
    badge: 'Bestseller',
    description:
      'Start your cybersecurity career. Learn security operations, threat intelligence, and incident response with hands-on labs.',
    enrolled: 145000,
  },
  {
    id: 'ux-design-google',
    title: 'Google UX Design',
    provider: 'Google',
    type: 'Professional Certificate',
    rating: 4.8,
    reviews: 89000,
    duration: '6 months',
    level: 'Beginner',
    category: 'design',
    skills: ['Figma', 'Wireframing', 'Prototyping', 'User Research', 'Design Research'],
    price: 'Free trial',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    badge: 'Bestseller',
    description:
      'Design user-friendly products people love. Learn the end-to-end UX design process from research to high-fidelity prototypes.',
    enrolled: 410000,
  },
  {
    id: 'pm-foundations',
    title: 'Foundations of Project Management',
    provider: 'Google',
    type: 'Course',
    rating: 4.9,
    reviews: 67000,
    duration: '1 month',
    level: 'Beginner',
    category: 'pm',
    skills: ['Agile', 'Scrum', 'Project Planning', 'Stakeholder Management'],
    price: 'Free trial',
    image: 'https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=800&q=80',
    badge: 'Trending right now',
    description:
      'Master the foundations of project management. Learn Agile, Waterfall, stakeholder communication, and project lifecycle.',
    enrolled: 220000,
  },
  {
    id: 'digital-marketing-spec',
    title: 'Digital Marketing Specialization',
    provider: 'Illinois Tech',
    type: 'Specialization',
    rating: 4.7,
    reviews: 14000,
    duration: '6 months',
    level: 'Beginner',
    category: 'marketing',
    skills: ['SEO', 'SEM', 'Social Media', 'Content Marketing', 'Analytics'],
    price: 'Free trial',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    badge: 'Popular',
    description:
      'Drive measurable growth with modern digital marketing. Master SEO, paid advertising, social, and analytics.',
    enrolled: 38000,
  },
]

export const TRENDING_SKILLS = [
  'Artificial Intelligence',
  'Machine Learning',
  'Python Programming',
  'Data Analysis',
  'Cybersecurity',
  'Cloud Computing',
  'Generative AI',
  'Prompt Engineering',
  'SQL',
  'React',
  'UX Design',
  'Project Management',
  'Digital Marketing',
  'DevOps',
  'Blockchain',
  'Tableau',
  'Excel',
  'JavaScript',
]

export const TESTIMONIALS = [
  {
    name: 'Sarah W.',
    role: 'Data Analyst at HealthTech Co.',
    quote:
      "Learnly's reputation for high-quality content, paired with its flexible structure, made it possible for me to dive into data analytics while managing family, health, and everyday life.",
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  },
  {
    name: 'Noeris B.',
    role: 'Junior Frontend Developer',
    quote:
      "Learnly rebuilt my confidence and showed me I could dream bigger. It wasn't just about gaining knowledge—it was about believing in my potential again.",
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
  },
  {
    name: 'Abdullahi M.',
    role: 'Senior Project Manager',
    quote:
      'I now feel more prepared to take on leadership roles and have already started mentoring some of my colleagues.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  },
  {
    name: 'Anas A.',
    role: 'AI Engineer at FinTech Startup',
    quote:
      'Learning with Learnly has expanded my professional expertise by giving me access to cutting-edge research, practical tools, and global perspectives.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  },
]

export const FAQS = [
  {
    q: 'What is Learnly AI and how does it help me learn?',
    a: 'Learnly AI is your personalized learning assistant, integrated deeply into every part of the platform. It understands your career goals, enrolled courses, progress, and quiz performance to give you tailored career guidance, lesson explanations, quizzes, study plans, notes, translations, and resume help. Unlike a generic chatbot, Learnly AI only uses the data you have authorized and never exposes your information to other users.',
  },
  {
    q: 'Do I need prior experience to start a course?',
    a: 'Many Learnly courses are beginner-friendly and require no prior experience. Each course lists its prerequisites, expected duration, and skill level. Learnly AI can also analyze your current skill set and recommend the right starting point, alternative courses if one is too advanced, or bridge content if you need to fill a gap.',
  },
  {
    q: 'Are the certificates recognized by employers?',
    a: 'Certificates are generated from verified server-side completion data and include a unique verification ID. While recognition depends on the employer, Learnly certificates demonstrate practical competency through hands-on projects, quizzes, and a three-level completion path (Foundation, Practice, Job Ready).',
  },
  {
    q: 'How is my data protected when I use Learnly AI?',
    a: 'Learnly AI runs entirely server-side. Your Gemini API requests never include your full database profile—only the minimum context required for the current task. The platform implements JWT authentication, rate limiting, input validation, and authorization checks on every AI endpoint. Your private data is never exposed to other users.',
  },
  {
    q: 'Can I learn on mobile?',
    a: 'Yes. Learnly is fully responsive and works on desktop, laptop, tablet, and mobile. Every page—from course catalog to AI chat—is designed for touch. We optimize for fast page loads and lazy-load below-the-fold content so you can learn anywhere.',
  },
  {
    q: 'What are the four learner categories?',
    a: 'Learnly serves four audiences: Individuals (personal learners), Business (team training and upskilling), Universities (credit-bearing courses and degrees), and Government (workforce development). Each has its own catalog, pricing, and features.',
  },
  {
    q: 'What is the three-level course structure?',
    a: 'Every Learnly course has three levels: Foundation (core concepts and beginner exercises), Practice (hands-on exercises, quizzes, guided tasks), and Job Ready (real-world projects, advanced exercises, final assessment). Completing all three unlocks a verified certificate.',
  },
  {
    q: 'Can Learnly AI generate quizzes and study PDFs?',
    a: 'Yes. The AI Quiz Generator creates multiple-choice, true/false, scenario-based, and short-answer questions from any lesson content, with adjustable difficulty. The Notes & PDF Assistant generates revision notes, key concepts, definitions, and downloadable PDFs. AI quizzes are clearly labeled as practice and are separate from official course assessments.',
  },
]

export const WHY_LEARNLY = [
  {
    title: 'Personalized learning',
    description:
      'Learnly builds a learning path around your goals, skills, and career interests. The AI continuously refines recommendations as you progress.',
    icon: 'target',
  },
  {
    title: 'Practical projects',
    description:
      'Every course includes hands-on exercises and real-world projects so you build a portfolio, not just theoretical knowledge.',
    icon: 'wrench',
  },
  {
    title: 'Progress tracking',
    description:
      'See your level completion, quiz scores, time invested, and skill mastery in real time. Identify strengths and weak areas.',
    icon: 'trending-up',
  },
  {
    title: 'Verified certificates',
    description:
      'Certificates are generated from server-side completion data, include a unique verification ID, and are tied to your verified identity.',
    icon: 'award',
  },
  {
    title: 'AI learning support',
    description:
      'Learnly AI is available 24/7 as your tutor, planner, quiz generator, and translator. It understands your context and respects your privacy.',
    icon: 'sparkles',
  },
]
