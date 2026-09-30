import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ClipboardList, Search, ShoppingBag } from "lucide-react";
import { categories } from "@/data/menu";

const steps = [
  { icon: Search, title: "Encontre", text: "Pesquise pelo nome, descrição ou categoria." },
  { icon: ClipboardList, title: "Personalize", text: "Faça suas escolhas e acompanhe o preço atualizado." },
  { icon: ShoppingBag, title: "Retire", text: "Confirme o pedido e retire no balcão." },
];

const heroImages = [
  { src: "/images/menu/bowl-legumes.webp", alt: "" },
  { src: "/images/menu/frango-grelhado.webp", alt: "" },
  { src: "/images/menu/hamburguer-classico.webp", alt: "" },
  { src: "/images/menu/massa-tomate.webp", alt: "" },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#ff7a00] py-10 sm:py-16">
        <div className="hero-orb hero-orb-top" aria-hidden="true" />
        <div className="hero-orb hero-orb-bottom" aria-hidden="true" />
        <div className="container-page relative grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div className="grid gap-5">
            <div className="flex w-fit items-center gap-3 rounded-full bg-white/85 px-3 py-2 font-semibold shadow-sm">
              <Image src="/brand/bite-logo.png" alt="" width={40} height={40} className="size-9 object-contain" priority />
              <span>Bite · retirada no balcão</span>
            </div>
            <p className="m-0 font-semibold">Comida boa, mais momentos.</p>
            <h1 className="m-0 max-w-3xl text-4xl font-bold leading-[1.12] sm:text-5xl">Seu pedido, do seu jeito, para retirar.</h1>
            <p className="m-0 max-w-2xl text-lg">Escolha seus pratos, personalize e retire no balcão.</p>
            <div className="flex flex-wrap gap-3">
              <Link className="button-primary" href="/cardapio">Abrir cardápio <ArrowRight aria-hidden="true" size={20} /></Link>
              <Link className="button-secondary" href="/pedidos">Ver meus pedidos</Link>
            </div>
          </div>

          <div className="hero-gallery" aria-hidden="true">
            {heroImages.map((image) => (
              <Image
                key={image.src}
                className="aspect-[4/3] h-full w-full object-cover"
                src={image.src}
                alt={image.alt}
                width={600}
                height={450}
                sizes="(min-width: 1024px) 22vw, 45vw"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="container-page page-section" aria-labelledby="how-title">
        <div className="card grid gap-6 p-5 sm:p-7">
          <div>
            <p className="m-0 text-sm font-semibold text-[#8f3800]">Do cardápio à retirada</p>
            <h2 id="how-title" className="m-0 mt-1 text-2xl font-bold">Como funciona</h2>
          </div>
          <ol className="m-0 grid list-none gap-4 p-0 md:grid-cols-3">
            {steps.map(({ icon: Icon, title, text }, index) => (
              <li key={title} className="grid grid-cols-[2.75rem_1fr] gap-3 rounded-xl bg-[#f7f4ee] p-4">
                <span className="grid size-11 place-items-center rounded-xl bg-[#f7e5d7] font-bold" aria-hidden="true"><Icon size={21} /></span>
                <div><h3 className="m-0 text-base font-semibold">{index + 1}. {title}</h3><p className="m-0 text-sm text-[#5f5a57]">{text}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-page pb-10 section-stack sm:pb-14" aria-labelledby="categories-title">
        <div>
          <p className="m-0 text-sm font-semibold text-[#8f3800]">Explore o cardápio</p>
          <h2 id="categories-title" className="m-0 mt-1 text-2xl font-bold">Categorias</h2>
        </div>
        <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
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
