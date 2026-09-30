import type { Metadata } from "next";
import "./globals.css";
import { MobileCartSummary } from "@/components/cart/mobile-cart-summary";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export const metadata: Metadata = {
  title: { default: "Bite", template: "%s | Bite" },
  description: "Escolha seus pratos, personalize e retire no balcão com o Bite.",
  icons: {
    icon: "/brand/bite-logo.png",
    apple: "/brand/bite-logo.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#conteudo-principal">Pular para o conteúdo principal</a>
        <SiteHeader />
        <main id="conteudo-principal" className="pb-20 sm:pb-0">{children}</main>
        <SiteFooter />
        <MobileCartSummary />
      </body>
    </html>
  );
}
