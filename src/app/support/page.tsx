"use client";

import { useMemo, useState } from "react";

type Notice = {
  id: string;
  title: string;
  date: string; // YYYY.MM.DD
  category: "공지" | "이벤트";
  summary: string;
};

type FAQ = {
  id: string;
  category: "주문/결제" | "배송" | "교환/반품" | "회원/계정" | "공동구매";
  q: string;
  a: string;
};

const NOTICES: Notice[] = [
  {
    id: "n1",
    title: "설 연휴 배송 일정 안내",
    date: "2026.02.05",
    category: "공지",
    summary:
      "연휴 기간 택배사 운영 일정에 따라 일부 지역 배송이 지연될 수 있습니다.",
  },
  {
    id: "n2",
    title: "프리미엄 아우터 기획전 (기간 한정)",
    date: "2026.02.05",
    category: "이벤트",
    summary:
      "시즌 무드에 맞춘 아우터 큐레이션을 한정 수량으로 선보입니다. (미팅용 예시)",
  },
  {
    id: "n3",
    title: "회원 혜택 정책(적립/쿠폰) 안내",
    date: "2026.02.04",
    category: "공지",
    summary:
      "적립금/쿠폰 정책은 내부 기준에 따라 운영되며, 확정 시 별도 공지됩니다.",
  },
];

const FAQS: FAQ[] = [
  {
    id: "f1",
    category: "주문/결제",
    q: "결제 수단은 무엇을 지원하나요?",
    a: "현재 화면은 데모입니다. 실제 오픈 시 카드/간편결제/계좌이체 등 결제 수단이 확정되면 공지드립니다.",
  },
  {
    id: "f2",
    category: "배송",
    q: "배송 기간은 얼마나 걸리나요?",
    a: "일반 배송은 결제 완료 후 영업일 기준 1–3일 내 출고를 목표로 합니다. 택배사 사정에 따라 변동될 수 있습니다.",
  },
  {
    id: "f3",
    category: "교환/반품",
    q: "교환/반품은 어떻게 진행하나요?",
    a: "상품 수령 후 7일 이내 접수 가능합니다. 상품/패키지 훼손 및 착용 흔적이 있는 경우 제한될 수 있습니다.",
  },
  {
    id: "f4",
    category: "회원/계정",
    q: "비밀번호를 잊어버렸어요.",
    a: "로그인 화면에서 비밀번호 재설정(이메일 인증)을 통해 변경할 수 있습니다. (연동 예정)",
  },
  {
    id: "f5",
    category: "공동구매",
    q: "공동구매 진행 상태는 어디서 확인하나요?",
    a: "공동구매 페이지 및 마이페이지에서 목표 수량/참여 인원/마감일을 확인할 수 있도록 구성 예정입니다.",
  },
];

const FAQ_CATEGORIES: FAQ["category"][] = [
  "주문/결제",
  "배송",
  "교환/반품",
  "회원/계정",
  "공동구매",
];

// 프리미엄 오묘 컬러(골드/바이올렛/틸)
const ACCENT_STRIP =
  "bg-gradient-to-r from-[#D8B47A] via-[#6A5BFF] to-[#2AAFA4]";
const TINT_GOLD = "bg-[#D8B47A]/10";
const TINT_VIOLET = "bg-[#6A5BFF]/10";
const TINT_TEAL = "bg-[#2AAFA4]/10";

// ✅ 공지/이벤트 탭(다크) 스타일을 모든 탭/카테고리 활성 상태에 공통 적용
const ACTIVE_TAB_STYLE =
  "bg-gradient-to-r from-[#111827] via-[#0B1220] to-[#111827] text-white";
const ACTIVE_TAB_SHADOW = "shadow-[0_10px_30px_rgba(17,24,39,0.18)]";

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-[11px] font-extrabold tracking-[0.14em] text-neutral-700">
      {children}
    </span>
  );
}

function NoticeBadge({ category }: { category: Notice["category"] }) {
  if (category === "이벤트") {
    return (
      <span className="rounded-full border border-white/10 bg-gradient-to-r from-[#6A5BFF] via-[#2AAFA4] to-[#D8B47A] px-3 py-1 text-[11px] font-extrabold tracking-[0.14em] text-white">
        이벤트
      </span>
    );
  }
  return (
    <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-[11px] font-extrabold tracking-[0.14em] text-neutral-700">
      공지
    </span>
  );
}

