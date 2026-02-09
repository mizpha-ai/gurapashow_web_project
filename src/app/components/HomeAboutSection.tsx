// src/app/components/HomeAboutSection.tsx
import Image from "next/image";
import Link from "next/link";

const VALUES = [
  {
    title: "브랜드 우선",
    desc: "상품을 먼저 밀지 않고, 브랜드의 결·톤·철학을 먼저 보여주는 구조.",
    tag: "BRAND-FIRST",
  },
  {
    title: "에디토리얼 큐레이션",
    desc: "광고 배너가 아니라 전시처럼 읽히는 흐름(무드 → 디테일 → 스토리).",
    tag: "EDITORIAL",
  },
  {
    title: "드롭 리듬",
    desc: "시즌 무드에 맞춰 브랜드/문구/순서를 빠르게 교체하고 드롭으로 연결.",
    tag: "DROP RHYTHM",
  },
];

const TIMELINE = [
  {
    step: "CHAPTER 01",
    title: "Mood Cut",
    desc: "시즌 무드를 한 장의 컷으로 제시. 톤과 질감부터 ‘먼저’ 각인.",
  },
  {
    step: "CHAPTER 02",
    title: "Texture / Detail",
    desc: "소재/실루엣/디테일을 큰 카드로 전개. ‘설명’보다 ‘느낌’이 먼저.",
  },
  {
    step: "CHAPTER 03",
    title: "Brand Story",
    desc: "브랜드의 철학과 제작 방식이 자연스럽게 읽히는 문장 구조로 배치.",
  },
  {
    step: "CHAPTER 04",
    title: "Drop (Optional)",
    desc: "홈은 판매가 목적이 아니라 전시의 완성. 필요 시 드롭으로 연결.",
  },
];

