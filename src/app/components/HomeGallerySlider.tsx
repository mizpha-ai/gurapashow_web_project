"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const Slick = dynamic(() => import("react-slick").then((m) => m.default), {
  ssr: false,
});

type Slide = {
  src: string;
  alt?: string;
  title?: string;
  desc?: string;
  href?: string;
};

export default function HomeGallerySlider({
  title = "GURAPA LAB Gallery",
  subtitle = "브랜드 무드를 보여주는 갤러리 섹션 (미팅용 샘플)",
  slides,
}: {
  title?: string;
  subtitle?: string;
  slides: Slide[];
}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4200,
    pauseOnHover: true,
    arrows: true,
  } as const;

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-neutral-950">{title}</h2>
          <p className="mt-1 text-xs font-semibold text-neutral-500">{subtitle}</p>
        </div>

        <Link
          href="/brands"
          className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-extrabold text-neutral-950 hover:bg-neutral-50"
        >
          입점브랜드 →
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_10px_30px_rgba(17,24,39,0.06)]">
        <div className="relative">
          <Slick {...settings}>
            {slides.map((s, idx) => (
              <div key={`${s.src}-${idx}`}>
                <div className="relative h-[360px] w-full bg-neutral-100">
                  <Image
                    src={s.src}
                    alt={s.alt ?? `slide-${idx}`}
                    fill
                    className="object-cover"
                    priority={idx === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                  <div className="absolute bottom-5 left-5 right-5">
                    {s.title ? (
                      <div className="text-xl font-black tracking-[-0.02em] text-white">
                        {s.title}
                      </div>
                    ) : null}
                    {s.desc ? (
                      <div className="mt-2 max-w-[80ch] text-sm font-semibold leading-6 text-white/90">
                        {s.desc}
                      </div>
                    ) : null}

                    {s.href ? (
                      <div className="mt-3">
                        <Link
                          href={s.href}
                          className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-extrabold text-neutral-950 hover:opacity-90"
                        >
                          더 보기 →
                        </Link>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </Slick>
        </div>
      </div>
    </section>
  );
}
