"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "gurapa_entry_popup_hide_until_v1";
function ms(hours: number) {
  return hours * 60 * 60 * 1000;
}

export default function EntryEventPopup() {
  const [open, setOpen] = useState(false);

  const EVENT = useMemo(
    () => ({
      title: "Canadian Fashion Mission in Seoul",
      subtitle: "캐나다 패션 전시 및 비즈니스 미팅",
      dateRange: "2026.02.04 (수) – 2026.02.05 (목)",
      time: "10:00 – 18:00",
      location: "주한 캐나다 대사관 1층 스코필드홀 · 서울 중구 정동길 21",

      // ✅ 가로 사진: public/events/에 넣고 경로만 맞추면 됨
      heroImageSrc: "/images/popup.png",

      // ✅ 사전등록 링크(없으면 구글폼/네이버폼/메일 링크도 가능)
      rsvpUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdlFE4FB9EZgmu5oVXzMxxSniT3puP1RFdV6Xv7yYcHI31Apw/viewform",

      desc1:
        "주한캐나다대사관에서 캐나다 패션 전시 및 상담회를 개최합니다. 한국의 주요 수입사 및 유통사를 모시고, 캐나다 기업 및 브랜드를 소개하고 비즈니스 기회를 확대하고자 마련되었습니다.",
      desc2:
        "실용성과 기능성을 기반으로 라이프스타일·아웃도어·컨템포러리 트렌드와 높은 접점을 가진 브랜드들의 가능성을 확인하실 수 있습니다.",
    }),
    []
  );

  useEffect(() => {
    const hideUntilRaw = localStorage.getItem(STORAGE_KEY);
    const hideUntil = hideUntilRaw ? Number(hideUntilRaw) : 0;
    const now = Date.now();
    if (!hideUntil || now >= hideUntil) setOpen(true);
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function closeFor(hours: number) {
    localStorage.setItem(STORAGE_KEY, String(Date.now() + ms(hours)));
    setOpen(false);
  }

  function closeOnce() {
    // X / 나가기: 저장 없이 닫기(다시 들어오면 다시 뜸)
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 py-10"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) closeOnce();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Event popup"
    >
      <div className="relative w-full max-w-[640px] overflow-hidden rounded-3xl border border-white/10 bg-white shadow-[0_28px_80px_rgba(0,0,0,0.35)]">
        {/* top accent */}
        <div className="h-[3px] w-full bg-gradient-to-r from-[#D8B47A] via-[#6A5BFF] to-[#2AAFA4]" />

        {/* close */}
        <button
          onClick={closeOnce}
          className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50"
          aria-label="Close"
        >
          ✕
        </button>

        {/* image hero (가로 사진: contain으로 안 잘리게) */}
        <div className="relative">
          <div className="relative aspect-[16/9] w-full bg-neutral-100">
            {/* 배경 베일 */}
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-100 to-white" />
            {/* 이미지 */}
            <img
              src={EVENT.heroImageSrc}
              alt="Event"
              className="relative h-full w-full object-contain"
            />
          </div>

          {/* 타이틀 오버레이 */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

          <div className="absolute bottom-4 left-4 right-16">
            <span className="inline-flex rounded-full border border-white/20 bg-black/25 px-3 py-1 text-[10px] font-extrabold tracking-[0.14em] text-white backdrop-blur">
              EVENT
            </span>
            <div className="mt-3 text-lg font-black tracking-[-0.02em] text-white">
              {EVENT.title}
            </div>
            <div className="mt-1 text-sm font-semibold text-white/90">
              {EVENT.subtitle}
            </div>
          </div>
        </div>

        {/* content */}
        <div className="relative p-5 md:p-6">
          {/* soft tints */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-16 -left-20 h-48 w-48 rounded-full bg-[#D8B47A]/10 blur-2xl" />
            <div className="absolute -bottom-16 -right-20 h-56 w-56 rounded-full bg-[#6A5BFF]/10 blur-2xl" />
          </div>

          <div className="relative">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="text-base font-black tracking-[-0.02em] text-neutral-950 md:text-lg">
                  {EVENT.dateRange}
                </div>
                <div className="mt-1 text-sm font-semibold text-neutral-600">
                  {EVENT.time}
                </div>
              </div>

              <span className="inline-flex rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-[10px] font-extrabold tracking-[0.14em] text-neutral-700">
                SEOUL
              </span>
            </div>

            <div className="mt-3 text-sm font-semibold leading-6 text-neutral-700">
              {EVENT.location}
            </div>

            <div className="mt-4 grid gap-2">
              <p className="text-sm font-semibold leading-7 text-neutral-700">
                {EVENT.desc1}
              </p>
              <p className="text-sm font-semibold leading-7 text-neutral-600">
                {EVENT.desc2}
              </p>
            </div>

            {/* actions */}
            <div className="mt-5 grid gap-2 md:grid-cols-2">
              <a
                href={EVENT.rsvpUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-neutral-950 px-4 py-3 text-sm font-extrabold text-white hover:opacity-90"
              >
                RSVP 사전등록
              </a>

              <button
                onClick={closeOnce}
                className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-extrabold text-neutral-950 hover:bg-neutral-50"
              >
                나가기
              </button>
            </div>

            {/* dismiss options */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                onClick={() => closeFor(3)}
                className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-xs font-extrabold text-neutral-700 hover:bg-neutral-100"
              >
                3시간 동안 안 보기
              </button>
              <button
                onClick={() => closeFor(24)}
                className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-xs font-extrabold text-neutral-700 hover:bg-neutral-100"
              >
                하루 동안 안 보기
              </button>

              <div className="ml-auto hidden text-xs font-semibold text-neutral-500 md:block">
                ESC / 바깥 클릭으로 닫기
              </div>
            </div>

            {/* 작은 안내 */}
            <div className="mt-2 text-xs font-semibold text-neutral-500">
              * X 또는 나가기는 “다시 보지 않기” 설정 없이 닫힙니다.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
