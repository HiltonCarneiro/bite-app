interface PageHeadingProps {
  title: string;
  description: string;
  eyebrow?: string;
}

export function PageHeading({ title, description, eyebrow }: PageHeadingProps) {
  return (
    <header className="grid max-w-3xl gap-2">
      {eyebrow && <p className="m-0 font-semibold text-[#a94100]">{eyebrow}</p>}
      <h1 className="m-0 text-3xl font-bold leading-tight sm:text-4xl">{title}</h1>
      <p className="m-0 text-[#5f5a57]">{description}</p>
    </header>
  );
}
