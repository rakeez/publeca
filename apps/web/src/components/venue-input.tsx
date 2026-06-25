"use client";

import { useEffect, useRef, useState } from "react";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

type VenueValue = {
  venue: string;
  venueLat: string;
  venueLng: string;
  placeId: string;
  mapsUrl: string;
};

// Venue field. With a Google Maps key it offers Places autocomplete and captures
// coordinates; without one it's a plain venue field plus an optional Maps link.
export function VenueInput({ defaults }: { defaults?: Partial<VenueValue> }) {
  const [v, setV] = useState<VenueValue>({
    venue: defaults?.venue ?? "",
    venueLat: defaults?.venueLat ?? "",
    venueLng: defaults?.venueLng ?? "",
    placeId: defaults?.placeId ?? "",
    mapsUrl: defaults?.mapsUrl ?? "",
  });
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!API_KEY || !inputRef.current) return;

    const init = () => {
      const g = (window as unknown as { google?: any }).google;
      if (!g?.maps?.places) return;
      const ac = new g.maps.places.Autocomplete(inputRef.current, {
        fields: ["name", "geometry", "place_id", "formatted_address", "url"],
      });
      ac.addListener("place_changed", () => {
        const p = ac.getPlace();
        const lat = p.geometry?.location?.lat?.();
        const lng = p.geometry?.location?.lng?.();
        const placeId = p.place_id ?? "";
        setV({
          venue: p.name ? `${p.name}, ${p.formatted_address ?? ""}`.replace(/, $/, "") : (p.formatted_address ?? ""),
          venueLat: lat != null ? String(lat) : "",
          venueLng: lng != null ? String(lng) : "",
          placeId,
          mapsUrl:
            p.url ??
            (placeId ? `https://www.google.com/maps/place/?q=place_id:${placeId}` : ""),
        });
      });
    };

    const w = window as unknown as { google?: any };
    if (w.google?.maps?.places) {
      init();
      return;
    }
    const existing = document.getElementById("gmaps-js");
    if (existing) {
      existing.addEventListener("load", init);
      return;
    }
    const s = document.createElement("script");
    s.id = "gmaps-js";
    s.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
    s.async = true;
    s.onload = init;
    document.body.appendChild(s);
  }, []);

  return (
    <div className="space-y-3">
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Venue</span>
        <input
          ref={inputRef}
          value={v.venue}
          onChange={(e) => setV({ ...v, venue: e.target.value })}
          name="venue"
          placeholder={API_KEY ? "Search for a place…" : "Venue name and address"}
          className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
        {API_KEY && (
          <span className="mt-1 block text-xs text-slate-400">
            Start typing to pick from Google Maps — we'll save the location and show a map.
          </span>
        )}
      </label>

      {!API_KEY && (
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Google Maps link (optional)</span>
          <input
            value={v.mapsUrl}
            onChange={(e) => setV({ ...v, mapsUrl: e.target.value })}
            name="mapsUrl"
            placeholder="https://maps.google.com/…"
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
          />
        </label>
      )}

      <input type="hidden" name="venueLat" value={v.venueLat} />
      <input type="hidden" name="venueLng" value={v.venueLng} />
      <input type="hidden" name="placeId" value={v.placeId} />
      {API_KEY && <input type="hidden" name="mapsUrl" value={v.mapsUrl} />}
    </div>
  );
}
