import { render, screen, within } from "@testing-library/react";
import Page from "@/app/academico/refinamento/page";
import { uxCaseStudies, evidenceScenes } from "@/data/ux-case-studies";

it("oferece índice, comparações e destinos reais para todos os casos", () => {
  render(<Page />);
  expect(screen.getByRole("heading", { level: 1, name: "Refinamento responsável de UX" })).toBeInTheDocument();
  const index = screen.getByRole("navigation", { name: "Índice dos casos implementados" });
  for (const study of uxCaseStudies) {
    const article = document.getElementById(`caso-${study.id}`)!;
    expect(within(index).getByRole("link", { name: `${study.id} ${study.title}` })).toHaveAttribute("href", `#caso-${study.id}`);
    expect(within(article).getByRole("link", { name: /Experimentar no Bite/ })).toHaveAttribute("href", evidenceScenes[study.scene].route);
    expect(within(article).getByRole("link", { name: `Ampliar imagem Antes · ${study.id} (nova aba)` })).toHaveAttribute("target", "_blank");
    expect(within(article).getByRole("heading", { name: "Como validar · proposta" })).toBeInTheDocument();
    expect(within(article).getByText(/não avaliado/)).toBeInTheDocument();
  }
  expect(screen.getByRole("heading", { name: "Não implementado / fora da baseline" })).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Facebook Misinformation · pendente de fonte" })).toBeInTheDocument();
});
