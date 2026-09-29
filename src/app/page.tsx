import Link from "next/link";
import { ArrowRight, ClipboardList, Search, ShoppingBag } from "lucide-react";
import { categories } from "@/data/menu";

const steps = [
  { icon: Search, title: "Encontre", text: "Pesquise e filtre o cardápio por categoria." },
  { icon: ClipboardList, title: "Personalize", text: "Faça suas escolhas e acompanhe o preço atualizado." },
  { icon: ShoppingBag, title: "Retire", text: "Confirme o pedido simulado para retirada no balcão." },
];

export default function HomePage() {
  return (
    <>
      <section className="bg-[#ff7a00] py-12 sm:py-16">
        <div className="container-page grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-5">
            <p className="m-0 font-semibold">Comida boa, mais momentos.</p>
            <h1 className="m-0 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">Seu pedido, do seu jeito, para retirar.</h1>
            <p className="m-0 max-w-2xl text-lg">Consulte o cardápio, escolha as personalizações e conclua uma simulação de pedido de forma simples.</p>
            <div className="flex flex-wrap gap-3">
              <Link className="button-primary" href="/cardapio">Abrir cardápio <ArrowRight aria-hidden="true" size={20} /></Link>
              <Link className="button-secondary" href="/pedidos">Ver meus pedidos</Link>
            </div>
          </div>
          <div className="card grid gap-4 p-6" aria-labelledby="how-title">
            <h2 id="how-title" className="m-0 text-2xl font-bold">Como funciona</h2>
            <ol className="m-0 grid list-none gap-4 p-0">
              {steps.map(({ icon: Icon, title, text }, index) => (
                <li key={title} className="grid grid-cols-[2.75rem_1fr] gap-3">
                  <span className="grid size-11 place-items-center rounded-xl bg-[#f7e5d7] font-bold" aria-hidden="true"><Icon size={21} /></span>
                  <div><h3 className="m-0 text-base font-semibold">{index + 1}. {title}</h3><p className="m-0 text-sm text-[#5f5a57]">{text}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="container-page page-section section-stack" aria-labelledby="categories-title">
        <div>
          <h2 id="categories-title" className="m-0 text-2xl font-bold">Categorias do cardápio</h2>
          <p className="m-0 mt-1 text-[#5f5a57]">Todas as categorias são apresentadas com o mesmo destaque.</p>
        </div>
        <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <li key={category.id} className="card flex min-h-44 flex-col gap-3 p-5">
              <h3 className="m-0 text-xl font-semibold">{category.name}</h3>
              <p className="m-0 flex-1 text-sm text-[#5f5a57]">{category.description}</p>
              <Link className="button-secondary" href={`/cardapio?categoria=${category.slug}`}>Ver categoria</Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
