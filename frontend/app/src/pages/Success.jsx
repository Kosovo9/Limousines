import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function Success() {
  const navigate = useNavigate()

  useEffect(() => {
    // Confetti effect or similar could be added here
    const timer = setTimeout(() => {
      navigate('/dashboard')
    }, 5000)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 text-center">
      <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold mb-2">Success!</h1>
      <p className="text-gray-400 mb-8">Your action has been completed successfully.</p>
      <button 
        onClick={() => navigate('/dashboard')}
        className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
      >
        Go to Dashboard
      </button>
      <p className="text-sm text-gray-500 mt-4">Redirecting in 5 seconds...</p>
    </div>
  )
}
