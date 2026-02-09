// app/admin/home/AdminHomeClient.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ensureHomeConfig,
  getHomeConfig,
  saveDraft,
  publishDraft,
  type HomeConfig,
} from "@/lib/homeConfig";

export default function AdminHomeClient() {
  const sp = useSearchParams();
  const key = sp.get("key") ?? "";
  const secret = process.env.NEXT_PUBLIC_ADMIN_SECRET ?? "";

  const authed = useMemo(() => {
    if (!secret) return true; // secret 미설정이면 그냥 열어둠(미팅용)
    return key === secret;
  }, [key, secret]);

  const [draft, setDraft] = useState<HomeConfig | null>(null);
  const [text, setText] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!authed) return;

    (async () => {
      try {
        setErr(null);
        setMsg(null);
        await ensureHomeConfig();
        const d = await getHomeConfig("draft");
        if (!d) throw new Error("Draft not found (ensureHomeConfig failed?)");
        setDraft(d);
        setText(JSON.stringify(d, null, 2));
      } catch (e: any) {
        console.error(e);
        setErr(e?.message ?? String(e));
      }
    })();
  }, [authed]);

  if (!authed) {
    return (
      <div className="mx-auto max-w-[1120px] px-6 py-10">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_10px_30px_rgba(17,24,39,0.06)]">
          <div className="text-base font-black text-neutral-950">접근 불가</div>
          <p className="mt-2 text-sm font-semibold text-neutral-600">
            URL에 <span className="font-black">?key=...</span> 를 붙여 접근하세요.
          </p>
          <p className="mt-3 text-xs font-semibold text-neutral-500">
            * NEXT_PUBLIC_ADMIN_SECRET가 설정된 경우에만 잠금이 동작합니다.
          </p>
        </div>
      </div>
    );
  }

  const parseJson = () => {
    setMsg(null);
    setErr(null);
    try {
      const obj = JSON.parse(text) as HomeConfig;
      return obj;
    } catch (e: any) {
      setErr(`JSON 파싱 실패: ${e?.message ?? String(e)}`);
      return null;
    }
  };

  const onSaveDraft = async () => {
    const obj = parseJson();
    if (!obj) return;

    setBusy(true);
    try {
      await saveDraft(obj);
      setDraft(obj);
      setMsg("✅ Draft 저장 완료");
    } catch (e: any) {
      console.error(e);
      setErr(e?.message ?? String(e));
    } finally {
      setBusy(false);
    }
  };

  const onPublish = async () => {
    setBusy(true);
    setMsg(null);
    setErr(null);

    try {
      const obj = parseJson();
      if (!obj) return;

      await saveDraft(obj);
      await publishDraft();
      setMsg("✅ Publish 완료 (홈에 즉시 반영)");
    } catch (e: any) {
      console.error(e);
      setErr(e?.message ?? String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1120px] px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="inline-flex w-fit rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-extrabold tracking-[0.14em] text-neutral-900">
            ADMIN
          </span>
          <h1 className="mt-3 text-2xl font-black tracking-[-0.02em] text-neutral-950">
            홈 구성 편집 (Draft / Publish)
          </h1>
          <p className="mt-2 text-sm font-semibold text-neutral-600">
            홈의 섹션/문구/브랜드/공구 하이라이트를 JSON으로 편집합니다.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href="/?preview=draft"
            className="rounded-full border border-neutral-200 bg-white px-5 py-3 text-sm font-extrabold text-neutral-950 hover:bg-neutral-50"
          >
            Draft 미리보기
          </Link>
          <Link
            href="/"
            className="rounded-full border border-neutral-200 bg-white px-5 py-3 text-sm font-extrabold text-neutral-950 hover:bg-neutral-50"
          >
            Published 홈 보기
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_10px_30px_rgba(17,24,39,0.06)]">
            <div className="border-b border-neutral-200 bg-neutral-50 px-5 py-4">
              <div className="text-xs font-extrabold tracking-[0.14em] text-neutral-500">
                HOME CONFIG (DRAFT)
              </div>
              <div className="mt-1 text-sm font-black text-neutral-950">
                sections 배열 순서 = 홈 노출 순서
              </div>
            </div>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[560px] w-full resize-y px-5 py-4 font-mono text-xs leading-5 outline-none"
              spellCheck={false}
            />
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
            <div className="text-xs font-extrabold tracking-[0.14em] text-neutral-500">
              ACTIONS
            </div>

            <div className="mt-3 grid gap-2">
              <button
                onClick={onSaveDraft}
                disabled={busy}
                className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-extrabold text-neutral-950 hover:bg-neutral-50 disabled:opacity-50"
              >
                Draft 저장
              </button>
              <button
                onClick={onPublish}
                disabled={busy}
                className="rounded-xl bg-neutral-950 px-4 py-3 text-sm font-extrabold text-white hover:opacity-90 disabled:opacity-50"
              >
                Publish (홈 반영)
              </button>
            </div>

            {msg ? (
              <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
                {msg}
              </div>
            ) : null}

            {err ? (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {err}
              </div>
            ) : null}

            <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-5">
              <div className="text-xs font-extrabold tracking-[0.14em] text-neutral-500">
                TIP
              </div>
              <ul className="mt-2 space-y-2 text-sm font-semibold leading-6 text-neutral-700">
                <li>• section.enabled 로 섹션 ON/OFF</li>
                <li>• sections 배열 순서로 홈 레이아웃 변경</li>
                <li>• hero / featured_brands / groupbuy_highlights 전부 여기서 교체</li>
              </ul>
            </div>

            <div className="mt-4 text-xs font-semibold text-neutral-500">
              * 미팅용: 폼 UI(드래그 정렬/항목 추가)는 다음 단계에서 붙이면 됩니다.
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 h-px bg-neutral-200" />
    </div>
  );
}
