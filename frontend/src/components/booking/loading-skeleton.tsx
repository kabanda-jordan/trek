export function BookingFormSkeleton() {
  return (
    <div>
      <div className="flex items-center gap-2 mt-8 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className="h-8 w-8 rounded-full bg-slate-200 animate-pulse shrink-0" />
            <div className="h-3 w-16 bg-slate-200 animate-pulse rounded hidden sm:block" />
            {s < 3 && <div className="flex-1 h-px bg-slate-200" />}
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-5">
          <div className="h-5 w-40 bg-slate-200 animate-pulse rounded" />
          <div>
            <div className="h-3 w-24 bg-slate-200 animate-pulse rounded mb-1.5" />
            <div className="h-10 w-full bg-slate-200 animate-pulse rounded-md" />
          </div>
          <div>
            <div className="h-3 w-20 bg-slate-200 animate-pulse rounded mb-1.5" />
            <div className="h-10 w-full bg-slate-200 animate-pulse rounded-md" />
          </div>
          <div className="h-10 w-full bg-slate-200 animate-pulse rounded-md" />
        </div>
      </div>
    </div>
  );
}
