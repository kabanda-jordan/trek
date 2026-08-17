import { FormSkeleton } from "@/components/admin/loading-skeleton";

export default function VehiclesNewLoading() {
  return (
    <div>
      <div className="mb-8">
        <div className="h-9 w-40 bg-slate-200 animate-pulse rounded" />
        <div className="h-4 w-56 bg-slate-200 animate-pulse rounded mt-2" />
      </div>
      <FormSkeleton fields={10} />
    </div>
  );
}
