import { v2 as cloudinary } from 'cloudinary'
import { env } from '../config/env.js'

let _configured = false

function configure() {
  if (_configured) return
  if (!env.cloudinary.cloudName || !env.cloudinary.apiKey || !env.cloudinary.apiSecret) {
    console.warn('[cloudinary] Missing credentials - file uploads will be disabled.')
    return
  }
  cloudinary.config({
    cloud_name: env.cloudinary.cloudName,
    api_key: env.cloudinary.apiKey,
    api_secret: env.cloudinary.apiSecret,
    secure: true,
  })
  _configured = true
}

/**
 * Upload a file buffer to Cloudinary. Returns the secure URL.
 * The API secret is used ONLY here on the server.
 */
export async function uploadFile(buffer, options = {}) {
  configure()
  if (!_configured) {
    throw new Error('Cloudinary is not configured.')
  }

  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder: options.folder || env.cloudinary.uploadFolder,
      resource_type: options.resourceType || 'auto',
      public_id: options.publicId,
      overwrite: options.overwrite ?? false,
      // Strip metadata and auto-optimize images
      transformation: options.transformation || [{ quality: 'auto' }],
    }

    const stream = cloudinary.uploader.upload_stream(uploadOptions, (err, result) => {
      if (err) return reject(err)
      resolve({
        url: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        width: result.width,
        height: result.height,
        bytes: result.bytes,
      })
    })

    stream.end(buffer)
  })
}

/**
 * Upload a base64 data URI (used by some frontend flows).
 */
export async function uploadBase64(dataUri, options = {}) {
  configure()
  if (!_configured) {
    throw new Error('Cloudinary is not configured.')
  }
  const result = await cloudinary.uploader.upload(dataUri, {
    folder: options.folder || env.cloudinary.uploadFolder,
    resource_type: options.resourceType || 'image',
  })
  return {
    url: result.secure_url,
    publicId: result.public_id,
  }
}

/**
 * Delete an asset by public ID. Used when users replace their avatar.
 */
export async function deleteFile(publicId) {
  configure()
  if (!_configured) return null
  return cloudinary.uploader.destroy(publicId)
}

/**
 * Generate a signed upload URL for direct browser uploads.
 * Rarely used - we prefer routing uploads through the backend.
 */
export function generateSignedUploadParams(options = {}) {
  configure()
  if (!_configured) {
    throw new Error('Cloudinary is not configured.')
  }
  const timestamp = Math.round(Date.now() / 1000)
  const params = {
    timestamp,
    folder: options.folder || env.cloudinary.uploadFolder,
    resource_type: options.resourceType || 'image',
  }
  const signature = cloudinary.utils.api_sign_request(
    params,
    env.cloudinary.apiSecret
  )
  return {
    ...params,
    signature,
    api_key: env.cloudinary.apiKey,
    cloud_name: env.cloudinary.cloudName,
  }
}
