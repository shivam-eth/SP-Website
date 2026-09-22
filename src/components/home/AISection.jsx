import React from 'react';
// What that actually looks like in shipped work
const inPractice = [
  {
    k: 'Agentic workflows',
    headline: '350+ proposals, auto-generated',
    body: 'Autonomous n8n + Notion agents that draft client proposals, docs, and research end-to-end.',
  },
  {
    k: 'AI-assisted delivery',
    headline: 'Shipped a platform site with Claude Code',
    body: 'Rebuilt and deployed the Instanodes platform front-to-back using Claude Code and Codex.',
  },
  {
    k: 'Applied GenAI',
    headline: 'Vuelo · GenAI healthcare assistant',
    body: 'LLM evaluation, conversational UX, guardrails, and safe-response design for sensitive health topics.',
  },
];

const models = ['GPT', 'Claude', 'Grok', 'Llama', 'Amazon Bedrock'];
const tools = ['Claude Code', 'Codex', 'Windsurf', 'Bolt', 'v0', 'n8n', 'Notion'];

const AISection = () => {
  return (
    <section id="ai" className="relative py-14 md:py-20">
      <div className="container-edge">
        {/* Heading */}
        <div className="grid grid-cols-12 gap-6 mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-9 md:col-start-3">
            <h2 className="display-lg text-foreground max-w-[16ch]">
              AI that earns its place.
            </h2>
            <p className="mt-8 text-muted-foreground max-w-[56ch] text-lg leading-relaxed">
              I don't bolt AI on for show. I use it to compress the slow, repetitive parts of
              product work, so the thinking gets more of the week.
            </p>
          </div>
        </div>

        {/* In practice */}
        <div>
          <p className="eyebrow mb-8 md:mb-10">In practice</p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {inPractice.map((p) => (
              <li key={p.k}>
                <div className="flex items-baseline gap-3 mb-5">
                  <span className="font-mono text-[12px] md:text-[13px] uppercase tracking-[0.12em] text-accent">
                    {p.k}
                  </span>
                  <span className="hairline flex-1" />
                </div>
                <h3 className="text-xl md:text-2xl text-foreground font-medium tracking-tight leading-snug mb-3 max-w-[20ch]">
                  {p.headline}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-[15px] max-w-[36ch]">
                  {p.body}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Models + tools */}
        <div className="mt-16 md:mt-24 grid grid-cols-12 gap-6 md:gap-10">
          <div className="col-span-12 md:col-span-6">
            <p className="eyebrow mb-5">Models evaluated</p>
            <div className="flex flex-wrap gap-x-3 gap-y-2 font-serif italic text-foreground/85 text-xl md:text-2xl">
              {models.map((m, i) => (
                <span key={m} className="flex items-center gap-3">
                  {i > 0 && <span aria-hidden className="text-muted-foreground/40">/</span>}
                  {m}
                </span>
              ))}
            </div>
          </div>

          <div className="col-span-12 md:col-span-6">
            <p className="eyebrow mb-5">AI-assisted stack</p>
            <div className="flex flex-wrap gap-x-3 gap-y-2 font-mono text-[12.5px] md:text-[13px] uppercase tracking-[0.12em] text-foreground/65">
              {tools.map((t, i) => (
                <span key={t} className="flex items-center gap-3">
                  {i > 0 && <span aria-hidden>·</span>}
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISection;
