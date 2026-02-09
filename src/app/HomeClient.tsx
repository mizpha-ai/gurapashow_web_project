// src/app/HomeClient.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import { useMemo, useState } from "react";
import HomeAboutSection from "./components/HomeAboutSection";

type Slide = {
  src: string;
  alt: string;
  brand: string;
  tagline: string;
  href?: string;
};

const SLIDES: Slide[] = [
  {
    src: "/img1.jpg",
    alt: "GURAPA LAB hero",
    brand: "AURORA ATELIER",
    tagline: "Modern tailoring, quiet power.",
    href: "/brands#aurora",
  },
  {
    src: "/img2.jpg",
    alt: "Noir mood",
    brand: "NOIR STUDIO",
    tagline: "Monochrome essentials with edge.",
    href: "/brands#noir",
  },
  {
    src: "/img3.jpg",
    alt: "Lumen archive",
    brand: "LUMEN ARCHIVE",
    tagline: "Modern classics, archival calm.",
    href: "/brands#lumen",
  },
];

const FEATURED = [
  { name: "AURORA ATELIER", desc: "Modern tailoring", href: "/brands#aurora" },
  { name: "NOIR STUDIO", desc: "Monochrome essentials", href: "/brands#noir" },
  { name: "LUMEN ARCHIVE", desc: "Modern classics", href: "/brands#lumen" },
  { name: "SABLE HOUSE", desc: "Premium knitwear", href: "/brands#sable" },
  { name: "VELVET LINE", desc: "Wedding & evening", href: "/brands#velvet" },
  { name: "RARE OBJECTS", desc: "Accessories", href: "/brands#rare" },
];

