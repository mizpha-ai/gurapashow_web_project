import Link from "next/link";
import Nav from "./Nav";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/90 backdrop-blur">
      <div className="mx-auto grid h-16 max-w-[1120px] grid-cols-[auto_1fr_auto] items-center gap-4 px-6">
        {/* Logo */}
        <Link href="/" className="text-[18px] font-black tracking-[-0.02em] text-neutral-950">
          GURAPA LAB
        </Link>

        {/* Nav */}
        <div className="hidden justify-center md:flex">
          <Nav />
        </div>

        {/* Auth */}
        <div className="flex items-center justify-end gap-2">
          <Link
            href="/login"
            className="rounded-full px-3 py-2 text-sm font-extrabold text-neutral-900 hover:bg-neutral-100"
          >
            로그인
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-neutral-950 px-3 py-2 text-sm font-extrabold text-white hover:opacity-90"
          >
            회원가입
          </Link>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="border-t border-neutral-200 bg-white md:hidden">
        <div className="mx-auto max-w-[1120px] px-3 py-2">
          <Nav />
        </div>
      </div>
    </header>
  );
}
