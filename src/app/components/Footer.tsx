export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-900 bg-neutral-950 text-neutral-100">
      <div className="mx-auto max-w-[1120px] px-6 py-8">
        {/* 상단 컬러 스트립 */}
        <div className="mb-5 h-[2px] w-full rounded-full bg-gradient-to-r from-[#C7A76C] via-[#7A6FF0] to-[#2AAFA4]" />

        <div className="grid items-stretch gap-4 md:grid-cols-12">
          {/* ✅ 왼쪽 카드: h-full로 오른쪽 높이에 맞춤 */}
          <div className="h-full md:col-span-5">
            <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/60 p-5 backdrop-blur">
              {/* 컬러 베일 */}
              <div className="pointer-events-none absolute inset-0 opacity-60">
                <div className="absolute -top-24 -left-24 h-56 w-56 rounded-full bg-[#C7A76C]/12 blur-2xl" />
                <div className="absolute -bottom-28 -right-24 h-64 w-64 rounded-full bg-[#7A6FF0]/12 blur-2xl" />
              </div>

              {/* ✅ 내부를 flex-col로 만들어 하단 박스를 아래로 밀 수 있게 */}
              <div className="relative flex h-full flex-col">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-black tracking-[0.22em] text-white">
                    GURAPA LAB
                  </div>

                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-extrabold text-neutral-200">
                    B2B2C
                  </span>
                </div>

                <p className="mt-3 text-sm font-semibold leading-6 text-neutral-200">
                  패션·뷰티 콘텐츠 기반의 큐레이션과 커머스를 연결합니다.
                </p>

                {/* 오묘한 색(그라데이션 칩) */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/10 bg-gradient-to-r from-[#D6B16E] via-[#B88C57] to-[#7C5B2E] px-3 py-1 text-[11px] font-extrabold text-white">
                    Fashion
                  </span>
                  <span className="rounded-full border border-white/10 bg-gradient-to-r from-[#8D86FF] via-[#6E5BFF] to-[#3F2BFF] px-3 py-1 text-[11px] font-extrabold text-white">
                    Beauty
                  </span>
                  <span className="rounded-full border border-white/10 bg-gradient-to-r from-[#37D2C5] via-[#2AAFA4] to-[#1E7F79] px-3 py-1 text-[11px] font-extrabold text-white">
                    Collaboration
                  </span>
                </div>

                {/* ✅ mt-auto로 하단 영역을 카드 바닥에 붙임 */}
                <div className="mt-auto pt-4">
                  <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold text-neutral-200">
                    미팅용 데모 화면 · 일부 기능 및 정책 페이지는 준비 중입니다.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽 카드 */}
          <div className="h-full md:col-span-7">
            <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/60 p-5 backdrop-blur">
              {/* 컬러 베일 */}
              <div className="pointer-events-none absolute inset-0 opacity-55">
                <div className="absolute -top-28 -right-28 h-64 w-64 rounded-full bg-[#2AAFA4]/12 blur-2xl" />
                <div className="absolute -bottom-28 -left-28 h-64 w-64 rounded-full bg-[#C7A76C]/10 blur-2xl" />
              </div>

              <div className="relative flex h-full flex-col">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-xs font-extrabold tracking-[0.14em] text-neutral-300">
                    COMPANY INFORMATION
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#C7A76C]" />
                    <span className="h-2 w-2 rounded-full bg-[#7A6FF0]" />
                    <span className="h-2 w-2 rounded-full bg-[#2AAFA4]" />
                  </div>
                </div>

                <div className="mt-3 text-sm font-black text-white">
                  GURAPA LAB 주식회사 구라파랩
                </div>

                <dl className="mt-4 grid gap-x-6 gap-y-2 text-xs sm:grid-cols-2">
                  <div className="flex gap-3">
                    <dt className="w-28 shrink-0 font-extrabold text-neutral-400">
                      대표
                    </dt>
                    <dd className="font-semibold text-neutral-200">박수희</dd>
                  </div>

                  <div className="flex gap-3">
                    <dt className="w-28 shrink-0 font-extrabold text-neutral-400">
                      사업자등록번호
                    </dt>
                    <dd className="font-semibold text-neutral-200">
                      477-88-02297
                    </dd>
                  </div>

                  <div className="flex gap-3">
                    <dt className="w-28 shrink-0 font-extrabold text-neutral-400">
                      통신판매신고번호
                    </dt>
                    <dd className="font-semibold text-neutral-200">
                      2025-서울서초-1622
                    </dd>
                  </div>

                  <div className="flex gap-3 sm:col-span-2">
                    <dt className="w-28 shrink-0 font-extrabold text-neutral-400">
                      주소
                    </dt>
                    <dd className="font-semibold leading-5 text-neutral-200">
                      서울특별시 성동구 연무장7길 11
                    </dd>
                  </div>
                </dl>

                {/* 오른쪽도 바닥 정렬이 필요하면 이 영역을 쓸 수 있음 */}
                {/* <div className="mt-auto pt-4"></div> */}
              </div>
            </div>
          </div>
        </div>

        {/* 하단 바 */}
        <div className="mt-5 flex flex-col gap-2 border-t border-white/10 pt-4 text-xs font-semibold text-neutral-500 md:flex-row md:items-center md:justify-between">
          <div>© {year} GURAPA LAB. All rights reserved.</div>
          <div>Designed for presentation · UI/데이터는 추후 연동 예정</div>
        </div>
      </div>
    </footer>
  );
}
