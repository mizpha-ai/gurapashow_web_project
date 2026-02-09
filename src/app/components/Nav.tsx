"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type MenuItem = { href: string; label: string };

const MENUS: MenuItem[] = [
  { href: "/", label: "HOME" },
  { href: "/group-buy", label: "공동구매" },
  { href: "/brands", label: "입점브랜드" },
  { href: "/support", label: "고객센터" },
];

// 홈/브랜드 스토리텔링 감성 유지용(드롭다운 추천 리스트)
const FEATURED_BRANDS = [
  { name: "AURORA ATELIER", desc: "Modern tailoring", href: "/brands#aurora" },
  { name: "NOIR STUDIO", desc: "Monochrome essentials", href: "/brands#noir" },
  { name: "LUMEN ARCHIVE", desc: "Modern classics", href: "/brands#lumen" },
  { name: "SABLE HOUSE", desc: "Premium knitwear", href: "/brands#sable" },
  { name: "VELVET LINE", desc: "Wedding & evening", href: "/brands#velvet" },
  { name: "RARE OBJECTS", desc: "Accessories", href: "/brands#rare" },
];

const navPillBase =
  "rounded-full px-5 py-2.5 text-sm font-extrabold tracking-[-0.01em] transition " +
  "focus:outline-none focus:ring-2 focus:ring-white/15";

const navPillActive = "bg-white text-neutral-950";
const navPillIdle = "text-neutral-200 hover:bg-white/10";

export default function Nav() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  const isBrandsActive = pathname?.startsWith("/brands");

  const [brandsOpen, setBrandsOpen] = useState(false);
  const lockRef = useRef(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setBrandsOpen(false);
    lockRef.current = false;
  }, [pathname]);

  useEffect(() => {
    const onDocDown = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) {
        setBrandsOpen(false);
        lockRef.current = false;
      }
    };
    document.addEventListener("mousedown", onDocDown);
    return () => document.removeEventListener("mousedown", onDocDown);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setBrandsOpen(false);
        lockRef.current = false;
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const closeAndLock = () => {
    setBrandsOpen(false);
    lockRef.current = true;
  };

  return (
    <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-9">
      {MENUS.map((m) => {
        if (m.href === "/brands") {
          return (
            <div
              key={m.href}
              ref={wrapRef}
              className="relative"
              onMouseMove={() => {
                if (lockRef.current) return;
                if (!brandsOpen) setBrandsOpen(true);
              }}
              onMouseLeave={() => {
                setBrandsOpen(false);
                lockRef.current = false;
              }}
              onPointerDownCapture={() => {
                if (brandsOpen) closeAndLock();
              }}
            >
              <Link
                href="/brands"
                onClick={() => closeAndLock()}
                className={[
                  navPillBase,
                  isBrandsActive ? navPillActive : navPillIdle,
                ].join(" ")}
              >
                입점브랜드
              </Link>

              {/* dropdown */}
              <div
                className={[
                  "absolute left-1/2 top-full z-30 w-[420px] -translate-x-1/2",
                  "mt-3 transition duration-200 ease-out",
                  brandsOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-1 pointer-events-none",
                ].join(" ")}
              >
                <span aria-hidden className="absolute left-0 right-0 -top-3 h-3" />

                {/* caret */}
                <div className="mx-auto h-2 w-2 rotate-45 border-l border-t border-white/10 bg-neutral-950" />

                <div className="mt-[-4px] overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-[0_24px_70px_rgba(0,0,0,0.45)]">
                  <div className="border-b border-white/10 px-6 py-5">
                    <div className="text-xs font-extrabold tracking-[0.14em] text-neutral-300">
                      BRANDS
                    </div>
                    <div className="mt-1 text-sm font-black tracking-[-0.01em] text-white">
                      추천 브랜드 바로가기
                    </div>
                    <div className="mt-1 text-xs font-semibold text-neutral-400">
                      홈의 “소개/갤러리” 섹션과 톤을 맞춘 구성
                    </div>
                  </div>

                  <div className="p-3">
                    {FEATURED_BRANDS.map((b) => (
                      <Link
                        key={b.href}
                        href={b.href}
                        onClick={() => closeAndLock()}
                        className="group/item flex items-start justify-between gap-3 rounded-xl px-4 py-3 transition hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/10"
                      >
                        <div className="min-w-0">
                          <div className="truncate text-sm font-black text-white">
                            {b.name}
                          </div>
                          <div className="mt-1 truncate text-xs font-semibold text-neutral-400">
                            {b.desc}
                          </div>
                        </div>
                        <span className="pt-0.5 text-xs font-black text-neutral-600 transition group-hover/item:text-white">
                          →
                        </span>
                      </Link>
                    ))}
                  </div>

                  <div className="border-t border-white/10 px-4 py-3">
                    <Link
                      href="/brands"
                      onClick={() => closeAndLock()}
                      className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-extrabold text-neutral-950 hover:opacity-90"
                    >
                      전체 브랜드 보기
                      <span className="text-xs font-black">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        }

        const active = isActive(m.href);
        return (
          <Link
            key={m.href}
            href={m.href}
            className={[navPillBase, active ? navPillActive : navPillIdle].join(
              " "
            )}
          >
            {m.label}
          </Link>
        );
      })}
    </nav>
  );
}
