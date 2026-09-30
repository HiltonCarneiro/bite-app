import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="inline-flex min-h-11 items-center gap-2 rounded-xl no-underline" aria-label="Bite — página inicial">
      <Image src="/brand/bite-logo.png" alt="" width={48} height={48} className="size-11 object-contain sm:size-12" priority />
      <span className="hidden text-2xl font-bold tracking-[-0.04em] lg:inline">Bite</span>
    </Link>
  );
}
