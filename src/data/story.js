/* The narrative. Every figure here already appears in the approved resume
   copy. A claim is a list of parts. A part with `mark` is the sentence the
   margin note beside it proves, and it lights up when the reader points at
   either one. */

export const intro =
  'Six years across three tracks: infrastructure other teams build on, money that has to arrive, and models that have to know when to stop. They are turning into one product.';

export const chapters = [
  {
    id: 'infrastructure',
    title: 'Infrastructure people build on',
    blocks: [
      {
        parts: [
          'I took Instanodes from zero. It gives teams RPC, node, validator and rollup infrastructure across 50+ networks, so they can ship without running their own. ',
          { mark: 'Its 82 enterprise customers include exchanges, wallets and dApps.' },
        ],
        notes: [
          { figure: '82', label: 'enterprise customers' },
          { figure: '50+', label: 'networks supported' },
        ],
      },
      {
        parts: [
          { mark: 'It handles 600 to 700 million API requests a day and holds 99.95% uptime.' },
          ' I make the API design calls on endpoints, schemas, authentication and error handling, and I maintain the Swagger docs and Postman collections customers integrate against.',
        ],
        notes: [
          { figure: '600-700M', label: 'API requests a day' },
          { figure: '99.95%', label: 'uptime' },
        ],
      },
      {
        parts: [
          { mark: 'Dedicated Clusters and one-click private chains now add over $250K in quarterly recurring revenue.' },
        ],
        notes: [{ figure: '$250K+', label: 'quarterly recurring revenue' }],
      },
      {
        call: {
          title: 'Chose reliability',
          body: [
            'A year into Instanodes the backlog held two quarters of customer requests. I went back through our sales calls and separated what customers asked for from what they asked about when deciding to buy. The lists barely overlapped. Buying conversations were about uptime and what happened when a chain broke. I chose reliability, and told the customers who had asked why their requests were deferred. Demos stopped stalling, conversion improved, and two premium services became sellable.',
          ],
          retro:
            'I argued from conversation notes rather than instrumented data. I define the metric before making the case now.',
        },
      },
      {
        parts: [
          'At 5irechain, a Rust-based Layer-1, I owned staking, governance, bridge and wallets from testnet to mainnet. ',
          { mark: 'The first month recorded 10M+ transactions across validator operations, ecosystem partners, developer testing and campaign activity.' },
          ' It taught me to define retention before a launch, not read headline counts after it.',
        ],
        notes: [{ figure: '10M+', label: 'first-month transactions, all sources' }],
      },
    ],
  },
  {
    id: 'money',
    title: 'Money that has to arrive',
    blocks: [
      {
        parts: [
          'I ship payment products: gateway and Stripe integrations, invoicing flows and crypto payment rails. ',
          { mark: "I integrated Circle's Cross-Chain Transfer Protocol, so USDC moves between chains as native USDC." },
        ],
        notes: [{ plain: 'Circle CCTP', label: 'native USDC across chains' }],
      },
      {
        call: {
          title: 'Designed the incentive',
          body: [
            'A client exchange had a thin order book and the obvious fix was paying for market-making capacity. I designed a points-based trading competition instead. It produced $1.1M in trading volume and 1,000 to 1,500 active users inside three months, at a fraction of what liquidity provision would have cost.',
          ],
        },
        notes: [
          { figure: '$1.1M', label: 'trading volume' },
          { figure: '1,000-1,500', label: 'active users in three months' },
        ],
      },
      {
        parts: [
          'At Blockmaze I led product for tokenizing real-world assets: gold, bonds and equities. ',
          { mark: 'I designed issuer and investor onboarding, DAO governance and KYC/KYB for India, the UAE and the US.' },
        ],
        notes: [{ figure: '3', label: 'markets: India, UAE and the US' }],
      },
    ],
  },
  {
    id: 'models',
    title: 'Models that know when to stop',
    blocks: [
      {
        parts: [
          'At Vuelo, a GenAI product for clinicians, ',
          { mark: 'I evaluated GPT, Claude, Grok, Llama and Bedrock on quality, safety and cost.' },
          ' Then I defined what the model answers alone, where a clinician reviews, and how it behaves when it is unsure.',
        ],
        notes: [{ figure: '5', label: 'model families evaluated' }],
      },
      {
        call: {
          title: 'Shipped less',
          body: [
            'Vuelo was scoped as a full GenAI assistant for clinicians. I cut the first release to two capabilities, prescription generation and history summarisation, and shipped months earlier. The feedback we got from real clinical use reshaped the roadmap more usefully than another quarter of building would have.',
          ],
        },
        notes: [{ figure: '2', label: 'capabilities in the first release' }],
      },
    ],
  },
  {
    id: 'agents',
    title: 'Where they meet',
    blocks: [
      {
        parts: [
          'AgenticRPC is what I am building now. ',
          { mark: 'It turns Instanodes RPC into an endpoint an AI agent can pay for per task, in crypto, with no API key and no subscription provisioned in advance.' },
          ' It runs on x402.',
        ],
        notes: [{ plain: 'No numbers yet', label: 'It is early.' }],
      },
      {
        parts: [
          'It needs all three tracks at once: infrastructure to serve the request, a rail to settle the payment, and a model deciding whether to spend. ',
          { mark: 'The hard part is deciding what an agent is allowed to spend without asking.' },
        ],
      },
    ],
  },
];

