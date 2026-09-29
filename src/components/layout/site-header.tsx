"use client";

import Link from "next/link";
import { Home, Menu, ReceiptText, ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/layout/logo";
import { useCartStore } from "@/store/cart-store";
import { useHydrated } from "@/hooks/use-hydrated";

const links = [
  { href: "/", label: "Início", icon: Home, exact: true },
  { href: "/cardapio", label: "Cardápio", icon: Menu },
  { href: "/pedidos", label: "Pedidos", icon: ReceiptText },
  { href: "/carrinho", label: "Carrinho", icon: ShoppingCart },
];

export function SiteHeader() {
  const pathname = usePathname();
  const hydrated = useHydrated();
  const itemCount = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));

  return (
    <header className="sticky top-0 z-40 border-b border-[#ded6d0] bg-white/95 backdrop-blur">
      <div className="container-page flex min-h-20 items-center justify-between gap-2">
        <Logo />
        <nav aria-label="Navegação principal">
          <ul className="flex list-none items-center gap-0 p-0 sm:gap-2">
            {links.map(({ href, label, icon: Icon, exact }) => {
              const active = exact
                ? pathname === href
                : pathname.startsWith(href)
                  || (href === "/cardapio" && pathname.startsWith("/produto"))
                  || (href === "/pedidos" && pathname.startsWith("/pedido/"));
              const count = href === "/carrinho" && hydrated ? itemCount : 0;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`relative flex min-h-12 min-w-12 flex-col items-center justify-center rounded-xl px-1 text-xs font-semibold no-underline sm:min-w-20 sm:flex-row sm:gap-2 sm:px-2 sm:text-sm ${active ? "bg-[#f7e5d7] underline decoration-2 underline-offset-4" : "hover:bg-[#f7f4ee]"}`}
                  >
                    <Icon aria-hidden="true" size={20} />
                    <span>{label}</span>
                    {count > 0 && (
                      <span className="absolute -right-1 -top-1 grid min-h-6 min-w-6 place-items-center rounded-full bg-[#c95000] px-1 text-xs text-white" aria-label={`${count} ${count === 1 ? "item" : "itens"} no carrinho`}>
                        {count}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
