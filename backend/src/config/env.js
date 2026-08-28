import dotenv from 'dotenv'

dotenv.config()

const required = (key, fallback = '') => {
  const v = process.env[key] ?? fallback
  if (!v && !fallback) {
    // Only warn; let the app start so the frontend can still function in dev mode
    console.warn(`[env] Missing required env var: ${key}`)
  }
  return v
}

export const env = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  extraCorsOrigins: process.env.EXTRA_CORS_ORIGINS || '',

  // MongoDB
  mongodbUri: process.env.MONGODB_URI || '',

  // JWT
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || 'dev_access_secret_change_me',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'dev_refresh_secret_change_me',
    accessExpires: process.env.JWT_ACCESS_EXPIRES || '15m',
    refreshExpires: process.env.JWT_REFRESH_EXPIRES || '7d',
    cookieSecure: process.env.COOKIE_SECURE === 'true',
  },

  // Gemini (server-side only - NEVER expose to client)
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || '',
    model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
    timeoutMs: parseInt(process.env.GEMINI_TIMEOUT_MS || '30000', 10),
    maxInputChars: parseInt(process.env.GEMINI_MAX_INPUT_CHARS || '8000', 10),
  },

  // Cloudinary
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
    uploadFolder: process.env.CLOUDINARY_UPLOAD_FOLDER || 'learnly',
  },

  // Rate limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10),
    max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
    aiMax: parseInt(process.env.AI_RATE_LIMIT_MAX || '20', 10),
  },
}

// Validate critical secrets in production
if (env.isProd) {
  const missing = []
  if (!env.gemini.apiKey) missing.push('GEMINI_API_KEY')
  if (!env.mongodbUri) missing.push('MONGODB_URI')
  if (!env.jwt.accessSecret || env.jwt.accessSecret === 'dev_access_secret_change_me') missing.push('JWT_ACCESS_SECRET')
  if (!env.jwt.refreshSecret || env.jwt.refreshSecret === 'dev_refresh_secret_change_me') missing.push('JWT_REFRESH_SECRET')
  if (!env.cloudinary.apiSecret) missing.push('CLOUDINARY_API_SECRET')
  if (missing.length) {
    console.error(`[env] FATAL: Missing required production secrets: ${missing.join(', ')}`)
    process.exit(1)
  }
}
