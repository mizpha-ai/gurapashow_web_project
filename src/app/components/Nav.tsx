"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type MenuItem = { href: string; label: string };

const MENUS: MenuItem[] = [
  { href: "/", label: "HOME" },
  { href: "/group-buy", label: "공동구매" },
  { href: "/brands", label: "입점브랜드" },
  { href: "/about", label: "소개" },
  { href: "/support", label: "고객센터" },
];

const FEATURED_BRANDS = [
  { name: "AURORA ATELIER", desc: "Modern tailoring", href: "/brands#aurora" },
  { name: "NOIR STUDIO", desc: "Monochrome essentials", href: "/brands#noir" },
  { name: "LUMEN ARCHIVE", desc: "Modern classics", href: "/brands#lumen" },
  { name: "SABLE HOUSE", desc: "Premium knitwear", href: "/brands#sable" },
  { name: "VELVET LINE", desc: "Wedding & evening", href: "/brands#velvet" },
  { name: "RARE OBJECTS", desc: "Accessories", href: "/brands#rare" },
];

export default function Nav() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  const isBrandsActive = pathname?.startsWith("/brands");

  const [brandsOpen, setBrandsOpen] = useState(false);

  // ✅ 클릭 후 재오픈 방지 잠금
  const lockRef = useRef(false);

  // ✅ 바깥 클릭 닫기
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
              // ✅ 마우스가 실제로 움직여야 열림 (라우트 이동 후 자동 재오픈 방지)
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
                {/* ✅ 공백(데드존) 없애는 투명 브릿지: mt-3(12px) 만큼 위로 덮어줌 */}
                <span
                  aria-hidden
                  className="absolute left-0 right-0 -top-3 h-3"
                />

                {/* caret */}
                <div className="mx-auto h-2 w-2 rotate-45 border-l border-t border-neutral-200 bg-white" />

                <div className="mt-[-4px] overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_24px_70px_rgba(17,24,39,0.16)]">
                  <div className="border-b border-neutral-200 px-6 py-5">
                    <div className="text-xs font-extrabold tracking-[0.14em] text-neutral-500">
                      BRANDS
                    </div>
                    <div className="mt-1 text-sm font-black tracking-[-0.01em] text-neutral-950">
                      추천 브랜드 바로가기
                    </div>
                    <div className="mt-1 text-xs font-semibold text-neutral-500">
                      미팅용 구성(임시)
                    </div>
                  </div>

                  <div className="p-3">
                    {FEATURED_BRANDS.map((b) => (
                      <Link
                        key={b.href}
                        href={b.href}
                        onClick={() => closeAndLock()}
                        className="group/item flex items-start justify-between gap-3 rounded-xl px-4 py-3 transition hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-950/10"
                      >
                        <div className="min-w-0">
                          <div className="truncate text-sm font-black text-neutral-950">
                            {b.name}
                          </div>
                          <div className="mt-1 truncate text-xs font-semibold text-neutral-500">
                            {b.desc}
                          </div>
                        </div>
                        <span className="pt-0.5 text-xs font-black text-neutral-300 transition group-hover/item:text-neutral-700">
                          →
                        </span>
                      </Link>
                    ))}
                  </div>

                  <div className="border-t border-neutral-200 px-4 py-3">
                    <Link
                      href="/brands"
                      onClick={() => closeAndLock()}
                      className="flex items-center justify-between rounded-xl bg-neutral-950 px-4 py-3 text-sm font-extrabold text-white hover:opacity-90"
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

const navPillBase =
  "rounded-full px-5 py-2.5 text-sm font-extrabold tracking-[-0.01em] transition " +
  "focus:outline-none focus:ring-2 focus:ring-neutral-950/10";

const navPillActive = "bg-neutral-950 text-white";
const navPillIdle = "text-neutral-900 hover:bg-neutral-100";
