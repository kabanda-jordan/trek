import { use } from "react";
import Link from "next/link";
import PageHeader from "@/components/ui/page-header";

export function generateStaticParams() {
  return [{ slug: "volcanoes-national-park" }, { slug: "nyungwe-forest" }, { slug: "akagera" }];
}

const mockDestination = {
  name: "Volcanoes National Park",
  slug: "volcanoes-national-park",
  location: "Musanze, Northern Province",
  desc: "Volcanoes National Park protects the steep slopes of the magnificent Virunga volcanic mountains — home to more than half of the world's mountain gorillas. The dense rainforest is also home to golden monkeys, elephants, and over 200 species of birds. Gorilla trekking here is one of Africa's most extraordinary wildlife experiences.",
  hours: "8:00 AM — 5:00 PM daily",
  thingsToKnow: "Gorilla permits must be booked months in advance. Wear sturdy hiking boots and bring rain gear. Porters are available for hire.",
  activities: ["Gorilla Trekking", "Golden Monkey Trekking", "Hiking", "Bird Watching", "Dian Fossey Visit", "Cultural Experience"],
};

export default function DestinationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-green-700">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/destinations" className="hover:text-green-700">Destinations</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">{mockDestination.name}</span>
      </nav>

      {/* Hero */}
      <div className="rounded-2xl bg-gradient-to-br from-green-100 to-emerald-200 aspect-[21/9] flex items-center justify-center mb-8">
        <span className="text-7xl">🦍</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-gray-900">{mockDestination.name}</h1>
          <p className="mt-1 text-gray-500">{mockDestination.location}</p>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">About</h2>
            <p className="text-gray-600 leading-relaxed">{mockDestination.desc}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Activities</h2>
            <div className="flex flex-wrap gap-2">
              {mockDestination.activities.map(a => (
                <span key={a} className="bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-medium">{a}</span>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Things to Know</h2>
            <p className="text-gray-600 leading-relaxed">{mockDestination.thingsToKnow}</p>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 p-6 sticky top-20">
            <h3 className="font-semibold text-gray-900 mb-4">Visitor Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <svg className="h-5 w-5 text-green-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <div><p className="font-medium text-gray-900">Opening Hours</p><p className="text-gray-500">{mockDestination.hours}</p></div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="h-5 w-5 text-green-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                <div><p className="font-medium text-gray-900">Location</p><p className="text-gray-500">{mockDestination.location}</p></div>
              </div>
            </div>
            <Link href="/booking" className="mt-6 block w-full rounded-xl bg-green-700 py-3 text-center text-sm font-bold text-white hover:bg-green-800 transition-colors">
              Book a Safari
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
