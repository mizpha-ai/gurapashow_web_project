"use client";

import { useMemo, useState } from "react";
import BrandCard, { Brand } from "@/app/components/BrandCard";
import BrandFilters from "@/app/components/BrandFilters";

const MOOD_FILTERS = [
  { id: "all", label: "전체" },
  { id: "하객룩", label: "하객룩" },
  { id: "오피스", label: "오피스" },
  { id: "캐주얼", label: "캐주얼" },
  { id: "모던", label: "모던" },
  { id: "이브닝", label: "이브닝" },
  { id: "미니멀", label: "미니멀" },
  { id: "아우터", label: "아우터" },
  { id: "액세서리", label: "액세서리" },
];

const BRANDS: Brand[] = [
  {
    id: "aurora",
    name: "AURORA ATELIER",
    tagline: "정제된 실루엣과 절제된 디테일로 완성되는 모던 테일러링.",
    concept:
      "군더더기 없는 라인과 고급 소재의 질감을 중심으로, 오래 입을수록 가치가 드러나는 ‘quiet luxury’를 지향합니다.",
    mood: ["모던", "미니멀", "오피스"],
    price: "KRW 190,000 ~ 420,000",
  },
  {
    id: "noir",
    name: "NOIR STUDIO",
    tagline: "모노톤 기반의 데일리웨어를 ‘귀티’ 있게 재해석.",
    concept:
      "검정·백색의 대비를 활용해 단정하지만 강한 인상을 남기는 룩을 제안합니다. 소재와 핏으로 완성도를 끌어올립니다.",
    mood: ["미니멀", "모던", "캐주얼"],
    price: "KRW 160,000 ~ 350,000",
  },
  {
    id: "lumen",
    name: "LUMEN ARCHIVE",
    tagline: "클래식의 균형감에 트렌드의 텍스처를 더한 아카이브 무드.",
    concept:
      "기본에 충실한 패턴과 소재를 바탕으로, 시즌마다 한 끗 차이의 포인트로 룩의 방향을 잡아줍니다.",
    mood: ["모던", "아우터", "오피스"],
    price: "KRW 220,000 ~ 520,000",
  },
  {
    id: "sable",
    name: "SABLE HOUSE",
    tagline: "피부에 닿는 촉감까지 계산한 프리미엄 니트 & 레이어링.",
    concept:
      "차분한 컬러 팔레트와 고급 원사의 밀도를 통해, ‘조용하지만 확실한’ 존재감을 선호하는 고객층을 타겟으로 합니다.",
    mood: ["미니멀", "모던", "캐주얼"],
    price: "KRW 180,000 ~ 460,000",
  },
  {
    id: "velvet",
    name: "VELVET LINE",
    tagline: "하객룩과 이브닝을 위한 단정한 광택감, 고급스러운 균형.",
    concept:
      "과장 없이 우아한 핏을 중심으로, 원단의 결을 살려 ‘사진에 잘 나오는’ 실루엣을 구현합니다.",
    mood: ["하객룩", "이브닝", "모던"],
    price: "KRW 210,000 ~ 590,000",
  },
  {
    id: "rare",
    name: "RARE OBJECTS",
    tagline: "룩의 완성도를 높이는 미니멀 액세서리 셀렉션.",
    concept:
      "메탈, 레더, 텍스처를 절제감 있게 활용해 전체 스타일의 톤을 흔들지 않으면서 포인트를 제공합니다.",
    mood: ["모던", "미니멀", "액세서리"],
    price: "KRW 90,000 ~ 260,000",
  },
];

export default function BrandsPage() {
  const [activeMood, setActiveMood] = useState("all");

  const filtered = useMemo(() => {
    if (activeMood === "all") return BRANDS;
    return BRANDS.filter((b) => b.mood.includes(activeMood));
  }, [activeMood]);

  return (
    <div className="mx-auto max-w-[1120px] px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <span className="inline-flex w-fit rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-extrabold tracking-[0.14em] text-neutral-900">
          BRANDS
        </span>
        <h1 className="mt-3 text-2xl font-black tracking-[-0.02em] text-neutral-950 md:text-3xl">
          입점브랜드
        </h1>
        <p className="mt-2 max-w-[70ch] text-sm font-semibold leading-6 text-neutral-600">
          여기에 브랜드 소개를 해주세요. 각 브랜드의 컨셉과 무드, 타겟 고객을
          프리미엄 톤으로 정리해 한눈에 볼 수 있도록 구성했습니다. (미팅용 시연)
        </p>
      </div>

      {/* Filter (GUIDE 제거) */}
      <div className="mb-6">
        <BrandFilters
          filters={MOOD_FILTERS}
          active={activeMood}
          onChange={setActiveMood}
        />
      </div>

      {/* List */}
      <div>
        <div className="mb-4 flex items-end justify-between">
          <div className="text-sm font-extrabold text-neutral-950">
            브랜드 {filtered.length}개
          </div>
          <div className="text-xs font-semibold text-neutral-500">* 임시 데이터</div>
        </div>

        {/* ✅ items-stretch로 카드 높이 통일 */}
        <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((b) => (
            <BrandCard key={b.id} brand={b} />
          ))}
        </div>
      </div>
    </div>
  );
}
