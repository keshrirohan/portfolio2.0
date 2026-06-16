import { ArrowRight, Database, Layers3, ShieldCheck, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#1d1d1b]">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-between px-6 py-8 sm:px-10 lg:px-12">
        <nav className="flex items-center justify-between gap-6">
          <span className="text-sm font-semibold uppercase tracking-[0.18em]">
            Portfolio
          </span>
          <a
            href="/api/health"
            className="inline-flex size-10 items-center justify-center rounded-full border border-[#1d1d1b]/15 bg-white text-[#1d1d1b] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            aria-label="Open health API"
            title="Open health API"
          >
            <ShieldCheck className="size-4" />
          </a>
        </nav>

        <div className="grid gap-10 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-[#6f604b]">
              <Sparkles className="size-4" />
              Full-stack Next.js starterassssssssssssssssssss
            </p>
            <h1 className="text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
              Build your portfolio with a MongoDB-ready foundation.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5f5b52]">
              TypeScript, Tailwind CSS, API routes, validation, MongoDB, and
              frontend utilities are already wired together.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/api/health"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#1d1d1b] px-5 text-sm font-semibold text-white transition hover:bg-[#34342f]"
              >
                Check API
                <ArrowRight className="size-4" />
              </a>
              <a
                href="https://nextjs.org/docs"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-md border border-[#1d1d1b]/15 bg-white px-5 text-sm font-semibold transition hover:border-[#1d1d1b]/30"
              >
                Next.js Docs
              </a>
            </div>
          </div>

          <div className="grid gap-3">
            {[
              {
                icon: Layers3,
                title: "Frontend",
                text: "App Router, React 19, Tailwind CSS 4, icons, forms, and class utilities.",
              },
              {
                icon: Database,
                title: "Backend",
                text: "API routes, Zod request validation, and the official MongoDB driver.",
              },
              {
                icon: ShieldCheck,
                title: "Quality",
                text: "ESLint, TypeScript strict mode, Prettier, and environment examples.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-md border border-[#1d1d1b]/10 bg-white p-5 shadow-sm"
              >
                <item.icon className="mb-4 size-5 text-[#8a5a2b]" />
                <h2 className="text-base font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#625f57]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
