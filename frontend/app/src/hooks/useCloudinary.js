
// Simple Cloudinary upload hook using unsigned upload preset
// IMPORTANT: This requires an "unsigned upload preset" configured in Cloudinary dashboard.
// If you don't have one, uploads from frontend will fail.

export const useCloudinary = () => {
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dxinnyybo' // Fallback to what was in env
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'limousines_unsigned'

  const uploadPhoto = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', UPLOAD_PRESET)

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData
      })

      if (!res.ok) {
        throw new Error('Cloudinary upload failed')
      }

      const data = await res.json()
      return data.secure_url
    } catch (err) {
      console.error('Upload Error:', err)
      return null
    }
  }

  return { uploadPhoto }
}
