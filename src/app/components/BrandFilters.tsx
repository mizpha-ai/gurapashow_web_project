"use client";

type Filter = { id: string; label: string };

export default function BrandFilters({
  filters,
  active,
  onChange,
}: {
  filters: Filter[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-extrabold tracking-[0.14em] text-neutral-500">
          FILTER
        </div>
        <div className="text-xs font-semibold text-neutral-500">
          무드별 보기
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {filters.map((f) => {
          const isActive = f.id === active;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => onChange(f.id)}
              className={[
                "rounded-full px-4 py-2 text-xs font-extrabold transition",
                isActive
                  ? "bg-neutral-950 text-white"
                  : "border border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100",
              ].join(" ")}
            >
              {f.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
