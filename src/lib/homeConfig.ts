import "client-only";

import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export type CTA = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

export type Media = {
  kind: "image";
  src: string;
  alt?: string;
};

export type SectionBase = {
  id: string;
  type:
    | "hero"
    | "gallery"
    | "about"
    | "featured_brands"
    | "groupbuy_highlights";
  enabled: boolean;
};

export type HeroSection = SectionBase & {
  type: "hero";
  data: {
    kicker?: string;
    title: string;
    subtitle?: string;
    ctas?: CTA[];
    media?: Media;
    layout?: "split" | "full";
  };
};

export type GallerySection = SectionBase & {
  type: "gallery";
  data: {
    title?: string;
    subtitle?: string;
    items: Array<{
      src: string;
      alt?: string;
      caption?: string;
      href?: string;
    }>;
  };
};

export type AboutSection = SectionBase & {
  type: "about";
  data: {
    kicker?: string;
    title: string;
    body: string; // \n 가능
    cards?: Array<{ title: string; desc: string }>;
  };
};

export type FeaturedBrandsSection = SectionBase & {
  type: "featured_brands";
  data: {
    title: string;
    subtitle?: string;
    layout?: "grid" | "editorial";
    items: Array<{
      name: string;
      tagline?: string;
      href?: string;
    }>;
  };
};

export type GroupBuyHighlightsSection = SectionBase & {
  type: "groupbuy_highlights";
  data: {
    title: string;
    subtitle?: string;
    items: Array<{
      line?: string;
      name: string;
      desc?: string;
      goalQty: number;
      joined: number;
      deadlineISO: string;
      groupPrice: number;
      originalPrice?: number;
    }>;
  };
};

export type HomeSection =
  | HeroSection
  | GallerySection
  | AboutSection
  | FeaturedBrandsSection
  | GroupBuyHighlightsSection;

export type HomeConfig = {
  version: number;
  updatedAt?: any;
  sections: HomeSection[];
  seo?: { title?: string; description?: string; ogImage?: string };
};

const SITE_DOC = (stage: "draft" | "published") =>
  doc(db, "site", "home", stage, "config");

