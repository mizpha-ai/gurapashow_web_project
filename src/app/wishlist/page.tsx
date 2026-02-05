"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../../lib/firebase";

const MOCK_WISHLIST = [
  { id: "W1", name: "캐시미어 블렌드 코트", price: "389,000원" },
  { id: "W2", name: "테일러드 원피스 (하객룩)", price: "249,000원" },
  { id: "W3", name: "실크 블렌드 블라우스", price: "179,000원" },
];

export default function WishlistPage() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setReady(true);
    });
    return () => unsub();
  }, []);

  if (!ready) {
    return (
      <div className="mx-auto max-w-[1120px] px-6 py-10">
        <div className="h-8 w-48 rounded-xl bg-neutral-100" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-[1120px] px-6 py-12">
        <h1 className="text-2xl font-black tracking-[-0.02em] text-neutral-950">
          찜한 상품
        </h1>
        <p className="mt-2 text-sm font-semibold text-neutral-600">
          로그인 후 이용할 수 있어요.
        </p>
        <div className="mt-6 flex gap-2">
          <Link
            href="/login"
            className="rounded-full bg-neutral-950 px-5 py-3 text-sm font-extrabold text-white hover:opacity-90"
          >
            로그인
          </Link>
          <Link
            href="/"
            className="rounded-full border border-neutral-200 bg-white px-5 py-3 text-sm font-extrabold text-neutral-950 hover:bg-neutral-50"
          >
            홈으로
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1120px] px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="inline-flex w-fit rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-extrabold tracking-[0.14em] text-neutral-900">
            WISHLIST
          </span>
          <h1 className="mt-3 text-2xl font-black tracking-[-0.02em] text-neutral-950">
            찜한 상품
          </h1>
          <p className="mt-2 text-sm font-semibold text-neutral-600">
            {user.email} · 관심 상품 {MOCK_WISHLIST.length}개
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
            href="/mypage"
            className="rounded-full bg-neutral-950 px-5 py-3 text-sm font-extrabold text-white hover:opacity-90"
          >
            마이페이지
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_WISHLIST.map((p) => (
          <div
            key={p.id}
            className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_10px_30px_rgba(17,24,39,0.06)]"
          >
            <div className="h-44 bg-neutral-100" />
            <div className="p-6">
              <div className="text-sm font-black text-neutral-950">{p.name}</div>
              <div className="mt-2 text-sm font-extrabold text-neutral-700">
                {p.price}
              </div>

              <div className="mt-6 flex gap-2">
                <button className="flex-1 rounded-xl bg-neutral-950 px-4 py-3 text-sm font-extrabold text-white hover:opacity-90">
                  장바구니 담기
                </button>
                <button className="flex-1 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-extrabold text-neutral-950 hover:bg-neutral-50">
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