export default function SupportPage() {
  const [tab, setTab] = useState<"공지/이벤트" | "Q&A" | "문의">("공지/이벤트");
  const [faqCategory, setFaqCategory] = useState<FAQ["category"] | "전체">(
    "전체"
  );
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQS[0]?.id ?? null);

  const filteredFaqs = useMemo(() => {
    if (faqCategory === "전체") return FAQS;
    return FAQS.filter((f) => f.category === faqCategory);
  }, [faqCategory]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1120px] px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <span className="inline-flex w-fit rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-extrabold tracking-[0.14em] text-neutral-900">
            SUPPORT
          </span>

          <h1 className="mt-3 text-2xl font-black tracking-[-0.02em] text-neutral-950 md:text-3xl">
            고객센터
          </h1>

          <p className="mt-2 max-w-[80ch] text-sm font-semibold leading-6 text-neutral-600">
            이벤트/공지, 자주 묻는 질문(Q&amp;A), 1:1 문의를 한 곳에서 확인할 수
            있습니다. (미팅용 시연)
          </p>

          {/* 컬러 포인트 라인 */}
          <div className={`mt-5 h-[2px] w-full rounded-full ${ACCENT_STRIP}`} />
        </div>

        {/* Top cards */}
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_10px_30px_rgba(17,24,39,0.06)]">
              {/* 은은한 컬러 베일 */}
              <div className="pointer-events-none absolute inset-0">
                <div
                  className={`absolute -top-20 -left-24 h-56 w-56 rounded-full ${TINT_GOLD} blur-2xl`}
                />
                <div
                  className={`absolute -bottom-20 -right-24 h-64 w-64 rounded-full ${TINT_VIOLET} blur-2xl`}
                />
              </div>

              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="text-base font-black text-neutral-950">
                    빠른 안내
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Tag>배송</Tag>
                    <Tag>교환/반품</Tag>
                    <Tag>공동구매</Tag>
                  </div>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-3">
                  {/* ORDER */}
                  <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
                    <div
                      className={`mb-4 h-[2px] w-full rounded-full ${ACCENT_STRIP}`}
                    />
                    <div className="text-xs font-extrabold tracking-[0.14em] text-neutral-500">
                      ORDER
                    </div>
                    <div className="mt-2 text-sm font-black text-neutral-950">
                      주문/결제
                    </div>
                    <p className="mt-2 text-sm font-semibold leading-6 text-neutral-600">
                      결제 완료 후 주문 상태 및 변경 가능 여부를 안내합니다.
                    </p>
                  </div>

                  {/* DELIVERY */}
                  <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
                    <div className="mb-4 h-[2px] w-full rounded-full bg-gradient-to-r from-[#2AAFA4] via-[#6A5BFF] to-[#2AAFA4]" />
                    <div className="text-xs font-extrabold tracking-[0.14em] text-neutral-500">
                      DELIVERY
                    </div>
                    <div className="mt-2 text-sm font-black text-neutral-950">
                      배송
                    </div>
                    <p className="mt-2 text-sm font-semibold leading-6 text-neutral-600">
                      영업일 기준 1–3일 내 출고를 목표로 합니다.
                    </p>
                  </div>

                  {/* RETURN */}
                  <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
                    <div className="mb-4 h-[2px] w-full rounded-full bg-gradient-to-r from-[#6A5BFF] via-[#D8B47A] to-[#6A5BFF]" />
                    <div className="text-xs font-extrabold tracking-[0.14em] text-neutral-500">
                      RETURN
                    </div>
                    <div className="mt-2 text-sm font-black text-neutral-950">
                      교환/반품
                    </div>
                    <p className="mt-2 text-sm font-semibold leading-6 text-neutral-600">
                      수령 후 7일 이내 접수 가능(상태 기준 적용).
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-neutral-200 bg-white p-5">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="text-xs font-extrabold tracking-[0.14em] text-neutral-500">
                        CONTACT
                      </div>
                      <div className="mt-1 text-sm font-black text-neutral-950">
                        운영 시간(예시) · 10:00–18:00 (주말/공휴일 휴무)
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-neutral-600">
                      이메일: support@gurapalab.com
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side */}
          <div className="lg:col-span-4">
            <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
              <div className={`mb-4 h-[2px] w-full rounded-full ${ACCENT_STRIP}`} />

              {/* 은은한 베일 */}
              <div className="pointer-events-none absolute inset-0">
                <div
                  className={`absolute -top-24 -right-24 h-64 w-64 rounded-full ${TINT_TEAL} blur-2xl`}
                />
              </div>

              <div className="relative">
                <div className="text-xs font-extrabold tracking-[0.14em] text-neutral-500">
                  STATUS
                </div>
                <div className="mt-2 text-base font-black text-neutral-950">
                  서비스 준비 중
                </div>
                <p className="mt-2 text-sm font-semibold leading-6 text-neutral-600">
                  현재는 미팅용 데모 화면입니다. 정책/문의 채널은 오픈 시점에 맞춰
                  확정됩니다.
                </p>
                <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-5">
                  <div className="text-xs font-extrabold tracking-[0.14em] text-neutral-500">
                    TIP
                  </div>
                  <p className="mt-2 text-sm font-semibold leading-6 text-neutral-700">
                    Q&amp;A에서 먼저 확인 후, 1:1 문의로 요청을 남겨주세요.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs (✅ 전부 공지/이벤트 컬러로 통일) */}
        <div className="mt-8 flex flex-wrap gap-2">
          {(["공지/이벤트", "Q&A", "문의"] as const).map((t) => {
            const active = t === tab;

            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={[
                  "rounded-full px-5 py-2 text-sm font-extrabold transition",
                  active
                    ? `${ACTIVE_TAB_STYLE} ${ACTIVE_TAB_SHADOW}`
                    : "border border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100",
                ].join(" ")}
              >
                {t}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="mt-6">
          {/* 공지/이벤트 */}
          {tab === "공지/이벤트" && (
            <div className="grid gap-4 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_10px_30px_rgba(17,24,39,0.06)]">
                  <div className="flex items-center justify-between">
                    <div className="text-base font-black text-neutral-950">
                      공지 · 이벤트
                    </div>
                    <div className="text-xs font-semibold text-neutral-500">
                      * 임시 데이터
                    </div>
                  </div>

                  <div className="mt-5 divide-y divide-neutral-200">
                    {NOTICES.map((n) => (
                      <div key={n.id} className="py-5 first:pt-0 last:pb-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <NoticeBadge category={n.category} />
                              <span className="text-xs font-semibold text-neutral-500">
                                {n.date}
                              </span>
                            </div>
                            <div className="mt-2 text-sm font-black text-neutral-950">
                              {n.title}
                            </div>
                            <p className="mt-2 text-sm font-semibold leading-6 text-neutral-600">
                              {n.summary}
                            </p>
                          </div>

                          <button className="rounded-xl border border-neutral-200 bg-white px-4 py-2 text-xs font-extrabold text-neutral-950 hover:bg-neutral-50">
                            상세
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                  <div className="pointer-events-none absolute inset-0">
                    <div
                      className={`absolute -top-24 -left-24 h-64 w-64 rounded-full ${TINT_VIOLET} blur-2xl`}
                    />
                  </div>

                  <div className="relative">
                    <div className="text-xs font-extrabold tracking-[0.14em] text-neutral-500">
                      EVENT GUIDE
                    </div>
                    <div className="mt-2 text-base font-black text-neutral-950">
                      진행 안내(예시)
                    </div>
                    <ul className="mt-3 space-y-2 text-sm font-semibold leading-6 text-neutral-600">
                      <li>• 이벤트는 기간/수량 기준으로 조기 종료될 수 있습니다.</li>
                      <li>• 공동구매 상품은 마감일/목표 수량을 확인해 주세요.</li>
                      <li>• 상세 정책은 오픈 시점에 확정됩니다.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Q&A */}
          {tab === "Q&A" && (
            <div className="grid gap-4 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                  <div className="pointer-events-none absolute inset-0">
                    <div
                      className={`absolute -bottom-28 -right-28 h-72 w-72 rounded-full ${TINT_TEAL} blur-2xl`}
                    />
                  </div>

                  <div className="relative">
                    <div className="text-xs font-extrabold tracking-[0.14em] text-neutral-500">
                      CATEGORY
                    </div>

                    {/* ✅ 카테고리 탭도 공지/이벤트(다크) 스타일로 통일 */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        onClick={() => setFaqCategory("전체")}
                        className={[
                          "rounded-full px-4 py-2 text-xs font-extrabold transition",
                          faqCategory === "전체"
                            ? `${ACTIVE_TAB_STYLE} ${ACTIVE_TAB_SHADOW}`
                            : "border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50",
                        ].join(" ")}
                      >
                        전체
                      </button>

                      {FAQ_CATEGORIES.map((c) => {
                        const active = faqCategory === c;

                        return (
                          <button
                            key={c}
                            onClick={() => setFaqCategory(c)}
                            className={[
                              "rounded-full px-4 py-2 text-xs font-extrabold transition border",
                              active
                                ? `${ACTIVE_TAB_STYLE} ${ACTIVE_TAB_SHADOW} border-white/10`
                                : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50",
                            ].join(" ")}
                          >
                            {c}
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-5">
                      <div className="text-xs font-extrabold tracking-[0.14em] text-neutral-500">
                        NOTE
                      </div>
                      <p className="mt-2 text-sm font-semibold leading-6 text-neutral-700">
                        질문을 클릭하면 답변이 펼쳐집니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8">
                <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_10px_30px_rgba(17,24,39,0.06)]">
                  <div className="flex items-center justify-between">
                    <div className="text-base font-black text-neutral-950">
                      자주 묻는 질문
                    </div>
                    <div className="text-xs font-semibold text-neutral-500">
                      {filteredFaqs.length}건
                    </div>
                  </div>

                  <div className="mt-5 divide-y divide-neutral-200">
                    {filteredFaqs.map((f) => {
                      const open = openFaqId === f.id;
                      return (
                        <div key={f.id} className="py-4">
                          <button
                            onClick={() => setOpenFaqId(open ? null : f.id)}
                            className="flex w-full items-start justify-between gap-4 text-left"
                          >
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-[11px] font-extrabold tracking-[0.14em] text-neutral-700">
                                  {f.category}
                                </span>
                                <span className="text-sm font-black text-neutral-950">
                                  {f.q}
                                </span>
                              </div>
                            </div>

                            <span className="mt-1 text-neutral-400">
                              {open ? "—" : "+"}
                            </span>
                          </button>

                          {open && (
                            <p className="mt-3 text-sm font-semibold leading-6 text-neutral-600">
                              {f.a}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 문의 */}
          {tab === "문의" && (
            <div className="grid gap-4 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
                  <div className="pointer-events-none absolute inset-0">
                    <div
                      className={`absolute -top-28 -left-28 h-72 w-72 rounded-full ${TINT_GOLD} blur-2xl`}
                    />
                  </div>

                  <div className="relative">
                    <div className="text-xs font-extrabold tracking-[0.14em] text-neutral-500">
                      INQUIRY GUIDE
                    </div>
                    <div className="mt-2 text-base font-black text-neutral-950">
                      1:1 문의 안내
                    </div>
                    <ul className="mt-3 space-y-2 text-sm font-semibold leading-6 text-neutral-600">
                      <li>• 주문번호가 있다면 함께 입력해 주세요.</li>
                      <li>• 상품/배송/반품 문의는 사진 첨부가 도움이 됩니다.</li>
                      <li>• 답변은 영업일 기준 순차적으로 안내됩니다.</li>
                    </ul>

                    <div className="mt-5 rounded-2xl border border-neutral-200 bg-white p-5">
                      <div className="text-xs font-extrabold tracking-[0.14em] text-neutral-500">
                        PARTNERS
                      </div>
                      <p className="mt-2 text-sm font-semibold leading-6 text-neutral-700">
                        입점/제휴 문의는 “문의 유형: 입점/제휴”로 남겨주세요.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_10px_30px_rgba(17,24,39,0.06)]">
                  <div className="flex items-center justify-between">
                    <div className="text-base font-black text-neutral-950">
                      문의 작성
                    </div>
                    <div className="text-xs font-semibold text-neutral-500">
                      * 데모 폼
                    </div>
                  </div>

                  <form
                    className="mt-5 grid gap-4"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="text-xs font-extrabold tracking-[0.14em] text-neutral-500">
                          문의 유형
                        </label>
                        <select className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-900 outline-none focus:border-neutral-400">
                          <option>주문/결제</option>
                          <option>배송</option>
                          <option>교환/반품</option>
                          <option>공동구매</option>
                          <option>입점/제휴</option>
                          <option>기타</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-extrabold tracking-[0.14em] text-neutral-500">
                          주문번호 (선택)
                        </label>
                        <input
                          className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-900 outline-none focus:border-neutral-400"
                          placeholder="예) 20260205-0001"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-extrabold tracking-[0.14em] text-neutral-500">
                        제목
                      </label>
                      <input
                        className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-900 outline-none focus:border-neutral-400"
                        placeholder="문의 제목을 입력해 주세요."
                      />
                    </div>

                    <div>
                      <label className="text-xs font-extrabold tracking-[0.14em] text-neutral-500">
                        내용
                      </label>
                      <textarea
                        className="mt-2 min-h-[160px] w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-900 outline-none focus:border-neutral-400"
                        placeholder="문의 내용을 입력해 주세요."
                      />
                      <div className="mt-2 text-xs font-semibold text-neutral-500">
                        개인 정보(주민번호/카드번호 등)는 입력하지 마세요.
                      </div>
                    </div>

                    <div className="mt-2 flex gap-2">
                      <button className="flex-1 rounded-xl bg-neutral-950 px-4 py-3 text-sm font-extrabold text-white hover:opacity-90">
                        문의 접수
                      </button>
                      <button
                        type="button"
                        className="flex-1 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-extrabold text-neutral-950 hover:bg-neutral-50"
                      >
                        초기화
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 h-px bg-neutral-200" />
      </div>
    </div>
  );
}
