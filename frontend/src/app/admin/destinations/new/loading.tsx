import { FormSkeleton } from "@/components/admin/loading-skeleton";

export default function DestinationsNewLoading() {
  return (
    <div>
      <div className="mb-8">
        <div className="h-9 w-56 bg-slate-200 animate-pulse rounded" />
        <div className="h-4 w-72 bg-slate-200 animate-pulse rounded mt-2" />
      </div>
      <FormSkeleton fields={8} />
    </div>
  );
}
