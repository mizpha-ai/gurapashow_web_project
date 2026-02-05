"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../../lib/firebase";

type OrderStatus = "결제완료" | "배송준비" | "배송중" | "배송완료";
type Order = {
  id: string;
  date: string;
  title: string;
  price: number;
  status: OrderStatus;
};

const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-240201",
    date: "2026-02-01",
    title: "울 블렌드 코트 / 블랙",
    price: 389000,
    status: "배송중",
  },
  {
    id: "ORD-240128",
    date: "2026-01-28",
    title: "테일러드 슬랙스 / 차콜",
    price: 219000,
    status: "배송완료",
  },
  {
    id: "ORD-240123",
    date: "2026-01-23",
    title: "실크 블렌드 블라우스 / 아이보리",
    price: 179000,
    status: "배송준비",
  },
];

const numberKRW = (n: number) =>
  new Intl.NumberFormat("ko-KR").format(n) + "원";

function StatusPill({ status }: { status: OrderStatus }) {
  const cls =
    status === "배송완료"
      ? "bg-neutral-950 text-white"
      : status === "배송중"
      ? "bg-neutral-900 text-white"
      : "border border-neutral-200 bg-white text-neutral-950";

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-extrabold ${cls}`}>
      {status}
    </span>
  );
}

export default function MyPage() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setReady(true);
    });
    return () => unsub();
  }, []);

  const shippingSummary = useMemo(() => {
    const base = { "배송준비": 0, "배송중": 0, "배송완료": 0 } as const;
    const res = { ...base };
    for (const o of MOCK_ORDERS) {
      if (o.status === "배송준비") res["배송준비"]++;
      if (o.status === "배송중") res["배송중"]++;
      if (o.status === "배송완료") res["배송완료"]++;
    }
    return res;
  }, []);

  if (!ready) {
    return (
      <div className="mx-auto max-w-[1120px] px-6 py-10">
        <div className="h-8 w-40 rounded-xl bg-neutral-100" />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="h-32 rounded-2xl bg-neutral-100" />
          <div className="h-32 rounded-2xl bg-neutral-100" />
          <div className="h-32 rounded-2xl bg-neutral-100" />
        </div>
      </div>
    );
  }

  // ✅ 로그인 안 했으면 안내 UI (미팅용으로도 깔끔)
  if (!user) {
    return (
      <div className="mx-auto max-w-[1120px] px-6 py-12">
        <span className="inline-flex w-fit rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-extrabold tracking-[0.14em] text-neutral-900">
          MY PAGE
        </span>
        <h1 className="mt-3 text-2xl font-black tracking-[-0.02em] text-neutral-950">
          마이페이지
        </h1>
        <p className="mt-2 text-sm font-semibold text-neutral-600">
          주문/배송 현황, 찜, 장바구니는 로그인 후 이용할 수 있어요.
        </p>

        <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-8 shadow-[0_10px_30px_rgba(17,24,39,0.06)]">
          <div className="text-base font-black text-neutral-950">
            로그인 후 이용 가능
          </div>
          <div className="mt-2 text-sm font-semibold leading-6 text-neutral-600">
            미팅용 화면에서는 이메일/비밀번호 로그인만 연결되어 있습니다.
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href="/login"
              className="rounded-full bg-neutral-950 px-5 py-3 text-sm font-extrabold text-white hover:opacity-90"
            >
              로그인
            </Link>
            <Link
              href="/signup"
              className="rounded-full border border-neutral-200 bg-white px-5 py-3 text-sm font-extrabold text-neutral-950 hover:bg-neutral-50"
            >
              회원가입
            </Link>
            <Link
              href="/"
              className="rounded-full border border-neutral-200 bg-white px-5 py-3 text-sm font-extrabold text-neutral-950 hover:bg-neutral-50"
            >
              홈으로
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ✅ 로그인 상태
  return (
    <div className="mx-auto max-w-[1120px] px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="inline-flex w-fit rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-extrabold tracking-[0.14em] text-neutral-900">
            MY PAGE
          </span>
          <h1 className="mt-3 text-2xl font-black tracking-[-0.02em] text-neutral-950">
            마이페이지
          </h1>
          <p className="mt-2 text-sm font-semibold text-neutral-600">
            {user.email} · 주문/배송 현황과 관심 상품을 한눈에 확인하세요.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/cart"
            className="rounded-full border border-neutral-200 bg-white px-5 py-3 text-sm font-extrabold text-neutral-950 hover:bg-neutral-50"
          >
            장바구니
          </Link>
          <Link
            href="/wishlist"
            className="rounded-full bg-neutral-950 px-5 py-3 text-sm font-extrabold text-white hover:opacity-90"
          >
            찜한 상품
          </Link>
        </div>
      </div>

      {/* 배송 현황 요약 */}
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_10px_30px_rgba(17,24,39,0.06)]">
          <div className="text-xs font-extrabold tracking-[0.14em] text-neutral-500">
            SHIPPING
          </div>
          <div className="mt-2 text-base font-black text-neutral-950">
            배송 현황
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-center">
              <div className="text-xs font-extrabold text-neutral-500">
                배송준비
              </div>
              <div className="mt-2 text-2xl font-black text-neutral-950">
                {shippingSummary["배송준비"]}
              </div>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-center">
              <div className="text-xs font-extrabold text-neutral-500">
                배송중
              </div>
              <div className="mt-2 text-2xl font-black text-neutral-950">
                {shippingSummary["배송중"]}
              </div>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-center">
              <div className="text-xs font-extrabold text-neutral-500">
                배송완료
              </div>
              <div className="mt-2 text-2xl font-black text-neutral-950">
                {shippingSummary["배송완료"]}
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm font-semibold text-neutral-600">
            * 미팅용 더미 데이터로 표시됩니다.
          </p>
        </div>

        {/* 빠른 메뉴 */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_10px_30px_rgba(17,24,39,0.06)]">
          <div className="text-xs font-extrabold tracking-[0.14em] text-neutral-500">
            QUICK
          </div>
          <div className="mt-2 text-base font-black text-neutral-950">
            빠른 메뉴
          </div>

          <div className="mt-5 grid gap-2">
            <Link
              href="/brands"
              className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-extrabold text-neutral-950 hover:bg-neutral-50"
            >
              입점브랜드 보기
            </Link>
            <Link
              href="/support"
              className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-extrabold text-neutral-950 hover:bg-neutral-50"
            >
              고객센터 / 1:1 문의
            </Link>
            <Link
              href="/group-buy"
              className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-extrabold text-neutral-950 hover:bg-neutral-50"
            >
              공동구매 참여하기
            </Link>
          </div>
        </div>

        {/* 계정 */}
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
          <div className="text-xs font-extrabold tracking-[0.14em] text-neutral-500">
            ACCOUNT
          </div>
          <div className="mt-2 text-base font-black text-neutral-950">
            계정 정보
          </div>
          <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-4">
            <div className="text-xs font-extrabold tracking-[0.14em] text-neutral-500">
              EMAIL
            </div>
            <div className="mt-2 text-sm font-black text-neutral-950">
              {user.email}
            </div>
          </div>
          <p className="mt-4 text-sm font-semibold text-neutral-600">
            비밀번호 변경/프로필 수정은 추후 연결 예정입니다.
          </p>
        </div>
      </div>

      {/* 주문 내역 */}
      <div className="mt-8">
        <div className="mb-3 flex items-end justify-between">
          <div className="text-sm font-extrabold text-neutral-950">
            최근 주문 내역
          </div>
          <div className="text-xs font-semibold text-neutral-500">
            * 더미 데이터
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_10px_30px_rgba(17,24,39,0.06)]">
          <div className="grid grid-cols-12 border-b border-neutral-200 bg-neutral-50 px-6 py-4 text-xs font-extrabold tracking-[0.14em] text-neutral-500">
            <div className="col-span-3">주문일</div>
            <div className="col-span-5">상품</div>
            <div className="col-span-2">금액</div>
            <div className="col-span-2 text-right">상태</div>
          </div>

          {MOCK_ORDERS.map((o) => (
            <div
              key={o.id}
              className="grid grid-cols-12 items-center px-6 py-5 text-sm"
            >
              <div className="col-span-3 font-semibold text-neutral-700">
                <div className="font-black text-neutral-950">{o.date}</div>
                <div className="mt-1 text-xs font-semibold text-neutral-500">
                  {o.id}
                </div>
              </div>
              <div className="col-span-5 font-semibold text-neutral-700">
                {o.title}
              </div>
              <div className="col-span-2 font-black text-neutral-950">
                {numberKRW(o.price)}
              </div>
              <div className="col-span-2 flex justify-end">
                <StatusPill status={o.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
