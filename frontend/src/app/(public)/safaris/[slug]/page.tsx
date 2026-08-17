import { use } from "react";
import Link from "next/link";

const mockSafari = {
  name: "Gorilla Trekking Experience",
  slug: "gorilla-trekking",
  days: 3,
  nights: 2,
  price: 1500,
  rating: 4.9,
  reviews: 342,
  difficulty: "Moderate",
  maxParticipants: 8,
  desc: "Embark on a life-changing journey to meet mountain gorillas in their natural habitat. This 3-day experience takes you deep into Volcanoes National Park, where you'll trek through lush bamboo forests alongside expert guides to find habituated gorilla families.",
  included: ["Gorilla permit", "Park fees", "Accommodation", "Meals", "Expert guide", "Transport"],
  excluded: ["International flights", "Travel insurance", "Personal expenses", "Tips"],
};

export default function SafariDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-green-700">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/safaris" className="hover:text-green-700">Safaris</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">{mockSafari.name}</span>
      </nav>

      <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 aspect-[21/9] flex items-center justify-center mb-8">
        <span className="text-7xl">🦍</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-amber-50 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full">{mockSafari.difficulty}</span>
            <span className="text-sm text-gray-500">{mockSafari.days} days / {mockSafari.nights} nights</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{mockSafari.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <svg key={i} className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}</div>
            <span className="text-sm text-gray-500">{mockSafari.rating} ({mockSafari.reviews} reviews)</span>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Overview</h2>
            <p className="text-gray-600 leading-relaxed">{mockSafari.desc}</p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-green-50 p-4">
              <h3 className="text-sm font-semibold text-green-800 mb-2">What&apos;s Included</h3>
              <ul className="space-y-1.5">
                {mockSafari.included.map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-green-700">
                    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-red-50 p-4">
              <h3 className="text-sm font-semibold text-red-800 mb-2">What&apos;s Not Included</h3>
              <ul className="space-y-1.5">
                {mockSafari.excluded.map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-red-700">
                    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 p-6 sticky top-20">
            <div className="text-center">
              <p className="text-sm text-gray-500">From</p>
              <p className="text-3xl font-bold text-gray-900">${mockSafari.price.toLocaleString()}</p>
              <p className="text-sm text-gray-500">per person</p>
            </div>
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <div className="flex justify-between"><span>Duration</span><span className="font-medium">{mockSafari.days} days / {mockSafari.nights} nights</span></div>
              <div className="flex justify-between"><span>Max group</span><span className="font-medium">{mockSafari.maxParticipants} people</span></div>
              <div className="flex justify-between"><span>Difficulty</span><span className="font-medium">{mockSafari.difficulty}</span></div>
            </div>
            <Link href="/booking" className="mt-6 block w-full rounded-xl bg-green-700 py-3.5 text-center text-sm font-bold text-white hover:bg-green-800 transition-colors shadow-lg">
              Book This Safari
            </Link>
            <p className="mt-3 text-center text-xs text-gray-500">Free cancellation up to 24 hours before</p>
          </div>
        </div>
      </div>
    </div>
  );
}
