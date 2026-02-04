"use client";

import { useEffect, useMemo, useState } from "react";

type GroupBuy = {
  goalQty: number;
  joined: number;
  deadlineISO: string;
  groupPrice: number;
  originalPrice?: number;
};

type Item = {
  id: string;
  line?: string;
  name: string;
  desc: string;
  groupBuy: GroupBuy;
};

type FilterKey = "all" | "active" | "endingSoon" | "ended";

const formatWon = (n: number) => `₩ ${n.toLocaleString("ko-KR")}`;

const ITEMS: Item[] = [
  {
    id: "gb-1",
    line: "Signature Line",
    name: "울 블렌드 트렌치 코트",
    desc: "옷 소개를 적어주세요.",
    groupBuy: {
      goalQty: 120,
      joined: 54,
      deadlineISO: new Date(Date.now() + 40 * 60 * 60 * 1000).toISOString(),
      groupPrice: 279000,
      originalPrice: 349000,
    },
  },
  {
    id: "gb-2",
    line: "Essential",
    name: "코튼 티셔츠 3팩",
    desc: "옷 소개를 적어주세요.",
    groupBuy: {
      goalQty: 300,
      joined: 268,
      deadlineISO: new Date(Date.now() + 7 * 60 * 60 * 1000).toISOString(), // 임박
      groupPrice: 159000,
      originalPrice: 199000,
    },
  },
  {
    id: "gb-3",
    line: "Denim",
    name: "테일러드 와이드 데님",
    desc: "옷 소개를 적어주세요.",
    groupBuy: {
      goalQty: 180,
      joined: 77,
      deadlineISO: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      groupPrice: 189000,
      originalPrice: 239000,
    },
  },
  {
    id: "gb-4",
    line: "Knit Set",
    name: "니트 셋업 (상의 + 하의)",
    desc: "옷 소개를 적어주세요.",
    groupBuy: {
      goalQty: 140,
      joined: 141,
      deadlineISO: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 종료
      groupPrice: 269000,
      originalPrice: 319000,
    },
  },
];

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "active", label: "진행" },
  { key: "endingSoon", label: "마감 임박" },
  { key: "ended", label: "마감" },
];

function msLeft(deadlineISO: string) {
  return new Date(deadlineISO).getTime() - Date.now();
}

