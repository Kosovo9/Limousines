import { useEffect } from 'react'

export default function Hero() {
  useEffect(() => {
    const img = new Image()
    img.src = '/hero.avif'
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center text-white">
      <picture>
        <source srcSet="/hero.avif" type="image/avif" />
        <source srcSet="/hero.webp" type="image/webp" />
        <img
          src="/hero.jpg"
          alt="Luxury limousine"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
      </picture>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-extrabold drop-shadow-lg">
          Arrive in Style
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-xl mx-auto drop-shadow">
          Premium limousines, instant booking, 24/7 support.
        </p>
        <a
          href="#booking"
          className="mt-6 inline-block bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
        >
          Book Now
        </a>
      </div>
    </section>
  )
}