export default function HomeClient() {
  const [activeIdx, setActiveIdx] = useState(0);

  const slick = useMemo(
    () => ({
      dots: false,
      arrows: false,
      infinite: true,
      speed: 700,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3800,
      pauseOnHover: true,
      beforeChange: (_: number, next: number) => setActiveIdx(next),
    }),
    []
  );

  const active = SLIDES[activeIdx % SLIDES.length];

  return (
    <div className="w-full bg-neutral-950 text-white">
      {/* FULL-BLEED HERO */}
      <section className="relative w-full overflow-hidden border-b border-white/10">
        {/* subtle grid */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.18]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
        </div>

        {/* glow blobs */}
        <div className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 h-[620px] w-[620px] rounded-full bg-white/10 blur-3xl" />

        <div className="relative mx-auto w-full max-w-[1480px] px-5 py-10 md:px-10 md:py-14">
          <div className="grid items-stretch gap-8 lg:grid-cols-12">
            {/* Left copy */}
            <div className="lg:col-span-5">
              <div className="flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-3 py-1 text-[11px] font-extrabold tracking-[0.22em] text-white/85">
                    GURAPA LAB
                    <span className="h-1 w-1 rounded-full bg-white/40" />
                    BRAND GALLERY
                  </div>

                  <h1 className="mt-5 text-3xl font-black tracking-[-0.03em] md:text-5xl">
                    상품이 아니라,
                    <br />
                    <span className="text-white/80">브랜드의 결</span>을 먼저 보여줘.
                  </h1>

                  <p className="mt-5 max-w-[52ch] text-sm font-semibold leading-7 text-white/70">
                    광고 배너처럼 보이지 않게. “브랜드 소개 + 무드 + 스토리”가
                    중심인 갤러리형 커머스로 설계해.
                    <br />
                    섹션은 크게, 여백은 과감하게 쓰고, 톤은 다크로 고정.
                  </p>

                  {/* Active slide meta */}
                  <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5">
                    <div className="text-[11px] font-extrabold tracking-[0.22em] text-white/60">
                      NOW FEATURING
                    </div>
                    <div className="mt-2 text-lg font-black text-white">
                      {active.brand}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-white/65">
                      {active.tagline}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <Link
                      href="/brands"
                      className="rounded-2xl bg-white px-5 py-3 text-sm font-extrabold text-neutral-950 hover:opacity-90"
                    >
                      입점브랜드 보기 →
                    </Link>

                    {/* ✅ 소개 페이지 지울 거면 /about 대신 /#about */}
                    <Link
                      href="/#about"
                      className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-extrabold text-white hover:bg-white/10"
                    >
                      구라파랩 소개 →
                    </Link>
                  </div>
                </div>

                {/* Bottom micro */}
                <div className="mt-8 flex items-center justify-between gap-3 text-xs font-semibold text-white/55">
                  <span>Seasonal edit · cinematic grayscale</span>
                  <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1">
                    Full-bleed layout
                  </span>
                </div>
              </div>
            </div>

            {/* Right slider */}
            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_40px_120px_rgba(0,0,0,0.55)]">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                <Slider {...slick}>
                  {SLIDES.map((s) => (
                    <div key={s.src} className="relative h-[520px] md:h-[640px]">
                      <Image
                        src={s.src}
                        alt={s.alt}
                        fill
                        priority
                        className="object-cover grayscale contrast-125 brightness-75"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/30" />

                      <div className="absolute bottom-0 left-0 right-0 p-7">
                        <div className="flex items-end justify-between gap-4">
                          <div className="min-w-0">
                            <div className="text-[11px] font-extrabold tracking-[0.22em] text-white/70">
                              FEATURED BRAND
                            </div>
                            <div className="mt-2 truncate text-2xl font-black tracking-[-0.02em] text-white md:text-3xl">
                              {s.brand}
                            </div>
                            <div className="mt-2 max-w-[60ch] text-sm font-semibold text-white/75">
                              {s.tagline}
                            </div>
                          </div>

                          {s.href ? (
                            <Link
                              href={s.href}
                              className="shrink-0 rounded-2xl bg-white px-4 py-3 text-sm font-extrabold text-neutral-950 hover:opacity-90"
                            >
                              스토리 보기 →
                            </Link>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>

                {/* custom indicator */}
                <div className="absolute left-7 top-7 flex items-center gap-2">
                  {SLIDES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIdx(i)}
                      className={[
                        "h-2 rounded-full transition",
                        i === activeIdx ? "w-10 bg-white" : "w-2 bg-white/35",
                      ].join(" ")}
                      aria-label={`go ${i + 1}`}
                      type="button"
                    />
                  ))}
                </div>
              </div>

              {/* editorial tape */}
              <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black/30">
                <div className="flex gap-8 whitespace-nowrap px-6 py-4 text-sm font-extrabold tracking-[0.18em] text-white/70">
                  <span>CURATED ·</span>
                  <span>NO AD BANNERS ·</span>
                  <span>BRAND-FIRST STORY ·</span>
                  <span>PREMIUM EDIT ·</span>
                  <span>CURATED ·</span>
                  <span>NO AD BANNERS ·</span>
                  <span>BRAND-FIRST STORY ·</span>
                  <span>PREMIUM EDIT ·</span>
                </div>
              </div>
            </div>
          </div>

          {/* Unique “chapters” area */}
          <div className="mt-10 grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
                <div className="text-[11px] font-extrabold tracking-[0.22em] text-white/55">
                  CHAPTER 01
                </div>
                <div className="mt-3 text-xl font-black tracking-[-0.02em]">
                  브랜드를 “전시”하는 홈
                </div>
                <p className="mt-3 text-sm font-semibold leading-7 text-white/70">
                  홈은 상품 나열이 아니라, 한 시즌의 무드를 큐레이션하는
                  전시처럼. 브랜드 소개 → 무드 컷 → 철학 → 드롭(선택) 순으로.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <div className="text-[11px] font-extrabold tracking-[0.22em] text-white/55">
                      EDITORS’ PICKS
                    </div>
                    <div className="mt-2 text-xl font-black">
                      Featured Brands
                    </div>
                    <div className="mt-2 text-sm font-semibold text-white/70">
                      이번 시즌 무드에 맞춘 추천 브랜드 (스토리 우선)
                    </div>
                  </div>
                  <Link
                    href="/brands"
                    className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-extrabold text-white hover:bg-white/10"
                  >
                    전체 보기 →
                  </Link>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {FEATURED.map((b) => (
                    <Link
                      key={b.name}
                      href={b.href}
                      className="group rounded-2xl border border-white/10 bg-black/30 p-5 hover:bg-white/10"
                    >
                      <div className="text-sm font-black text-white">
                        {b.name}
                      </div>
                      <div className="mt-2 text-sm font-semibold text-white/65">
                        {b.desc}
                      </div>
                      <div className="mt-4 text-xs font-extrabold tracking-[0.22em] text-white/40 group-hover:text-white/70">
                        OPEN →
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom spacing */}
          <div className="h-10" />
        </div>
      </section>

      {/* ✅ 여기부터 "밑에 소개"만 추가 */}
      <HomeAboutSection />
    </div>
  );
}
