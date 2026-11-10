import { Info } from "lucide-react";
import { optionInformation } from "@/data/product-information";
import type { MenuItem, ProductInformation as Information } from "@/types";

function AllergenText({ information }: { information?: Information }) {
  return <>{information?.allergens.length ? `Identificados na receita ilustrativa: ${information.allergens.join(", ")}. ` : "A lista de alergênicos não está confirmada. "}Informação não confirmada pelo estabelecimento; não indica ausência de outros alergênicos.</>;
}

export function ProductInformation({ item }: { item: MenuItem }) {
  const information = item.information;
  return (
    <section className="card flex min-w-0 items-start gap-3 p-4" aria-labelledby="product-information-title">
      <Info aria-hidden="true" className="mt-0.5 shrink-0 text-[#8f3800]" size={22} />
      <div className="grid min-w-0 gap-3 text-sm">
        <h2 id="product-information-title" className="m-0 text-lg font-semibold">Informações do item</h2>
        <p className="m-0 font-semibold text-[#8f3800]">{information.status === "illustrative" ? "Receita ilustrativa do protótipo" : "Composição não disponível"}</p>
        <dl className="m-0 grid gap-3">
          <div><dt className="font-semibold">Ingredientes completos</dt><dd className="m-0">{information.ingredients.length ? `${information.ingredients.join(", ")}.` : "Dados não disponíveis. Consulte o rótulo e confirme com o estabelecimento."}</dd></div>
          <div><dt className="font-semibold">Alergênicos</dt><dd className="m-0"><AllergenText information={information} /></dd></div>
        </dl>
        {information.note && <p className="m-0">{information.note}</p>}
        {item.customizationGroups.length > 0 && <>
          <p className="m-0">A lista acima descreve a receita base, antes de retiradas e adicionais. As opções abaixo são possibilidades, não escolhas já incluídas no pedido.</p>
          <details className="rounded-xl border border-[#c8bdb5] p-3">
            <summary className="flex min-h-11 cursor-pointer items-center font-semibold">Consultar composição das personalizações</summary>
            <div className="mt-3 grid gap-4">
              {item.customizationGroups.map((group) => <section key={group.id}>
                <h3 className="m-0 text-base font-semibold">{group.name}</h3>
                <ul className="m-0 mt-2 grid gap-3 pl-5">
                  {group.options.map((option) => {
                    const composition = optionInformation[option.name];
                    const isRemoval = option.name.startsWith("Sem ");
                    const isDoneness = group.id.endsWith("doneness");
                    return <li key={option.id}><strong>{option.name}:</strong> {isRemoval ? "Solicita a retirada deste ingrediente da receita base. Não garante a eliminação de alergênicos ou de contato cruzado." : isDoneness ? "Altera somente o ponto de preparo da carne; não altera a composição declarada." : <>{composition ? `${composition.ingredients.join(", ")}. ` : "Composição não disponível; confirme com o estabelecimento. "}<AllergenText information={composition} />{composition?.note && ` ${composition.note}`}</>}</li>;
                  })}
                </ul>
              </section>)}
            </div>
          </details>
        </>}
        <p className="m-0 border-t border-[#ded6d0] pt-3">As receitas são exemplos acadêmicos, sem validação de cozinha ou rótulo. Pode haver contato cruzado no preparo. Em caso de alergia, confirme ingredientes, substituições e condições de preparo com o estabelecimento antes de consumir. Retirar um ingrediente não torna o item seguro para alérgicos.</p>
      </div>
    </section>
  );
}
