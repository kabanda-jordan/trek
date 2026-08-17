"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Safari, Vehicle } from "@/types";
import BookingForm from "@/components/booking/booking-form";
import BookingConfirmation from "@/components/booking/booking-confirmation";
import { BookingFormSkeleton } from "@/components/booking/loading-skeleton";

export default function BookingPage() {
  const [safaris, setSafaris] = useState<Safari[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      api.get<{ content: Safari[] }>("/safaris").catch(() => ({ content: [] as Safari[] })),
      api.get<{ content: Vehicle[] }>("/vehicles").catch(() => ({ content: [] as Vehicle[] })),
    ]).then(([s, v]) => {
      setSafaris(s.content);
      setVehicles(v.content);
    }).finally(() => setLoading(false));
  }, []);

  if (submitted) {
    return <BookingConfirmation bookingRef={submitted} />;
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Book Your Experience</h1>
      <p className="mt-2 text-sm text-slate-500">Complete the form below to make a reservation</p>

      {loading ? (
        <BookingFormSkeleton />
      ) : (
        <BookingForm
          safaris={safaris}
          vehicles={vehicles}
          onSubmitted={(ref) => setSubmitted(ref)}
        />
      )}
    </div>
  );
}
