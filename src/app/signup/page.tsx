"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, pw);
      router.push("/");
    } catch (err: any) {
      setErrorMsg(err?.message ?? "회원가입에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-[480px] px-6 py-12">
      <h1 className="text-2xl font-black tracking-[-0.02em] text-neutral-950">
        회원가입
      </h1>
      <p className="mt-2 text-sm font-semibold text-neutral-600">
        이메일과 비밀번호로 간단하게 가입합니다.
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_10px_30px_rgba(17,24,39,0.06)]"
      >
        <label className="block text-sm font-extrabold text-neutral-900">
          이메일
        </label>
        <input
          className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-950 outline-none focus:ring-2 focus:ring-neutral-950/10"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />

        <label className="mt-5 block text-sm font-extrabold text-neutral-900">
          비밀번호
        </label>
        <input
          className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-950 outline-none focus:ring-2 focus:ring-neutral-950/10"
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="6자 이상"
          required
          minLength={6}
        />

        {errorMsg && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {errorMsg}
          </div>
        )}

        <button
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-neutral-950 px-4 py-3 text-sm font-extrabold text-white hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "가입 중..." : "회원가입"}
        </button>

        <div className="mt-5 text-center text-sm font-semibold text-neutral-600">
          이미 계정이 있나요?{" "}
          <Link href="/login" className="font-black text-neutral-950">
            로그인
          </Link>
        </div>
      </form>
    </div>
  );
}
