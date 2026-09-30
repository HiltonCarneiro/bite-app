function LoadingStatus({ children }: { children: string }) {
  return <span className="sr-only">{children}</span>;
}

function SkeletonLine({ className = "" }: { className?: string }) {
  return <span className={`skeleton block h-4 rounded-full ${className}`} />;
}

export function PageLoadingSkeleton() {
  return (
    <div className="container-page page-section section-stack" role="status" aria-live="polite">
      <LoadingStatus>Carregando conteúdo…</LoadingStatus>
      <div className="grid max-w-2xl gap-3" aria-hidden="true">
        <SkeletonLine className="w-24" />
        <SkeletonLine className="h-10 w-3/4" />
        <SkeletonLine className="w-full" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
        {Array.from({ length: 3 }, (_, index) => (
          <div className="card overflow-hidden" key={index}>
            <div className="skeleton aspect-[4/3]" />
            <div className="grid gap-3 p-4">
              <SkeletonLine className="h-6 w-2/3" />
              <SkeletonLine className="w-full" />
              <SkeletonLine className="w-1/3" />
              <div className="skeleton h-12 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MenuLoadingSkeleton() {
  return (
    <div className="section-stack" role="status" aria-live="polite">
      <LoadingStatus>Carregando cardápio…</LoadingStatus>
      <div className="card grid gap-4 p-4 sm:p-6" aria-hidden="true">
        <SkeletonLine className="h-6 w-48" />
        <div className="skeleton h-12 rounded-xl" />
        <div className="flex gap-2 overflow-hidden">
          {Array.from({ length: 5 }, (_, index) => <span className="skeleton h-11 w-28 shrink-0 rounded-full" key={index} />)}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
        {Array.from({ length: 3 }, (_, index) => (
          <div className="card overflow-hidden" key={index}>
            <div className="skeleton aspect-[4/3]" />
            <div className="grid gap-3 p-4"><SkeletonLine className="h-6 w-2/3" /><SkeletonLine /><SkeletonLine className="w-1/3" /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CartLoadingSkeleton() {
  return (
    <div className="grid gap-4" role="status" aria-live="polite">
      <LoadingStatus>Carregando seu carrinho…</LoadingStatus>
      {Array.from({ length: 2 }, (_, index) => (
        <div className="card grid gap-4 p-4 sm:grid-cols-[8rem_1fr]" aria-hidden="true" key={index}>
          <div className="skeleton aspect-square rounded-xl" />
          <div className="grid content-start gap-3"><SkeletonLine className="h-6 w-1/2" /><SkeletonLine className="w-2/3" /><SkeletonLine className="w-full" /></div>
        </div>
      ))}
    </div>
  );
}

export function OptionsLoadingSkeleton({ label = "Carregando opções do produto…" }: { label?: string }) {
  return (
    <div className="grid gap-4" role="status" aria-live="polite">
      <LoadingStatus>{label}</LoadingStatus>
      {Array.from({ length: 2 }, (_, index) => (
        <div className="card grid gap-4 p-4" aria-hidden="true" key={index}>
          <SkeletonLine className="h-6 w-1/2" />
          <SkeletonLine className="w-3/4" />
          <div className="grid gap-3 sm:grid-cols-2"><div className="skeleton h-20 rounded-xl" /><div className="skeleton h-20 rounded-xl" /></div>
        </div>
      ))}
    </div>
  );
}

export function ListLoadingSkeleton({ label = "Carregando lista…" }: { label?: string }) {
  return (
    <div className="grid gap-4" role="status" aria-live="polite">
      <LoadingStatus>{label}</LoadingStatus>
      {Array.from({ length: 3 }, (_, index) => (
        <div className="card grid gap-3 p-5" aria-hidden="true" key={index}>
          <SkeletonLine className="h-6 w-1/2" /><SkeletonLine className="w-2/3" /><SkeletonLine className="w-1/3" />
        </div>
      ))}
    </div>
  );
}
