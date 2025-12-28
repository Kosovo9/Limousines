export function Card({ name, seats, img }) {
  return (
    <div className="relative rounded-xl overflow-hidden group">
      <picture>
        <source srcSet={img} type="image/avif" />
        <source srcSet={img.replace('.avif', '.webp')} type="image/webp" />
        <img
          src={img.replace('.avif', '.jpg')}
          alt={name}
          className="w-full h-64 object-cover"
          loading="lazy"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
        <div>
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-sm opacity-80">{seats} seats</p>
        </div>
      </div>
    </div>
  )
}
