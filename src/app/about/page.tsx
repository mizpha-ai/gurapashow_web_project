export default function AboutPage() {
  const CHIP_BASE =
    "inline-flex items-center rounded-full border px-4 py-2 text-xs font-extrabold tracking-[0.14em] transition " +
    "shadow-[0_10px_30px_rgba(17,24,39,0.10)] " +
    "hover:-translate-y-[1px] hover:shadow-[0_14px_40px_rgba(17,24,39,0.14)]";

  const CHIP_FASHION =
    "border-white/10 text-white bg-gradient-to-r from-[#D8B47A] via-[#B78A6A] to-[#6D4B3F]";
  const CHIP_BEAUTY =
    "border-white/10 text-white bg-gradient-to-r from-[#8F87FF] via-[#6A5BFF] to-[#2F2A7A]";
  const CHIP_COMMERCE =
    "border-white/10 text-white bg-gradient-to-r from-[#39D7C6] via-[#2AAFA4] to-[#0F4E4A]";

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1120px] px-6 py-10">
        {/* Header */}
        <div className="mb-10">
          <span className="inline-flex w-fit rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-extrabold tracking-[0.14em] text-neutral-900">
            ABOUT
          </span>

          <h1 className="mt-3 text-2xl font-black tracking-[-0.02em] text-neutral-950 md:text-3xl">
            GURAPA LAB 소개
          </h1>

          <p className="mt-3 max-w-[72ch] text-sm font-semibold leading-6 text-neutral-600">
            패션, 뷰티로 새로운 가치를 창출하는 종합 패션 콘텐츠 그룹인 구라파랩이
            새롭게 B2B2C 시장을 개척합니다.
          </p>

          {/* ✅ 오묘한 칩 버튼 */}
          <div className="mt-5 flex flex-wrap gap-2">
            <span className={`${CHIP_BASE} ${CHIP_FASHION}`}>Fashion Content</span>
            <span className={`${CHIP_BASE} ${CHIP_BEAUTY}`}>Beauty Curation</span>
            <span className={`${CHIP_BASE} ${CHIP_COMMERCE}`}>B2B2C Commerce</span>
          </div>
        </div>

        {/* Key message */}
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-[0_10px_30px_rgba(17,24,39,0.06)]">
              <div className="text-xs font-extrabold tracking-[0.14em] text-neutral-500">
                STATEMENT
              </div>

              <p className="mt-3 text-sm font-semibold leading-7 text-neutral-700">
                유럽의 다양한 패션 브랜드, 협회, 기관들의 마케팅을 대행하고 있습니다.
                <br />
                신선하고 창의적인 컨셉으로 고객 만족 이상을 제공합니다.
                <br />
                콜라보레이션을 통해 새로운 가치를 창출합니다.
                <br />
                산업간의 경계없는 시대를 만듭니다.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
                  <div className="text-xs font-extrabold tracking-[0.14em] text-neutral-500">
                    CONTENT
                  </div>
                  <div className="mt-2 text-base font-black text-neutral-950">
                    브랜드 스토리 설계
                  </div>
                  <p className="mt-2 text-sm font-semibold leading-6 text-neutral-600">
                    캠페인, 룩북, 에디토리얼을 통해 무드와 메시지를 정교하게 전달합니다.
                  </p>
                </div>

                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
                  <div className="text-xs font-extrabold tracking-[0.14em] text-neutral-500">
                    CURATION
                  </div>
                  <div className="mt-2 text-base font-black text-neutral-950">
                    타깃 기반 큐레이션
                  </div>
                  <p className="mt-2 text-sm font-semibold leading-6 text-neutral-600">
                    하객룩/오피스/모던 등 목적과 상황에 맞춘 선택지를 구성합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: compact highlights (미팅용, 과하지 않게) */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-7">
              <div className="text-xs font-extrabold tracking-[0.14em] text-neutral-500">
                DIRECTION
              </div>
              <div className="mt-2 text-base font-black text-neutral-950">
                프리미엄 톤 & 실사용 구조
              </div>
              <ul className="mt-3 space-y-2 text-sm font-semibold leading-6 text-neutral-600">
                <li>• 무드 중심의 브랜드/상품 구조</li>
                <li>• 공동구매/입점 확장을 고려한 정보 설계</li>
                <li>• 미팅 시 데모로 보여주기 좋은 간결한 구성</li>
              </ul>

              <div className="mt-5 rounded-2xl border border-neutral-200 bg-white p-5">
                <div className="text-xs font-extrabold tracking-[0.14em] text-neutral-500">
                  NOTE
                </div>
                <p className="mt-2 text-sm font-semibold leading-6 text-neutral-700">
                  현재 화면은 시연용이며, 이미지/데이터는 추후 확정 자료로 교체됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Image placeholders (3) */}
        <div className="mt-10">
          <div className="mb-4 flex items-end justify-between">
            <div className="text-sm font-extrabold text-neutral-950">
              브랜드/콘텐츠 이미지 영역
            </div>
            <div className="text-xs font-semibold text-neutral-500">
              * 이미지 3장 예정
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Placeholder 1 */}
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
              <div className="h-56 bg-neutral-100" />
              <div className="p-5">
                <div className="text-xs font-extrabold tracking-[0.14em] text-neutral-500">
                  FASHION
                </div>
                <div className="mt-2 text-base font-black text-neutral-950">
                  패션 콘텐츠
                </div>
                <p className="mt-2 text-sm font-semibold leading-6 text-neutral-600">
                  룩북/에디토리얼 기반의 스토리텔링을 통해 브랜드 무드를 강화합니다.
                </p>
              </div>
            </div>

            {/* Placeholder 2 */}
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
              <div className="h-56 bg-neutral-100" />
              <div className="p-5">
                <div className="text-xs font-extrabold tracking-[0.14em] text-neutral-500">
                  BEAUTY
                </div>
                <div className="mt-2 text-base font-black text-neutral-950">
                  뷰티 큐레이션
                </div>
                <p className="mt-2 text-sm font-semibold leading-6 text-neutral-600">
                  제품의 핵심 포인트를 과장 없이 정리해 신뢰 기반의 선택을 돕습니다.
                </p>
              </div>
            </div>

            {/* Placeholder 3 */}
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
              <div className="h-56 bg-neutral-100" />
              <div className="p-5">
                <div className="text-xs font-extrabold tracking-[0.14em] text-neutral-500">
                  COMMERCE
                </div>
                <div className="mt-2 text-base font-black text-neutral-950">
                  B2B2C 커머스
                </div>
                <p className="mt-2 text-sm font-semibold leading-6 text-neutral-600">
                  브랜드·파트너·고객을 연결하는 구조로 확장 가능한 커머스를 지향합니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom spacing */}
        <div className="mt-10 h-px bg-neutral-200" />
      </div>
    </div>
  );
}
