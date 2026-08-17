import Link from "next/link";

const safaris = [
  { name: "Gorilla Trekking Experience", slug: "gorilla-trekking", days: 3, price: 1500, rating: 4.9, reviews: 342, desc: "3-day immersive gorilla trekking in Volcanoes National Park.", difficulty: "Moderate", tag: "Bestseller" },
  { name: "Akagera Big Five Safari", slug: "akagera-safari", days: 2, price: 450, rating: 4.7, reviews: 186, desc: "2-day game drive through Rwanda's savannah park.", difficulty: "Easy", tag: null },
  { name: "Nyungwe Canopy Walk", slug: "nyungwe-canopy-walk", days: 1, price: 200, rating: 4.8, reviews: 224, desc: "Full-day canopy walk and chimpanzee tracking.", difficulty: "Easy", tag: "Top Rated" },
  { name: "Lake Kivu Adventure", slug: "lake-kivu-adventure", days: 3, price: 350, rating: 4.6, reviews: 98, desc: "3-day lakeside retreat with kayaking and cultural tours.", difficulty: "Easy", tag: null },
  { name: "Rwanda Cultural Immersion", slug: "cultural-immersion", days: 5, price: 800, rating: 4.8, reviews: 156, desc: "5-day journey through Rwanda's history, culture, and communities.", difficulty: "Easy", tag: "New" },
  { name: "Golden Monkey Trek", slug: "golden-monkey-trek", days: 1, price: 250, rating: 4.7, reviews: 134, desc: "1-day golden monkey trekking in Volcanoes National Park.", difficulty: "Moderate", tag: null },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className={`h-3.5 w-3.5 ${i <= Math.round(rating) ? "text-amber-400" : "text-slate-300"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function SafarisPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Safaris & Experiences</h1>
      <p className="mt-2 text-sm text-slate-500">Discover Rwanda&apos;s most distinguished safaris and adventures</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {safaris.map((s) => (
          <Link key={s.slug} href={`/safaris/${s.slug}`}
            className="group bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="relative aspect-[16/10] bg-gradient-to-br from-slate-100 to-slate-200">
              {s.tag && (
                <span className="absolute top-3 left-3 bg-slate-900 text-white text-xs font-medium px-2.5 py-1 rounded">{s.tag}</span>
              )}
              <span className="absolute top-3 right-3 bg-white/90 text-slate-600 text-xs font-medium px-2.5 py-1 rounded shadow-sm border border-slate-100">
                {s.difficulty}
              </span>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Stars rating={s.rating} />
                <span className="text-xs text-slate-500">{s.rating} ({s.reviews} reviews)</span>
              </div>
              <h3 className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">{s.name}</h3>
              <p className="mt-1 text-sm text-slate-500 line-clamp-2">{s.desc}</p>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <span>{s.days} {s.days === 1 ? "day" : "days"}</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-slate-900">${s.price.toLocaleString()}</span>
                  <span className="text-xs text-slate-500 ml-1">/ person</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