export function defaultHomeConfig(): HomeConfig {
  const now = Date.now();
  return {
    version: 2,
    sections: [
      // ✅ 어두운 프리미엄 히어로 (소개 페이지 톤을 홈으로 끌고옴)
      {
        id: "hero-1",
        type: "hero",
        enabled: true,
        data: {
          kicker: "BRAND GALLERY",
          title: "광고가 아니라 ‘브랜드의 장면’을 전시하는 홈",
          subtitle:
            "상품 나열보다 먼저, 브랜드가 가진 결·톤·철학을 큰 화면으로 보여주는 구조.",
          layout: "full",
          media: { kind: "image", src: "/img1.jpg", alt: "Hero" },
          ctas: [
            { label: "입점브랜드", href: "/brands", variant: "primary" },
            { label: "공동구매 보기", href: "/group-buy", variant: "secondary" },
          ],
        },
      },

      // ✅ slick 슬라이드 갤러리 (홈의 ‘특이한 구조’ 핵심)
      {
        id: "gallery-1",
        type: "gallery",
        enabled: true,
        data: {
          title: "Seasonal Scenes",
          subtitle: "브랜드 무드를 먼저 보여주는 슬라이드",
          items: [
            {
              src: "/img1.jpg",
              alt: "Scene 01",
              caption: "Monochrome balance · tailored silhouette",
              href: "/brands",
            },
            {
              src: "/img2.jpg",
              alt: "Scene 02",
              caption: "Texture & light · premium materials",
              href: "/brands",
            },
            {
              src: "/img3.jpg",
              alt: "Scene 03",
              caption: "Minimal details · high-end finishing",
              href: "/brands",
            },
          ],
        },
      },

      // ✅ 소개 페이지를 홈으로 흡수 (카드 + 스토리)
      {
        id: "about-1",
        type: "about",
        enabled: true,
        data: {
          kicker: "ABOUT",
          title: "GURAPA LAB은 ‘브랜드 스토리’ 중심의 커머스를 만듭니다.",
          body:
            "홈은 광고판이 아니라 전시관에 가깝습니다.\n" +
            "드롭(공동구매) 단위로 큐레이션을 구성하고,\n" +
            "시즌 무드에 맞춰 브랜드 순서/문구/이미지를 빠르게 교체할 수 있어야 합니다.",
          cards: [
            {
              title: "Curation",
              desc: "상품 나열 대신, 무드/결/톤을 먼저 제안합니다.",
            },
            {
              title: "Drop System",
              desc: "드롭 단위로 집중·한정·리듬을 만듭니다.",
            },
            {
              title: "Editorial UI",
              desc: "프리미엄 콘텐츠처럼 ‘읽히는’ 구조를 설계합니다.",
            },
          ],
        },
      },

      // ✅ 브랜드 섹션(기존 홈/소개 톤과 조화)
      {
        id: "brands-1",
        type: "featured_brands",
        enabled: true,
        data: {
          title: "Featured Brands",
          subtitle: "이번 시즌 무드에 맞춘 추천 브랜드",
          layout: "editorial",
          items: [
            { name: "AURORA ATELIER", tagline: "Modern tailoring", href: "/brands#aurora" },
            { name: "NOIR STUDIO", tagline: "Monochrome essentials", href: "/brands#noir" },
            { name: "LUMEN ARCHIVE", tagline: "Modern classics", href: "/brands#lumen" },
            { name: "SABLE HOUSE", tagline: "Premium knitwear", href: "/brands#sable" },
            { name: "VELVET LINE", tagline: "Wedding & evening", href: "/brands#velvet" },
            { name: "RARE OBJECTS", tagline: "Accessories", href: "/brands#rare" },
          ],
        },
      },

      // ✅ 공동구매는 “홈에 크게 내세우지 않고” 하이라이트만 아래쪽에
      {
        id: "gb-1",
        type: "groupbuy_highlights",
        enabled: true,
        data: {
          title: "Drop / 공동구매 하이라이트",
          subtitle: "진행 상태 · 목표 수량 · 마감 기준으로 확인",
          items: [
            {
              line: "Signature Line",
              name: "울 블렌드 트렌치 코트",
              desc: "정제된 실루엣, 과장 없는 볼륨.",
              goalQty: 120,
              joined: 54,
              deadlineISO: new Date(now + 40 * 60 * 60 * 1000).toISOString(),
              groupPrice: 279000,
              originalPrice: 349000,
            },
            {
              line: "Essential",
              name: "코튼 티셔츠 3팩",
              desc: "기본의 완성도를 끌어올리는 소재감.",
              goalQty: 300,
              joined: 268,
              deadlineISO: new Date(now + 7 * 60 * 60 * 1000).toISOString(),
              groupPrice: 159000,
              originalPrice: 199000,
            },
            {
              line: "Denim",
              name: "테일러드 와이드 데님",
              desc: "핏으로 완성되는 데일리 클래식.",
              goalQty: 180,
              joined: 77,
              deadlineISO: new Date(now + 3 * 24 * 60 * 60 * 1000).toISOString(),
              groupPrice: 189000,
              originalPrice: 239000,
            },
          ],
        },
      },
    ],
    seo: {
      title: "GURAPA LAB",
      description: "프리미엄 브랜드 스토리 & 공동구매 기반 커머스",
    },
  };
}

export async function getHomeConfig(stage: "draft" | "published") {
  const snap = await getDoc(SITE_DOC(stage));
  if (!snap.exists()) return null;
  return snap.data() as HomeConfig;
}

export async function ensureHomeConfig() {
  const [draft, pub] = await Promise.all([
    getDoc(SITE_DOC("draft")),
    getDoc(SITE_DOC("published")),
  ]);

  const base = defaultHomeConfig();

  if (!draft.exists()) {
    await setDoc(SITE_DOC("draft"), { ...base, updatedAt: serverTimestamp() });
  }
  if (!pub.exists()) {
    await setDoc(SITE_DOC("published"), { ...base, updatedAt: serverTimestamp() });
  }
}

export async function saveDraft(next: HomeConfig) {
  await setDoc(
    SITE_DOC("draft"),
    { ...next, updatedAt: serverTimestamp() },
    { merge: true }
  );
}

export async function publishDraft() {
  const draft = await getDoc(SITE_DOC("draft"));
  if (!draft.exists()) throw new Error("Draft not found");
  await setDoc(SITE_DOC("published"), {
    ...(draft.data() as HomeConfig),
    updatedAt: serverTimestamp(),
  });
}
