import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <section className="card grid justify-items-center gap-3 p-8 text-center" aria-labelledby="empty-title">
      <span className="grid size-14 place-items-center rounded-full bg-[#f7e5d7]"><Icon aria-hidden="true" /></span>
      <h2 id="empty-title" className="m-0 text-2xl font-bold">{title}</h2>
      <p className="m-0 max-w-xl text-[#5f5a57]">{description}</p>
      {action}
    </section>
  );
}
