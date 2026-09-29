import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-page page-section">
      <section className="card grid justify-items-center gap-4 p-8 text-center">
        <SearchX aria-hidden="true" size={48} />
        <h1 className="m-0 text-3xl font-bold">Página não encontrada</h1>
        <p className="m-0 text-[#5f5a57]">O conteúdo solicitado não existe ou não está disponível.</p>
        <Link className="button-primary" href="/cardapio">Ir para o cardápio</Link>
      </section>
    </div>
  );
}
