import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-10 border-t border-[#ded6d0] bg-[#2e1f17] py-8 text-white">
      <div className="container-page grid gap-3 text-sm sm:grid-cols-2 sm:items-center">
        <div className="grid gap-2">
          <p className="m-0 font-semibold">Bite — Comida boa, mais momentos.</p>
          <Link className="w-fit rounded underline underline-offset-4" href="/academico/refinamento">Ver refinamento acadêmico de UX</Link>
        </div>
        <p className="m-0 sm:text-right">Protótipo acadêmico — nenhum pedido ou pagamento real será realizado.</p>
      </div>
    </footer>
  );
}
