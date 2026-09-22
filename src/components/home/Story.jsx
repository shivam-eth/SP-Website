import { Call, Claim } from '../Chrome';
import { chapters, intro, lately, oneMoreCall } from '../../data/story';

function Block({ block }) {
  if (block.call) {
    return (
      <Claim notes={block.notes}>
        <Call {...block.call} level={4} />
      </Claim>
    );
  }
  return <Claim parts={block.parts} notes={block.notes} />;
}

export default function Story() {
  const updated = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <section id="work" className="wrap section section--story" aria-labelledby="work-title">
      <div className="section__head">
        <h2 id="work-title" className="h2">
          The work so far
        </h2>
        <p className="prose">{intro}</p>
      </div>

      <div className="chapters">
        {chapters.map((c) => (
          <article key={c.id} id={c.id} aria-labelledby={`${c.id}-title`}>
            <h3 id={`${c.id}-title`} className="h2 chapter__title">
              {c.title}
            </h3>
            {c.blocks.map((b, i) => (
              <Block key={i} block={b} />
            ))}
          </article>
        ))}
      </div>

      <div className="claim" style={{ marginTop: 'clamp(3rem, 2rem + 3vw, 4.5rem)' }}>
        <Call title={oneMoreCall.title} body={[oneMoreCall.body]} />
      </div>

      <div className="lately" aria-label="Lately">
        {lately.map((l) => (
          <div className="lately__item" key={l.label}>
            <h3 className="h3">{l.label}</h3>
            <p>{l.body}</p>
          </div>
        ))}
        <p className="lately__stamp meta">Updated {updated}</p>
      </div>
    </section>
  );
}