export default function HomeAboutSection() {
  return (
    <section
      id="about"
      className="border-t border-white/10 bg-neutral-950 text-white"
    >
      {/* Top: Full-bleed editorial block */}
      <div className="mx-auto w-full max-w-[1480px] px-5 py-16 md:px-10 md:py-20">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Left: copy */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-3 py-1 text-[11px] font-extrabold tracking-[0.22em] text-white/85">
                ABOUT
                <span className="h-1 w-1 rounded-full bg-white/40" />
                GURAPA LAB
              </div>

              <h2 className="mt-5 text-2xl font-black tracking-[-0.03em] md:text-4xl">
                홈은 상품 진열이 아니라,
                <br />
                <span className="text-white/80">브랜드 전시</span>가 되어야 해.
              </h2>

              <p className="mt-5 text-sm font-semibold leading-7 text-white/70">
                너가 말한 핵심: <b>홍보/광고가 아니라 브랜드 스토리텔링</b>.
                <br />
                그래서 홈 자체가 “갤러리”처럼 작동해야 하고, 섹션은 크게,
                여백은 과감하게, 톤은 다크로 고정한 채로 ‘프리미엄 무드’를
                유지해야 해.
              </p>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5">
                <div className="text-[11px] font-extrabold tracking-[0.22em] text-white/55">
                  HOW USERS EXPERIENCE
                </div>
                <div className="mt-3 space-y-2 text-sm font-semibold leading-7 text-white/75">
                  <p>• 첫 화면에서 무드가 먼저 박힘</p>
                  <p>• 디테일/텍스처로 ‘프리미엄’의 근거를 느낌</p>
                  <p>• 스토리를 읽고 브랜드에 설득됨</p>
                  <p>• 원하면 드롭/공동구매로 자연스럽게 연결</p>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                <Link
                  href="/brands"
                  className="rounded-2xl bg-white px-5 py-3 text-sm font-extrabold text-neutral-950 hover:opacity-90"
                >
                  입점브랜드 보기 →
                </Link>
                <Link
                  href="/support"
                  className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-extrabold text-white hover:bg-white/10"
                >
                  고객센터 →
                </Link>
              </div>
            </div>
          </div>

          {/* Right: media collage */}
          <div className="lg:col-span-7">
            <div className="grid gap-4">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                <div className="relative h-[260px] md:h-[340px]">
                  <Image
                    src="/img2.jpg"
                    alt="about mood"
                    fill
                    className="object-cover grayscale contrast-125 brightness-75"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <div className="text-[11px] font-extrabold tracking-[0.22em] text-white/70">
                      EDITORIAL CUT
                    </div>
                    <div className="mt-2 text-xl font-black">무드가 먼저</div>
                    <p className="mt-2 text-sm font-semibold leading-7 text-white/75">
                      첫 화면에서 ‘구라파랩의 톤’을 정의하는 큰 컷을 사용.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                  <div className="relative h-[220px]">
                    <Image
                      src="/img3.jpg"
                      alt="texture detail"
                      fill
                      className="object-cover grayscale contrast-125 brightness-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="text-[11px] font-extrabold tracking-[0.22em] text-white/70">
                        TEXTURE
                      </div>
                      <div className="mt-2 text-lg font-black">디테일이 증명</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/30 p-6">
                  <div className="text-[11px] font-extrabold tracking-[0.22em] text-white/55">
                    VALUES
                  </div>

                  <div className="mt-4 grid gap-3">
                    {VALUES.map((v) => (
                      <div
                        key={v.tag}
                        className="rounded-2xl border border-white/10 bg-white/5 p-5"
                      >
                        <div className="text-[11px] font-extrabold tracking-[0.22em] text-white/55">
                          {v.tag}
                        </div>
                        <div className="mt-2 text-base font-black">{v.title}</div>
                        <p className="mt-2 text-sm font-semibold leading-7 text-white/70">
                          {v.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tape */}
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                <div className="flex gap-8 whitespace-nowrap px-6 py-4 text-sm font-extrabold tracking-[0.18em] text-white/70">
                  <span>BRAND STORY ·</span>
                  <span>GALLERY HOME ·</span>
                  <span>NO AD BANNERS ·</span>
                  <span>PREMIUM DARK ·</span>
                  <span>BRAND STORY ·</span>
                  <span>GALLERY HOME ·</span>
                  <span>NO AD BANNERS ·</span>
                  <span>PREMIUM DARK ·</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline / structure */}
        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
              <div className="text-[11px] font-extrabold tracking-[0.22em] text-white/55">
                STRUCTURE
              </div>
              <div className="mt-3 text-xl font-black tracking-[-0.02em]">
                소개 페이지를
                <br />
                홈 아래로 “이식”
              </div>
              <p className="mt-3 text-sm font-semibold leading-7 text-white/70">
                지금은 “홈+소개”를 합치기 위해 소개 레이아웃을 홈 하단에 그대로
                붙이는 방식으로 구성했어.
                <br />
                메뉴는 네가 말한 것처럼 4개로 줄여도 충분해.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="rounded-3xl border border-white/10 bg-black/30 p-7">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <div className="text-[11px] font-extrabold tracking-[0.22em] text-white/55">
                    CHAPTER FLOW
                  </div>
                  <div className="mt-2 text-xl font-black">
                    홈에서의 스토리텔링 순서
                  </div>
                  <div className="mt-2 text-sm font-semibold text-white/70">
                    무드 → 디테일 → 철학 → 드롭(선택)
                  </div>
                </div>

                <Link
                  href="/#top"
                  className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-extrabold text-white hover:bg-white/10"
                >
                  위로 올라가기 ↑
                </Link>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-2">
                {TIMELINE.map((t) => (
                  <div
                    key={t.step}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6"
                  >
                    <div className="text-[11px] font-extrabold tracking-[0.22em] text-white/55">
                      {t.step}
                    </div>
                    <div className="mt-2 text-base font-black">{t.title}</div>
                    <p className="mt-2 text-sm font-semibold leading-7 text-white/70">
                      {t.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                <Link
                  href="/group-buy"
                  className="rounded-2xl bg-white px-5 py-3 text-sm font-extrabold text-neutral-950 hover:opacity-90"
                >
                  드롭/공동구매로 연결 →
                </Link>
                <Link
                  href="/brands"
                  className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-extrabold text-white hover:bg-white/10"
                >
                  브랜드 아카이브 →
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 h-px bg-white/10" />

        <div className="mt-8 text-xs font-semibold text-white/45">
          * 이 소개 섹션은 “홈과 소개를 합친” 버전으로, 필요하면 카드/문구/이미지를
          더 늘려서 완전히 소개 페이지급으로 확장 가능.
        </div>
      </div>
    </section>
  );
}
