import { Link } from 'react-router-dom';
import Droplet from '../Droplet';
import { External } from '../Chrome';
import { contact } from '../../data/story';

/* Nothing here waits on JavaScript to become visible. The one moment of
   motion is the drop landing on the stone. */
export default function Hero() {
  return (
    <section className="wrap hero" aria-labelledby="hero-title">
      <div className="hero__text">
        <h1 id="hero-title" className="display">
          I build what’s next before it becomes obvious.
        </h1>
        <p className="lede">
          Senior product owner at Antier Solutions in Chandigarh. Six years building platform
          infrastructure, payment rails and GenAI products.
        </p>
        <div className="actions">
          <a className="button button--primary" href={`mailto:${contact.email}`}>
            Email me
          </a>
          <Link className="link link--quiet" to="/resume">
            Resume
          </Link>
          <External href={contact.linkedin} className="link link--quiet">
            LinkedIn
          </External>
        </div>
        <p className="hero__status meta">Open to senior product roles in 2026.</p>
      </div>
      <Droplet />
    </section>
  );
}
