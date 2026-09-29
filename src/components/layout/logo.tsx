import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="inline-flex min-h-11 items-center gap-2 rounded-lg no-underline" aria-label="Bite — página inicial">
      <span className="grid size-10 place-items-center rounded-xl bg-[#ff7a00] text-xl font-bold text-[#2e1f17]" aria-hidden="true">b</span>
      <span className="hidden text-2xl font-bold tracking-[-0.04em] sm:inline">Bite<span className="text-[#c95000]">.</span></span>
    </Link>
  );
}
