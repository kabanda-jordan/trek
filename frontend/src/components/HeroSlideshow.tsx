"use client";

import { useState, useEffect, useCallback } from "react";

const slides = [
  {
    title: "Volcanoes National Park",
    subtitle: "Home to mountain gorillas in the Virunga volcanic mountains",
    location: "Northern Province",
    image: "https://images.unsplash.com/photo-1605559911928-e03606ea0dc0?w=1920&q=80",
  },
  {
    title: "Akagera National Park",
    subtitle: "Big Five safari across rolling savannah grasslands",
    location: "Eastern Province",
    image: "https://images.unsplash.com/photo-1664793484534-497c51a08efb?w=1920&q=80",
  },
  {
    title: "Lake Kivu",
    subtitle: "Crystal-clear waters surrounded by lush green hills",
    location: "Western Province",
    image: "https://images.pexels.com/photos/31850571/pexels-photo-31850571.jpeg?auto=compress&cs=tinysrgb&w=1920",
  },
  {
    title: "Nyungwe Forest",
    subtitle: "Ancient rainforest canopy walk and chimpanzee tracking",
    location: "Southern Province",
    image: "https://images.unsplash.com/photo-1489640818597-89b1edc97db5?w=1920&q=80",
  },
  {
    title: "Kigali City",
    subtitle: "Africa's cleanest and most vibrant capital city",
    location: "Kigali",
    image: "https://images.unsplash.com/photo-1687986261123-b17f08f2796c?w=1920&q=80",
  },
  {
    title: "Musanze Caves",
    subtitle: "Explore 65-million-year-old lava tubes beneath the volcanoes",
    location: "Northern Province",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1920&q=80",
  },
  {
    title: "Rwandan Culture",
    subtitle: "Vibrant traditions, dance, and craftsmanship",
    location: "Throughout Rwanda",
    image: "https://images.pexels.com/photos/33145563/pexels-photo-33145563.jpeg?auto=compress&cs=tinysrgb&w=1920",
  },
];

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(index);
      setIsTransitioning(false);
    }, 400);
  }, [isTransitioning]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full h-[480px] md:h-[580px] overflow-hidden bg-slate-900">
      {slides.map((slide, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === current ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 md:pb-24 w-full">
          <div className={`transition-all duration-500 ${isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300 mb-3">{slides[current].location}</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight tracking-tight">{slides[current].title}</h2>
            <p className="mt-3 text-lg text-gray-300 max-w-xl">{slides[current].subtitle}</p>
          </div>
        </div>
      </div>

      {/* Nav arrows */}
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/50 transition-colors">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-black/50 transition-colors">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        {slides.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "bg-white w-6" : "bg-white/30 w-1.5 hover:bg-white/50"}`} />
        ))}
      </div>

      <div className="absolute top-5 right-5 bg-black/30 backdrop-blur-sm rounded px-2.5 py-1 text-xs text-white/70 tabular-nums">
        {current + 1} / {slides.length}
      </div>
    </section>
  );
}
