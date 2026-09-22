import React from 'react';
const principles = [
  {
    n: '01',
    label: 'Chose reliability',
    body: 'A year into Instanodes the backlog held two quarters of customer requests. I went back through our sales calls and separated what customers asked for from what they asked about when deciding to buy. The lists barely overlapped. Buying conversations were about uptime and what happened when a chain broke. I chose reliability, and told the customers who had asked why their requests were deferred. Demos stopped stalling, conversion improved, and two premium services became sellable.',
    aside:
      'I argued from conversation notes rather than instrumented data. I define the metric before making the case now.',
  },
  {
    n: '02',
    label: 'Shipped less',
    body: 'Vuelo was scoped as a full GenAI assistant for clinicians. I cut the first release to two capabilities, prescription generation and history summarisation, and shipped months earlier. The feedback we got from real clinical use reshaped the roadmap more usefully than another quarter of building would have.',
  },
  {
    n: '03',
    label: 'Bought instead of built',
    body: 'We needed product analytics. Building it in-house would have taken engineering off customer-facing work for a quarter. I recommended integrating existing tooling instead. Measurement went live early and the team stayed on the roadmap. Not every capability needs to be ours.',
  },
  {
    n: '04',
    label: 'Designed the incentive',
    body: 'A client exchange had a thin order book and the obvious fix was paying for market-making capacity. I designed a points-based trading competition instead. It produced $1.1M in trading volume and 1,000 to 1,500 active users inside three months, at a fraction of what liquidity provision would have cost.',
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="relative py-24 md:py-36">
      <div className="container-edge">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-9 md:col-start-3">
            <h2 className="display-lg text-foreground max-w-[16ch]">
              Four calls I'd <em className="serif text-accent">make again</em>.
            </h2>

            {/* Two columns rather than three: these are decision stories, not
                one-line principles, and they need the measure to stay readable. */}
            <ol className="mt-16 md:mt-20 grid md:grid-cols-2 gap-12 md:gap-x-14 md:gap-y-16">
              {principles.map((p) => (
                <li key={p.n}>
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="font-serif italic text-accent text-xl">{p.n}</span>
                    <span className="hairline flex-1" />
                  </div>
                  <h3 className="font-mono text-[11px] md:text-[12px] uppercase tracking-[0.16em] text-foreground/70 mb-4">
                    {p.label}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-[15px] md:text-base max-w-[52ch]">
                    {p.body}
                  </p>
                  {p.aside && (
                    <p className="mt-5 pl-4 border-l border-[var(--hairline-strong)] text-muted-foreground/90 leading-relaxed text-[14px] md:text-[15px] max-w-[50ch]">
                      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground/55">
                        What I would do differently
                      </span>
                      <br />
                      {p.aside}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
