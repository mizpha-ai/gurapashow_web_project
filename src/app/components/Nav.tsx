"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MENUS = [
  { href: "/", label: "Home" },
  { href: "/group-buy", label: "공동구매" },
  { href: "/brands", label: "입점브랜드" },
  { href: "/about", label: "소개" },
  { href: "/support", label: "고객센터" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
      {MENUS.map((m) => {
        const active = pathname === m.href;

        return (
          <Link
            key={m.href}
            href={m.href}
            className={[
              "rounded-full px-5 py-2.5 text-sm font-extrabold tracking-[-0.01em] transition",
              active
                ? "bg-neutral-950 text-white"
                : "text-neutral-900 hover:bg-neutral-100",
            ].join(" ")}
          >
            {m.label}
          </Link>
        );
      })}
    </nav>
  );
}
