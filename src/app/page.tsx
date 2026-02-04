import Image from "next/image";

type Product = {
  id: string;
  collection?: string;
  name: string;
  desc: string;
  price: number;
  originalPrice?: number;
  badge?: string;
};

const formatWon = (n: number) => `₩ ${n.toLocaleString("ko-KR")}`;

const CATEGORIES = ["아우터", "상의", "하의", "원피스", "세트", "액세서리"];

const PRODUCTS: Product[] = [
  { id: "p1", collection: "Signature Line", name: "울 블렌드 트렌치 코트", desc: "옷 소개를 적어주세요.", price: 289000, originalPrice: 349000, badge: "SIGNATURE" },
  { id: "p2", collection: "Essential", name: "캐시미어 터치 니트", desc: "옷 소개를 적어주세요.", price: 219000, originalPrice: 259000, badge: "NEW" },
  { id: "p3", collection: "Denim", name: "테일러드 와이드 데님", desc: "옷 소개를 적어주세요.", price: 189000 },
  { id: "p4", collection: "Atelier", name: "실크 블렌드 셔츠", desc: "옷 소개를 적어주세요.", price: 239000, originalPrice: 279000 },
  { id: "p5", collection: "Dress", name: "미디 드레스", desc: "옷 소개를 적어주세요.", price: 329000 },
  { id: "p6", collection: "Outer", name: "하프 코트", desc: "옷 소개를 적어주세요.", price: 419000, originalPrice: 489000 },
  { id: "p7", collection: "Set", name: "니트 셋업 (상의 + 하의)", desc: "옷 소개를 적어주세요.", price: 269000 },
  { id: "p8", collection: "Accessories", name: "가죽 벨트", desc: "옷 소개를 적어주세요.", price: 119000 },
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-7">
      {/* Hero */}
      <section className="grid overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_10px_30px_rgba(17,24,39,0.06)] md:grid-cols-2">
        <div className="flex flex-col gap-3 p-6">
          <span className="w-fit rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-extrabold tracking-[0.12em] text-neutral-900">
            COLLECTION
          </span>

          <h1 className="text-2xl font-black tracking-[-0.02em] text-neutral-950 md:text-3xl">
            프리미엄 의류 셀렉션
          </h1>

          <p className="max-w-xl text-sm font-semibold leading-6 text-neutral-600">
            본 화면은 미팅용 시연 페이지입니다. 문구 및 상품 구성은 임시입니다.
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            <button className="rounded-xl bg-neutral-950 px-4 py-3 text-sm font-extrabold text-white">
              컬렉션 보기
            </button>
            <button className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-extrabold text-neutral-950">
              공동구매 보기
            </button>
          </div>
        </div>

        <div className="relative min-h-[220px] border-t border-neutral-200 bg-neutral-100 md:border-l md:border-t-0">
  <Image
    src="/img1.jpg"
    alt="메인 배너"
    fill
    priority
    className="object-cover grayscale contrast-125 brightness-90"
  />
  <div className="absolute inset-0 bg-gradient-to-l from-black/25 to-transparent" />
</div>

      </section>

      {/* Categories */}
      <section className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-lg font-black text-neutral-950">카테고리</h2>
          <span className="text-xs font-semibold text-neutral-500">메뉴에서 페이지 이동</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <span
              key={c}
              className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-extrabold text-neutral-950"
            >
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-lg font-black text-neutral-950">추천 상품</h2>
          <span className="text-xs font-semibold text-neutral-500">이미지는 추후 적용</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p) => (
            <article
              key={p.id}
              className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_10px_30px_rgba(17,24,39,0.06)]"
            >
              {/* 이미지 자리 */}
              <div className="relative h-44 bg-neutral-100">
                {p.badge ? (
                  <span className="absolute left-3 top-3 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-extrabold text-neutral-950">
                    {p.badge}
                  </span>
                ) : null}
              </div>

              <div className="flex flex-col gap-2 p-4">
                <div className="text-xs font-extrabold tracking-[0.06em] text-neutral-500">
                  {p.collection ?? "COLLECTION"}
                </div>

                <div className="text-base font-black tracking-[-0.01em] text-neutral-950">
                  {p.name}
                </div>

                <div className="text-sm font-semibold leading-6 text-neutral-600">
                  {p.desc}
                </div>

                <div className="mt-1 flex items-end justify-between gap-3">
                  <div>
                    <div className="text-xs font-extrabold text-neutral-500">판매가</div>
                    <div className="text-lg font-black text-neutral-950">{formatWon(p.price)}</div>
                  </div>

                  {p.originalPrice ? (
                    <div className="text-right">
                      <div className="text-xs font-extrabold text-neutral-500">정가</div>
                      <div className="text-sm font-extrabold text-neutral-400 line-through">
                        {formatWon(p.originalPrice)}
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="mt-2 flex gap-2">
                  <button className="flex-1 rounded-xl bg-neutral-950 px-4 py-3 text-sm font-extrabold text-white">
                    자세히 보기
                  </button>
                  <button className="flex-1 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-extrabold text-neutral-950">
                    찜
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Note */}
      <section className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm font-semibold leading-6 text-neutral-600">
        미팅용 구성입니다. 이후 <b>상세 페이지</b> 및 <b>옵션(사이즈/컬러)</b> UI를 추가하면 완성도를 높일 수 있습니다.
      </section>
    </div>
  );
}
