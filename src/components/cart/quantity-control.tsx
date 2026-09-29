import { Minus, Plus } from "lucide-react";

interface QuantityControlProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
}

export function QuantityControl({ value, onChange, label = "Quantidade" }: QuantityControlProps) {
  return (
    <div className="inline-flex items-center gap-2" aria-label={label}>
      <button className="button-secondary !size-11 !p-0" type="button" onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label="Diminuir quantidade">
        <Minus aria-hidden="true" size={20} />
      </button>
      <output className="min-w-10 text-center font-semibold" aria-live="polite" aria-label={`${value} ${value === 1 ? "unidade" : "unidades"}`}>{value}</output>
      <button className="button-secondary !size-11 !p-0" type="button" onClick={() => onChange(value + 1)} aria-label="Aumentar quantidade">
        <Plus aria-hidden="true" size={20} />
      </button>
    </div>
  );
}
