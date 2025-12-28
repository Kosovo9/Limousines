import { useState } from 'react'
import { useCloudinary } from '../hooks/useCloudinary'

export default function Admin() {
  const [files, setFiles] = useState([])
  const { uploadPhoto } = useCloudinary()

  const handle = async () => {
    const urls = await Promise.all([...files].map(uploadPhoto))
    console.log('URLs subidas:', urls)
    alert('Fotos subidas')
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Subir fotos de unidad</h1>
      <input type="file" multiple accept="image/*" onChange={e => setFiles(e.target.files)} />
      <button onClick={handle} className="mt-4 bg-yellow-400 text-black px-4 py-2 rounded">
        Subir
      </button>
    </div>
  )
}
