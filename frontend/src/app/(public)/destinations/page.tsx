import Link from "next/link";
import PageHeader from "@/components/ui/page-header";

const destinations = [
  { name: "Volcanoes National Park", slug: "volcanoes-national-park", location: "Musanze", region: "Northern Province", desc: "Home to mountain gorillas and golden monkeys in the Virunga volcanic mountains.", activities: ["Gorilla Trekking", "Hiking", "Bird Watching"] },
  { name: "Akagera National Park", slug: "akagera-national-park", location: "Kayonza", region: "Eastern Province", desc: "Rwanda's only savannah park — home to the Big Five.", activities: ["Game Drive", "Bird Watching", "Boat Ride"] },
  { name: "Nyungwe National Park", slug: "nyungwe-national-park", location: "Nyamasheke", region: "Western Province", desc: "Ancient montane rainforest with a thrilling canopy walk.", activities: ["Canopy Walk", "Chimpanzee Trek", "Hiking"] },
  { name: "Lake Kivu", slug: "lake-kivu", location: "Rubavu / Rusizi", region: "Western Province", desc: "One of Africa's Great Lakes — perfect for relaxation and water sports.", activities: ["Boat Ride", "Swimming", "Kayaking"] },
  { name: "Kigali", slug: "kigali", location: "Kigali", region: "Kigali", desc: "Rwanda's vibrant capital — culture, history, and innovation.", activities: ["Cultural Experience", "Photography"] },
  { name: "Musanze", slug: "musanze", location: "Musanze", region: "Northern Province", desc: "Gateway to Volcanoes National Park with caves and cultural sites.", activities: ["Cave Exploration", "Cultural Experience", "Hiking"] },
  { name: "Rubavu", slug: "rubavu", location: "Rubavu", region: "Western Province", desc: "Beautiful lakeside town on the shores of Lake Kivu.", activities: ["Beach", "Fishing", "Boat Ride"] },
  { name: "Huye", slug: "huye", location: "Huye", region: "Southern Province", desc: "Rwanda's cultural and intellectual heart.", activities: ["Cultural Experience", "Museum", "Coffee Tour"] },
];

export default function DestinationsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <PageHeader title="Destinations" description="Explore Rwanda's national parks, lakes, and cultural landmarks" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {destinations.map((d) => (
          <Link key={d.slug} href={`/destinations/${d.slug}`}
            className="group block rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300">
            <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200">
              <span className="absolute top-3 left-3 text-xs bg-white/90 text-slate-600 px-2.5 py-1 rounded font-medium shadow-sm border border-slate-100">{d.region}</span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">{d.name}</h3>
              <p className="mt-0.5 text-xs text-slate-400">{d.location}</p>
              <p className="mt-2 text-sm text-slate-600 line-clamp-2">{d.desc}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {d.activities.slice(0, 3).map(a => (
                  <span key={a} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{a}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
