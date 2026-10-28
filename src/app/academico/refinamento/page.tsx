import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ExternalLink, ShieldCheck } from "lucide-react";
import { PageHeading } from "@/components/ui/page-heading";
import { amazonRefinements, biasCardRefinements, facebookRefinements, type AcademicRefinement } from "@/data/academic-refinements";

export const metadata: Metadata = {
  title: "Refinamento acadêmico de UX",
  description: "Demonstração separada das decisões responsáveis de design comportamental aplicadas ao Bite.",
};

const statusStyles = {
  Sim: "border-[#2e7d32] bg-[#edf7ed] text-[#236027]",
  Parcial: "border-[#8f3800] bg-[#fff4e8] text-[#713000]",
  Não: "border-[#81756e] bg-[#f7f4ee] text-[#2e1f17]",
  "Pendente de fonte": "border-[#b22431] bg-[#fff0f1] text-[#9d1522]",
} as const;

function RefinementList({ items }: { items: AcademicRefinement[] }) {
  return (
    <ul className="m-0 grid list-none gap-3 p-0 md:grid-cols-2">
      {items.map((item) => (
        <li key={item.id} className="card grid gap-3 p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="m-0 text-lg font-semibold">{item.id} · {item.title}</h3>
            <span className={`rounded-full border px-3 py-1 text-sm font-semibold ${statusStyles[item.status]}`}>{item.status}</span>
          </div>
          <p className="m-0 text-sm text-[#5f5a57]">{item.decision}</p>
        </li>
      ))}
    </ul>
  );
}

export default function AcademicRefinementPage() {
  return (
    <div className="container-page page-section section-stack">
      <Link className="inline-flex min-h-11 w-fit items-center gap-1 rounded-lg font-semibold" href="/">
        <ArrowLeft aria-hidden="true" size={20} />Voltar ao Bite
      </Link>
      <PageHeading
        eyebrow="Material acadêmico"
        title="Refinamento responsável de UX"
        description="Demonstração separada do fluxo de compra. Os status indicam o que foi aplicado, aplicado parcialmente, rejeitado por limite ético ou ainda depende da fonte original."
      />

      <aside className="card flex items-start gap-3 border-l-4 border-l-[#2e7d32] p-5" aria-labelledby="baseline-title">
        <ShieldCheck aria-hidden="true" className="mt-0.5 shrink-0 text-[#2e7d32]" size={24} />
        <div>
          <h2 id="baseline-title" className="m-0 text-xl font-semibold">Baseline preservada</h2>
          <p className="m-0 mt-1">O pedido continua neutro: não há recomendação, popularidade, urgência, escassez, opção paga pré-selecionada, assinatura ou rastreamento comportamental.</p>
        </div>
      </aside>

      <section className="section-stack" aria-labelledby="cards-title">
        <div><p className="m-0 text-sm font-semibold text-[#8f3800]">16 cartas analisadas</p><h2 id="cards-title" className="m-0 text-2xl font-bold">Baralho de vieses</h2></div>
        <RefinementList items={biasCardRefinements} />
      </section>

      <section className="section-stack" aria-labelledby="amazon-title">
        <div>
          <p className="m-0 text-sm font-semibold text-[#8f3800]">Fonte original verificada</p>
          <h2 id="amazon-title" className="m-0 text-2xl font-bold">Growth.Design · Amazon Purchase UX</h2>
          <a className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-lg font-semibold underline" href="https://growth.design/case-studies/amazon-purchase-ux" target="_blank" rel="noreferrer">Abrir estudo original <ExternalLink aria-hidden="true" size={18} /></a>
        </div>
        <RefinementList items={amazonRefinements} />
      </section>

      <section className="section-stack" aria-labelledby="facebook-title">
        <div>
          <p className="m-0 text-sm font-semibold text-[#8f3800]">Acesso limitado pela fonte</p>
          <h2 id="facebook-title" className="m-0 text-2xl font-bold">Growth.Design · Facebook Misinformation</h2>
          <p className="m-0 mt-2 max-w-3xl">A página original exibiu apenas o cadastro e a imagem de preview. O Bite não atribui insights individuais ao caso até que os slides sejam fornecidos.</p>
          <a className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-lg font-semibold underline" href="https://growth.design/case-studies/facebook-misinformation" target="_blank" rel="noreferrer">Abrir página original <ExternalLink aria-hidden="true" size={18} /></a>
        </div>
        <RefinementList items={facebookRefinements} />
      </section>
    </div>
  );
}

