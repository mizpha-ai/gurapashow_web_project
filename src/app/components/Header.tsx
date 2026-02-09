import Link from "next/link";
import Nav from "./Nav";
import AuthActions from "./AuthActions";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/70 backdrop-blur">
      <div className="mx-auto w-full px-6">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="shrink-0 text-base font-black tracking-[-0.02em] text-white"
          >
            <span className="tracking-[0.22em]">GURAPA LAB</span>
          </Link>

          <div className="hidden md:block">
            <Nav />
          </div>

          <div className="shrink-0">
            <AuthActions />
          </div>
        </div>

        <div className="pb-4 md:hidden">
          <Nav />
        </div>
      </div>
    </header>
  );
}
