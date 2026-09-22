import React from 'react';
const now = [
  {
    label: 'Reading',
    body: 'Tokenized treasuries and credit. BlackRock BUIDL, Ondo, and how onchain settlement is bleeding into TradFi rails.',
  },
  {
    label: 'Building',
    body:
      'Agent-to-agent payment rails for the agentic economy, built on x402. AgenticRPC turns Instanodes RPC into an endpoint an AI agent can pay for per task, in crypto, with no API key and no subscription provisioned in advance. Early, and the hard part is not the payment. It is deciding what an agent is allowed to spend without asking.',
  },
  {
    label: 'Thinking about',
    body: 'Chain abstraction is a UX problem dressed as an infra problem. Most teams ship it inside out. Also, how on-chain liquidity can move freely across chains without trading away consensus security or decentralization.',
  },
];

const NowSection = () => {
  const updated = new Date().toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });

  return (
    <section id="now" className="relative py-16 md:py-24">
      <div className="container-edge">
        <div className="grid grid-cols-12 gap-6 mb-16">
          <div className="col-span-12 md:col-span-7">
            <h2 className="display-lg text-foreground">
              What I'm on, this season.
            </h2>
          </div>
          <p className="col-span-6 md:col-span-3 md:text-right eyebrow text-muted-foreground/90">
            Updated · {updated}
          </p>
        </div>

        <div className="hairline" />
        <ul>
          {now.map((n) => (
            <li key={n.label} className="group">
              <div className="grid grid-cols-12 gap-6 py-8 md:py-10 border-b border-[var(--hairline)] transition-colors duration-300 group-hover:bg-[rgba(255,255,255,0.015)]">
                <p className="col-span-12 md:col-span-3 font-mono text-xs uppercase tracking-wider text-muted-foreground pt-1">
                  {n.label}
                </p>
                <p className="col-span-12 md:col-span-9 text-foreground/85 text-lg md:text-xl leading-relaxed max-w-[64ch]">
                  {n.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default NowSection;
