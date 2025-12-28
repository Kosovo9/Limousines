import { lazy, Suspense } from 'react'

const cars = [
  { id: 1, name: 'Royal Stretch', seats: 8, img: '/car1.avif' },
  { id: 2, name: 'Executive SUV', seats: 5, img: '/car2.avif' },
  { id: 3, name: 'Party Bus', seats: 20, img: '/car3.avif' },
]

const Card = lazy(() =>
  import('./Card').then((m) => ({ default: m.Card }))
)

export default function Fleet() {
  return (
    <section id="fleet" className="py-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10">Our Fleet</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Suspense fallback={<div className="h-64 bg-gray-800 rounded" />}>
            {cars.map((c) => (
              <Card key={c.id} {...c} />
            ))}
          </Suspense>
        </div>
      </div>
    </section>
  )
}
