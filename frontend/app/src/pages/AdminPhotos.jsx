import { useState } from 'react'
import { useCloudinary } from '../hooks/useCloudinary'

export default function AdminPhotos() {
  const [file, setFile] = useState(null)
  const [url, setUrl] = useState('')
  const { uploadPhoto } = useCloudinary()

  const handle = async () => {
    if (!file) return
    const res = await uploadPhoto(file)
    setUrl(res.url)
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Upload Limousine Photo</h1>
      <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} className="mb-4" />
      <button onClick={handle} className="bg-yellow-400 text-black px-4 py-2 rounded">Upload</button>
      {url && <img src={url} alt="uploaded" className="mt-4 max-w-sm rounded" />}
    </div>
  )
}
