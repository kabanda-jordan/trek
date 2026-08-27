import Link from "next/link";

interface MapProps {
  destinationName: string;
  location?: string;
  className?: string;
  height?: string;
  showDirections?: boolean;
}

const KIGALI = "Kigali,+Rwanda";

export default function MapEmbed({
  destinationName,
  location,
  className = "",
  height = "h-56",
  showDirections = true,
}: MapProps) {
  const query = encodeURIComponent(location || destinationName);
  const directionsHref = `https://www.google.com/maps/dir/${KIGALI}/${encodeURIComponent(destinationName)}`;
  const embedSrc = `https://www.google.com/maps?q=${query}&z=9&output=embed`;

  return (
    <div className={className}>
      <iframe
        title={`Map of ${destinationName}`}
        src={embedSrc}
        className={`w-full ${height} rounded-xl border-0`}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
      {showDirections && (
        <a
          href={directionsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
          Directions from Kigali
        </a>
      )}
    </div>
  );
}