function statusOf(deadlineISO: string) {
  const left = msLeft(deadlineISO);
  if (left <= 0) return "ended" as const;
  if (left <= 24 * 60 * 60 * 1000) return "endingSoon" as const;
  return "active" as const;
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function toParts(leftMs: number) {
  const s = Math.max(0, Math.floor(leftMs / 1000));
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const mins = Math.floor((s % 3600) / 60);
  return { days, hours, mins };
}

export default function GroupBuyPage() {
  const [filter, setFilter] = useState<FilterKey>("all");

  // 남은 시간 표시 갱신(미팅용)
  const [, tick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => tick((v) => v + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const filtered = useMemo(() => {
    const list = ITEMS.filter((it) => {
      const st = statusOf(it.groupBuy.deadlineISO);
      if (filter === "all") return true;
      if (filter === "active") return st === "active";
      if (filter === "endingSoon") return st === "endingSoon";
      if (filter === "ended") return st === "ended";
      return true;
    });

    // 마감은 아래로, 나머지는 마감 가까운 순
    return list.sort((a, b) => {
      const aSt = statusOf(a.groupBuy.deadlineISO);
      const bSt = statusOf(b.groupBuy.deadlineISO);
      if (aSt === "ended" && bSt !== "ended") return 1;
      if (aSt !== "ended" && bSt === "ended") return -1;
      return new Date(a.groupBuy.deadlineISO).getTime() - new Date(b.groupBuy.deadlineISO).getTime();
    });
  }, [filter]);

  return (
    <div className="mx-auto max-w-[1120px] px-6 py-7">
      <div className="mb-4">
        <span className="inline-flex w-fit rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-extrabold tracking-[0.12em] text-neutral-900">
          GROUP BUY
        </span>
        <h1 className="mt-3 text-2xl font-black tracking-[-0.02em] text-neutral-950 md:text-3xl">
          공동구매 컬렉션
        </h1>
        <p className="mt-2 text-sm font-semibold leading-6 text-neutral-600">
          목표 수량 · 참여 인원 · 마감일 · 공구가 기준으로 진행 상황을 확인합니다. 본 화면은 미팅용 시연 페이지입니다.
        </p>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = filter === f.key;
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={[
                "rounded-full border px-4 py-2 text-sm font-extrabold",
                active
                  ? "border-neutral-950 bg-neutral-950 text-white"
                  : "border-neutral-200 bg-white text-neutral-950 hover:bg-neutral-50",
              ].join(" ")}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((it) => (
          <Card key={it.id} item={it} />
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm font-semibold leading-6 text-neutral-600">
        이미지 영역은 비워둔 상태입니다. 미팅 이후 실제 이미지 및 상세 페이지 연결을 추가하면 됩니다.
      </div>
    </div>
  );
}

function Card({ item }: { item: Item }) {
  const gb = item.groupBuy;
  const st = statusOf(gb.deadlineISO);
  const left = msLeft(gb.deadlineISO);
  const t = toParts(left);

  const progressPct = gb.goalQty <= 0 ? 0 : clamp((gb.joined / gb.goalQty) * 100, 0, 100);
  const statusLabel = st === "ended" ? "마감" : st === "endingSoon" ? "마감 임박" : "진행";

  return (
    <article className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_10px_30px_rgba(17,24,39,0.06)]">
      {/* image placeholder */}
      <div className="relative h-48 bg-neutral-100">
        <span
          className={[
            "absolute left-3 top-3 rounded-full border px-3 py-1 text-xs font-extrabold",
            st === "endingSoon"
              ? "border-amber-200 bg-amber-50 text-amber-800"
              : st === "ended"
              ? "border-neutral-200 bg-neutral-50 text-neutral-500"
              : "border-neutral-200 bg-white text-neutral-900",
          ].join(" ")}
        >
          {statusLabel}
        </span>
      </div>

      <div className="flex flex-col gap-3 p-4">
        <div className="text-xs font-extrabold tracking-[0.06em] text-neutral-500">
          {item.line ?? "COLLECTION"}
        </div>

        <div>
          <div className="text-base font-black tracking-[-0.01em] text-neutral-950">{item.name}</div>
          <div className="mt-1 text-sm font-semibold leading-6 text-neutral-600">{item.desc}</div>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="text-xs font-extrabold text-neutral-500">공구가</div>
            <div className="text-lg font-black text-neutral-950">{formatWon(gb.groupPrice)}</div>
          </div>

          {gb.originalPrice ? (
            <div className="text-right">
              <div className="text-xs font-extrabold text-neutral-500">정가</div>
              <div className="text-sm font-extrabold text-neutral-400 line-through">
                {formatWon(gb.originalPrice)}
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex items-center justify-between gap-3 text-xs font-semibold text-neutral-600">
          <span>
            목표 {gb.goalQty.toLocaleString("ko-KR")} / 참여 {gb.joined.toLocaleString("ko-KR")}
          </span>
          <span>
            {st === "ended"
              ? "마감"
              : `${t.days}일 ${String(t.hours).padStart(2, "0")}시간 ${String(t.mins).padStart(2, "0")}분`}
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full border border-neutral-200 bg-neutral-100">
          <div
            className={[
              "h-full",
              st === "endingSoon" ? "bg-amber-800" : st === "ended" ? "bg-neutral-300" : "bg-neutral-950",
            ].join(" ")}
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            className={[
              "rounded-xl px-4 py-3 text-sm font-extrabold",
              st === "ended"
                ? "cursor-not-allowed border border-neutral-200 bg-neutral-100 text-neutral-500"
                : "bg-neutral-950 text-white hover:opacity-90",
            ].join(" ")}
            disabled={st === "ended"}
          >
            {st === "ended" ? "마감" : "참여"}
          </button>
          <button className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-extrabold text-neutral-950 hover:bg-neutral-50">
            상세
          </button>
        </div>

        <div className="pt-1 text-xs font-semibold text-neutral-500">
          마감일: {new Date(gb.deadlineISO).toLocaleString("ko-KR")}
        </div>
      </div>
    </article>
  );
}
