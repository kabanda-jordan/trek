import Link from "next/link";

const vehicles = [
  { name: "Toyota Land Cruiser", slug: "toyota-land-cruiser", type: "SUV", seats: 7, trans: "Automatic", fuel: "Diesel", price: 120, company: "ABC Tours Rwanda", rating: 4.8 },
  { name: "Safari Land Cruiser", slug: "safari-land-cruiser", type: "Safari Vehicle", seats: 9, trans: "Manual", fuel: "Diesel", price: 180, company: "Rwanda Safaris Ltd", rating: 4.9 },
  { name: "Mercedes Sprinter", slug: "mercedes-sprinter", type: "Van", seats: 14, trans: "Automatic", fuel: "Diesel", price: 200, company: "ABC Tours Rwanda", rating: 4.7 },
  { name: "Toyota Coaster", slug: "toyota-coaster", type: "Minibus", seats: 24, trans: "Manual", fuel: "Diesel", price: 250, company: "Rwanda Safaris Ltd", rating: 4.6 },
  { name: "Range Rover Sport", slug: "range-rover-sport", type: "Luxury", seats: 5, trans: "Automatic", fuel: "Diesel", price: 300, company: "Kigali Car Rental", rating: 4.9 },
  { name: "Toyota Prado", slug: "toyota-prado", type: "SUV", seats: 7, trans: "Automatic", fuel: "Diesel", price: 90, company: "Kigali Car Rental", rating: 4.7 },
];

const typeColors: Record<string, string> = {
  SUV: "bg-blue-50 text-blue-700",
  "Safari Vehicle": "bg-amber-50 text-amber-700",
  Van: "bg-purple-50 text-purple-700",
  Minibus: "bg-indigo-50 text-indigo-700",
  Luxury: "bg-rose-50 text-rose-700",
};

export default function VehiclesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Tourism Vehicles</h1>
      <p className="mt-2 text-sm text-slate-500">Find the perfect vehicle for your Rwanda expedition</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map((v) => (
          <Link key={v.slug} href={`/vehicles/${v.slug}`}
            className="group bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="relative aspect-[16/10] bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
              <svg className="h-16 w-16 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H18.75m-7.5-3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <span className={`absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded ${typeColors[v.type] || "bg-slate-100 text-slate-700"}`}>
                {v.type}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">{v.name}</h3>
              <p className="text-sm text-slate-500 mt-0.5">{v.company}</p>
              <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
                  {v.seats} seats
                </span>
                <span>{v.trans}</span>
                <span>{v.fuel}</span>
              </div>
              <div className="mt-3 flex items-center justify-between pt-3 border-t border-slate-100">
                <span className="text-xl font-bold text-slate-900">${v.price}<span className="text-sm font-normal text-slate-500">/day</span></span>
                <span className="text-sm font-medium text-emerald-700 group-hover:underline">View details</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
