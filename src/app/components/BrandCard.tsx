export type Brand = {
  id: string; // 앵커용 (#aurora)
  name: string;
  tagline: string; // 한 줄 소개
  concept: string; // 브랜드 컨셉
  mood: string[]; // 무드 태그 (캐주얼/하객/오피스 등)
  price: string; // 가격대 느낌(텍스트)
};

export default function BrandCard({ brand }: { brand: Brand }) {
  return (
    <article
      id={brand.id}
      className="scroll-mt-28 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_10px_30px_rgba(17,24,39,0.06)] h-full flex flex-col"
    >
      {/* 이미지 자리(비움) */}
      <div className="relative h-52 bg-neutral-100">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-3">
          <div className="inline-flex rounded-full border border-neutral-200 bg-white/80 px-3 py-1 text-[11px] font-extrabold tracking-[0.14em] text-neutral-700 backdrop-blur">
            LOOKBOOK PLACEHOLDER
          </div>
          <div className="hidden rounded-full border border-white/30 bg-black/30 px-3 py-1 text-[11px] font-extrabold tracking-[0.14em] text-white backdrop-blur sm:inline-flex">
            {brand.mood[0] ?? "MOOD"}
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="text-xs font-extrabold tracking-[0.14em] text-neutral-500">
          {brand.price}
        </div>

        <h3 className="mt-2 text-lg font-black tracking-[-0.02em] text-neutral-950">
          {brand.name}
        </h3>

        {/* ✅ tagline: 2줄 고정 */}
        <p className="mt-2 text-sm font-semibold leading-6 text-neutral-600 min-h-[48px] max-h-[48px] overflow-hidden">
          {brand.tagline}
        </p>

        <div className="mt-5 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
          <div className="text-xs font-extrabold tracking-[0.14em] text-neutral-500">
            CONCEPT
          </div>

          {/* ✅ concept: 4줄 고정 */}
          <p className="mt-2 text-sm font-semibold leading-6 text-neutral-700 min-h-[96px] max-h-[96px] overflow-hidden">
            {brand.concept}
          </p>
        </div>

        {/* ✅ 무드 태그: 고정 높이 제거 (원하는대로 자연스럽게) */}
        <div className="mt-5 flex flex-wrap gap-2">
          {brand.mood.map((t) => (
            <span
              key={t}
              className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-extrabold text-neutral-900"
            >
              {t}
            </span>
          ))}
        </div>

        {/* ✅ 버튼: 항상 카드 바닥에 고정 */}
        <div className="mt-auto pt-6 flex gap-2">
          <button className="flex-1 rounded-xl bg-neutral-950 px-4 py-3 text-sm font-extrabold text-white hover:opacity-90">
            브랜드 보기
          </button>
          <button className="flex-1 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-extrabold text-neutral-950 hover:bg-neutral-50">
            입점 문의
          </button>
        </div>
      </div>
    </article>
  );
}
