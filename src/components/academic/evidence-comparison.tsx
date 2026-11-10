import Image from "next/image";
import { Expand } from "lucide-react";
import evidence from "@/data/ux-evidence.json";
import { evidenceScenes, type EvidenceScene } from "@/data/ux-case-studies";

export function EvidenceComparison({ scene, caseId }: { scene: EvidenceScene; caseId: string }) {
  const config = evidenceScenes[scene];
  return <div className="grid gap-4 md:grid-cols-2">
    {(["antes", "depois"] as const).map((phase) => {
      const capture = evidence[scene][phase];
      const label = phase === "antes" ? "Antes" : "Depois";
      return <figure key={phase} className="m-0 min-w-0 overflow-hidden rounded-xl border border-[#c8bdb5]">
        <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f7f4ee] px-4 py-3"><strong>{label}</strong><span className="text-sm">{phase === "antes" ? "Captura histórica autêntica" : "Captura real da entrega"}</span></div>
        <a className="block bg-[#eee8df] p-3" href={capture.path} target="_blank" rel="noreferrer" aria-label={`Ampliar imagem ${label} · ${caseId} (nova aba)`}>
          <Image className="h-80 w-full object-contain sm:h-96" src={capture.path} alt={`${label}: ${config.label}. ${capture.note}`} width={capture.viewport.width} height={capture.viewport.height} unoptimized />
          <span className="mt-2 flex min-h-11 items-center justify-center gap-2 text-sm font-semibold underline"><Expand aria-hidden="true" size={18} />Ampliar imagem · nova aba</span>
        </a>
        <figcaption className="grid gap-2 p-4 text-sm">
          <span>{config.label}. {capture.note}</span>
          <details><summary className="min-h-11 cursor-pointer font-semibold">Origem e condições da captura</summary><dl className="m-0 mt-2 grid gap-2 break-words"><div><dt className="font-semibold">Versão</dt><dd className="m-0">{capture.version.slice(0, 7)}{phase === "depois" ? " + alterações locais da entrega" : " · Git histórico"}</dd></div><div><dt className="font-semibold">Rota e viewport</dt><dd className="m-0">{capture.route} · {capture.viewport.width} × {capture.viewport.height} px</dd></div><div><dt className="font-semibold">Capturada em</dt><dd className="m-0">{new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short", timeZone: "America/Fortaleza" }).format(new Date(capture.capturedAt))}</dd></div><div><dt className="font-semibold">Estado</dt><dd className="m-0">{capture.state}</dd></div></dl></details>
        </figcaption>
      </figure>;
    })}
  </div>;
}
