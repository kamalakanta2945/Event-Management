import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const slides = [
  {
    image:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=2070&q=80',
    title: 'Discover Extraordinary Events',
    subtitle:
      'Music, conferences, sports, and more — book unforgettable experiences today.',
    ctaText: 'Explore Events',
    ctaHref: '/events',
  },
  {
    image:
      'https://images.unsplash.com/photo-1540575467063-178a50fc2cf7?auto=format&fit=crop&w=2070&q=80',
    title: 'Host Your Own Event',
    subtitle: 'Organize and manage events with powerful tools built for you.',
    ctaText: 'Create Event',
    ctaHref: '/create-event',
  },
  {
    image:
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=2069&q=80',
    title: 'Secure & Seamless Booking',
    subtitle: 'Fast checkout, instant confirmations, and reliable support.',
    ctaText: 'View Upcoming',
    ctaHref: '/events',
  },
];

const HeroCarousel = () => {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timerRef.current);
  }, []);

  const goTo = (i) => setIndex(i % slides.length);
  const prev = () => setIndex((p) => (p - 1 + slides.length) % slides.length);
  const next = () => setIndex((p) => (p + 1) % slides.length);

  const slide = slides[index];

  return (
    <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden rounded-2xl shadow-2xl">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${slide.image})` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow mb-4">
            {slide.title}
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-8">
            {slide.subtitle}
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              to={slide.ctaHref}
              className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg transition-colors"
            >
              {slide.ctaText}
            </Link>
            <button
              onClick={() => goTo((index + 1) % slides.length)}
              className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold backdrop-blur border border-white/30"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 grid place-items-center rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur"
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 grid place-items-center rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur"
        aria-label="Next slide"
      >
        ›
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? 'w-8 bg-white' : 'w-2.5 bg-white/60'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;

