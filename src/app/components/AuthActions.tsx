"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebase";

export default function AuthActions() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setReady(true);
    });
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
    router.refresh();
  };

  if (!ready) {
    return (
      <div className="flex items-center gap-1.5">
        <div className="h-8 w-16 rounded-full bg-neutral-100" />
        <div className="h-8 w-16 rounded-full bg-neutral-100" />
      </div>
    );
  }

  // ✅ 로그인 상태: (컴팩트) 마이페이지 / 장바구니 / 로그아웃
  if (user) {
    return (
      <div className="flex items-center gap-1.5">
        <Link
          href="/mypage"
          className="rounded-full border border-neutral-200 bg-white px-3 py-2 text-xs font-extrabold text-neutral-950 hover:bg-neutral-50"
        >
          마이페이지
        </Link>

        <Link
          href="/cart"
          className="rounded-full border border-neutral-200 bg-white px-3 py-2 text-xs font-extrabold text-neutral-950 hover:bg-neutral-50"
        >
          장바구니
        </Link>

        <button
          onClick={handleLogout}
          className="rounded-full bg-neutral-950 px-3 py-2 text-xs font-extrabold text-white hover:opacity-90"
        >
          로그아웃
        </button>
      </div>
    );
  }

  // ✅ 로그아웃 상태: (컴팩트) 로그인 / 회원가입
  return (
    <div className="flex items-center gap-1.5">
      <Link
        href="/login"
        className="rounded-full border border-neutral-200 bg-white px-3 py-2 text-xs font-extrabold text-neutral-950 hover:bg-neutral-50"
      >
        로그인
      </Link>

      <Link
        href="/signup"
        className="rounded-full bg-neutral-950 px-3 py-2 text-xs font-extrabold text-white hover:opacity-90"
      >
        회원가입
      </Link>
    </div>
  );
}