export const oneMoreCall = {
  title: 'Bought instead of built',
  body: 'We needed product analytics. Building it in-house would have taken engineering off customer-facing work for a quarter. I recommended integrating existing tooling instead. Measurement went live early and the team stayed on the roadmap. Not every capability needs to be ours.',
};

export const lately = [
  {
    label: 'Reading',
    body: 'Tokenized treasuries and credit. BlackRock BUIDL, Ondo, and how onchain settlement is bleeding into TradFi rails.',
  },
  {
    label: 'Thinking about',
    body: 'Chain abstraction is a UX problem dressed as an infra problem. Most teams ship it inside out. Also, how on-chain liquidity can move freely across chains without trading away consensus security or decentralization.',
  },
];

export const build = [
  {
    parts: [
      'I build with Claude Code and Codex rather than waiting on engineering capacity. ',
      { mark: 'I rebuilt and shipped the Instanodes platform site that way, front to back.' },
    ],
  },
  {
    parts: [
      { mark: 'Autonomous n8n and Notion agents draft our client proposals, docs and research.' },
      ' The tools I reach for most are Claude Code, Codex, Windsurf, Bolt, v0, n8n and Notion.',
    ],
    notes: [{ figure: '350+', label: 'client proposals drafted by agents' }],
  },
];

export const index = [
  { name: 'Instanodes', what: 'Took a multi-chain infrastructure platform from zero: RPC, node, validator and rollup as a service', when: '2024 to now', href: 'https://www.instanodes.io/', host: 'instanodes.io' },
  { name: 'AgenticRPC', what: 'Agent-to-agent payments on x402, built on Instanodes RPC', when: 'Now' },
  { name: 'Vuelo', what: 'Led product for a GenAI assistant for clinicians', when: '2024' },
  { name: 'Blockmaze', what: 'Tokenization of gold, bonds and equities, with KYC/KYB in three markets', when: '2024', href: 'https://blockmaze.org/', host: 'blockmaze.org' },
  { name: 'Qubetics', what: 'Product flows for chain abstraction, validator roles, staking and early dVPN', when: '2024', href: 'https://www.qubetics.com/', host: 'qubetics.com' },
  { name: '5irechain', what: 'Staking, governance, bridge and wallets, testnet to mainnet', when: '2022 to 2025', href: 'https://5ire.org', host: '5ire.org' },
  { name: 'Tomi', what: 'Dashboard for usage, billing, developer APIs and lifecycle of decentralized storage', when: '2023', href: 'https://tomi.com/storage', host: 'tomi.com' },
  { name: 'Payments', what: 'Gateway and Stripe integrations, invoicing, crypto rails and Circle CCTP' },
  { name: 'BlockDAG', what: 'Reworked onboarding and mining UX. v2 shipped with a ~35% lift in app installs', href: 'https://blockdag.network/', host: 'blockdag.network' },
  { name: 'Vine Labs', what: 'Cross-chain modules for metaverse applications', href: 'https://www.vinelayer0.com/', host: 'vinelayer0.com' },
];

export const contact = {
  email: 'shivampan98@gmail.com',
  linkedin: 'https://linkedin.com/in/shivam-sot',
  x: 'https://x.com/ShivamPandiya3',
};
