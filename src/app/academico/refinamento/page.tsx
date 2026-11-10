import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, FlaskConical, ShieldCheck } from "lucide-react";
import { EvidenceComparison } from "@/components/academic/evidence-comparison";
import { evidenceScenes, unappliedRefinements, uxCaseStudies } from "@/data/ux-case-studies";

export const metadata: Metadata = {
  title: "Refinamento acadêmico de UX",
  description: "Antes e depois do Bite: 17 estudos de decisões de UX, evidências históricas e hipóteses de avaliação, com a baseline neutra preservada.",
};

const journey = [
  { number: "01", title: "Explorar", text: "Marca, categorias e reconhecimento", href: "/cardapio", ids: "B03 · B08" },
  { number: "02", title: "Personalizar", text: "Composição, escolhas e custo", href: "/produto/frango-grelhado", ids: "B01 · B06 · B09 · B10 · B15 · A02 · A04" },
  { number: "03", title: "Revisar", text: "Editar, remover e recuperar", href: "/carrinho", ids: "B05 · B13 · B16 · A09" },
  { number: "04", title: "Confirmar", text: "Retirada, consentimento e condições", href: "/checkout", ids: "B12 · A01 · A03 · A07" },
];

export default function AcademicRefinementPage() {
  return (
    <div className="container-page page-section ux-study">
      <Link className="inline-flex min-h-11 w-fit items-center gap-1 rounded-lg font-semibold" href="/cardapio"><ArrowLeft aria-hidden="true" size={20} />Voltar ao cardápio</Link>
      <header className="ux-hero">
        <div className="grid gap-4">
          <p className="m-0 flex items-center gap-2 text-sm font-semibold"><BookOpen aria-hidden="true" size={20} />Interface com o Usuário · 2026.2</p>
          <h1 className="m-0 max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">Refinamento responsável de UX</h1>
          <p className="m-0 max-w-2xl text-lg">As escolhas de design do Bite, vistas de perto. Compare a interface, entenda cada decisão e conheça os limites das evidências.</p>
          <a className="button-primary w-fit" href="#estudos">Explorar os estudos <ArrowRight aria-hidden="true" size={20} /></a>
        </div>
        <dl className="ux-stats">
          <div><dt>casos documentados</dt><dd>{uxCaseStudies.length}</dd></div>
          <div><dt>cartas analisadas</dt><dd>16</dd></div>
          <div><dt>nudges alimentares ativos</dt><dd>0</dd></div>
          <div><dt>resultados medidos com usuários</dt><dd>0</dd></div>
        </dl>
      </header>
      <aside className="card flex items-start gap-3 border-l-4 border-l-[#2e7d32] p-5" aria-labelledby="baseline-title">
        <ShieldCheck aria-hidden="true" className="mt-0.5 shrink-0 text-[#2e7d32]" size={24} />
        <div><h2 id="baseline-title" className="m-0 text-xl font-semibold">Uma baseline neutra, com decisões explicadas</h2><p className="m-0 mt-2">O Bite não recomenda pratos, não pré-seleciona alternativas e não usa popularidade ou urgência. Aqui, “implementado” significa uma prática verificável de UX, muitas vezes defensiva. Um viés é uma tendência cognitiva; uma heurística é uma regra prática; acessibilidade é um requisito de uso. Um nudge altera a arquitetura de escolha para influenciar uma decisão. Esses conceitos não são equivalentes.</p></div>
      </aside>
      <section className="section-stack" aria-labelledby="journey-title">
        <div><p className="ux-eyebrow">Da intenção ao pedido</p><h2 id="journey-title" className="ux-section-title">Onde as decisões acontecem</h2></div>
        <ol className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {journey.map((step) => <li key={step.number} className="card flex flex-col gap-3 p-5"><span className="text-3xl font-bold text-[#8f3800]">{step.number}</span><h3 className="m-0 text-xl font-semibold">{step.title}</h3><p className="m-0 text-sm">{step.text}</p><p className="m-0 text-sm text-[#5f5a57]">{step.ids}</p><Link className="mt-auto inline-flex min-h-11 items-center gap-2 rounded-lg font-semibold underline" href={step.href}>Abrir etapa <ArrowRight aria-hidden="true" size={18} /></Link></li>)}
        </ol>
        <p className="m-0 text-sm text-[#5f5a57]">Carrinho e checkout usam seus itens locais. Para experimentar, personalize um produto e adicione ao carrinho; nenhum item será incluído por este material acadêmico.</p>
      </section>
      <section className="section-stack" aria-labelledby="evidence-title">
        <div><p className="ux-eyebrow">Como ler a comparação</p><h2 id="evidence-title" className="ux-section-title">Interface observável, efeito ainda a avaliar</h2></div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="card p-5"><h3 className="m-0 text-lg font-semibold">Antes · versão histórica</h3><p className="mb-0 text-sm">Capturas reais da versão <code>7fc2924</code>, executada em uma worktree isolada. A baseline já continha várias das boas práticas descritas.</p></div>
          <div className="card p-5"><h3 className="m-0 text-lg font-semibold">Depois · implementação atual</h3><p className="mb-0 text-sm">Viewports equivalentes em celular (390 × 844 px) e desktop (1440 × 1000 px), com os mesmos estados de interação. Há 7 pares autênticos compartilhados entre casos da mesma tela, sem reconstruções ilustrativas.</p></div>
          <div className="card p-5"><h3 className="m-0 text-lg font-semibold">Hipótese · sem resultado medido</h3><p className="mb-0 text-sm">O código e as imagens demonstram a interface. As propostas de teste não comprovam redução de vieses nem melhora comportamental.</p></div>
        </div>
        <a className="inline-flex min-h-11 w-fit items-center rounded-lg font-semibold underline" href="/ux-refinement/proveniencia.json">Consultar registro de origem das capturas (JSON)</a>
      </section>
      <nav className="card p-5" aria-labelledby="case-index-title">
        <h2 id="case-index-title" className="m-0 text-xl font-semibold">Índice dos casos implementados</h2>
        <p className="mt-2 text-sm text-[#5f5a57]">11 cartas com aplicação total ou parcial e 6 decisões relacionadas ao estudo Amazon. Os IDs preservam a rastreabilidade da matriz acadêmica.</p>
        <ul className="m-0 grid list-none gap-2 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {uxCaseStudies.map((study) => <li key={study.id}><a className="flex min-h-12 items-center gap-3 rounded-xl border border-[#c8bdb5] p-3 text-sm font-semibold no-underline hover:bg-[#f7f4ee]" href={`#caso-${study.id}`}><span className="text-[#8f3800]">{study.id}</span>{" "}{study.title}</a></li>)}
        </ul>
      </nav>
      <section id="estudos" className="section-stack scroll-mt-28" aria-labelledby="studies-title">
        <div><p className="ux-eyebrow">Antes, depois e por quê</p><h2 id="studies-title" className="ux-section-title">Estudos de caso</h2></div>
        {uxCaseStudies.map((study, index) => <article id={`caso-${study.id}`} key={study.id} className="card ux-case scroll-mt-28" aria-labelledby={`title-${study.id}`}>
          <header className="ux-case-header">
            <div><p className="ux-eyebrow">Caso {String(index + 1).padStart(2, "0")} · {study.source === "baralho" ? "Carta do baralho" : "Growth.Design · Amazon"} · {study.id}</p><h3 id={`title-${study.id}`} className="m-0 text-2xl font-bold sm:text-3xl">{study.title}</h3><p className="mb-0 mt-2 text-sm">{study.classification}</p></div>
            <span className="ux-status">{study.status === "Parcial" ? "Implementado parcialmente" : "Prática implementada"} · não avaliado</span>
          </header>
          <div className="grid gap-3 text-sm md:grid-cols-2"><p className="m-0"><strong>Etapa e decisão:</strong> {study.step}</p><p className="m-0 break-words"><strong>Local:</strong> {study.location}<br /><code>{evidenceScenes[study.scene].route}</code></p></div>
          <EvidenceComparison scene={study.scene} caseId={study.id} />
          <div className="grid gap-4 md:grid-cols-2">
            <section className="ux-note"><h4>Antes</h4><p>{study.before}</p></section>
            <section className="ux-note border-l-[#c95000]"><h4>Depois</h4><p>{study.after}</p></section>
          </div>
          <section><h4 className="m-0 text-lg font-semibold">O que mudou ou foi preservado</h4><ul className="mb-0 mt-2 grid gap-1 pl-5 text-sm">{study.changes.map((change) => <li key={change}>{change}</li>)}</ul></section>
          <div className="grid gap-5 md:grid-cols-2">
            <section className="ux-explanation"><h4>Por que esse conceito se relaciona</h4><p>{study.rationale}</p></section>
            <section className="ux-explanation"><h4>Efeito pretendido · hipótese</h4><p>{study.hypothesis}</p></section>
            <section className="ux-explanation"><h4>Autonomia e limites éticos</h4><p>{study.ethics}</p></section>
            <section className="ux-explanation"><h4>Como validar · proposta</h4><p>{study.validation}</p></section>
          </div>
          <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-[#ded6d0] pt-4">
            <Link className="button-primary" href={evidenceScenes[study.scene].route}>Experimentar no Bite <ArrowRight aria-hidden="true" size={18} /></Link>
            {study.source === "amazon" ? <a className="inline-flex min-h-11 items-center rounded-lg text-sm font-semibold underline" href="https://growth.design/case-studies/amazon-purchase-ux">Fonte: Growth.Design · Amazon Purchase UX</a> : <p className="m-0 max-w-lg text-sm text-[#5f5a57]">Referência: carta {study.id}, nomenclatura registrada no plano de rastreabilidade da disciplina. A cópia original do baralho não está versionada.</p>}
            <a className="inline-flex min-h-11 items-center rounded-lg text-sm font-semibold underline" href="#case-index-title">Voltar ao índice</a>
          </footer>
        </article>)}
      </section>
      <section className="section-stack" aria-labelledby="unapplied-title">
        <div><p className="ux-eyebrow">Limites de escopo</p><h2 id="unapplied-title" className="ux-section-title">Não implementado / fora da baseline</h2><p>Estas decisões foram analisadas e não aplicadas. Não são funcionalidades planejadas ou estudos com imagens de antes e depois.</p></div>
        <ul className="m-0 grid list-none gap-3 p-0 md:grid-cols-2">{unappliedRefinements.map((item) => <li key={item.id} className="card p-5"><h3 className="m-0 text-lg font-semibold">{item.id} · {item.title}</h3><p className="mb-0 mt-2 text-sm">{item.decision}</p><p className="mb-0 mt-2 text-sm font-semibold text-[#5f5a57]">Não implementado</p></li>)}</ul>
        <aside className="card p-5"><h3 className="m-0 text-xl font-semibold">Facebook Misinformation · pendente de fonte</h3><p className="mb-0 mt-2">Na consulta de 10/11/2026, a página pública expôs cadastro e preview. Sem acesso aos slides, nenhum insight foi atribuído ao caso e nenhuma comparação foi inventada.</p><a className="mt-2 inline-flex min-h-11 items-center rounded-lg font-semibold underline" href="https://growth.design/case-studies/facebook-misinformation">Consultar estudo original · Growth.Design</a></aside>
      </section>
      <section className="card grid gap-4 p-6 sm:p-8" aria-labelledby="evaluation-title">
        <FlaskConical aria-hidden="true" className="text-[#8f3800]" size={32} /><h2 id="evaluation-title" className="ux-section-title">Próximo passo: avaliar com pessoas</h2>
        <p className="m-0">A implementação organiza custos, consentimento e limites informacionais. Ainda não houve avaliação empírica. Uma comparação futura deve alternar a ordem das versões, manter catálogo, tarefa e dispositivo equivalentes e obter consentimento dos participantes.</p>
        <p className="m-0">Medidas propostas: conclusão da tarefa, compreensão do preço e da composição, erros e percepção de autonomia. Registrar manualmente os resultados de sessões consentidas; o aplicativo continua sem analytics ou coleta de comportamento.</p>
        <p className="m-0 text-sm text-[#5f5a57]">Equipe: Hilton Carneiro, Jamilly Santos, Hugo Vinicius e João Batista. Evidências da interface não substituem validação psicológica, teste com leitor de tela ou ficha técnica de alimentos.</p>
        <Link className="button-secondary w-fit" href="/cardapio">Explorar o cardápio</Link>
      </section>
    </div>
  );
}
