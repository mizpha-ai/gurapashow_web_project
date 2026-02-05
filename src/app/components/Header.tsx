import Link from "next/link";
import Nav from "./Nav";
import AuthActions from "./AuthActions";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur">
      {/* 한 줄 구성: 로고(좌) / 네비(중) / 액션(우) */}
      <div className="mx-auto max-w-[1120px] px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <Link
            href="/"
            className="shrink-0 text-base font-black tracking-[-0.02em] text-neutral-950"
          >
            <span className="tracking-[0.22em]">GURAPA LAB</span>
          </Link>

          {/* Center: Nav */}
          <div className="hidden md:block">
            <Nav />
          </div>

          {/* Right: Auth actions */}
          <div className="shrink-0">
            <AuthActions />
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="pb-4 md:hidden">
          <Nav />
        </div>
      </div>
    </header>
  );
}
