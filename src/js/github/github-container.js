import { h, render } from "preact";
import iconHtml from "../icon";

const GitHubContainer = () => (
  <section className="section github">
    <header>
      <span
        className="glyph"
        dangerouslySetInnerHTML={iconHtml("github", {
          width: 32,
          height: 32
        })}
      />
      <h2>GitHub</h2>
    </header>

    <p>
      See{" "}
      <a
        href="https://github.com/qrize/qrize"
        target="_blank"
        rel="noopener noreferrer"
      >
        https://github.com/qrize/qrize
      </a>{" "}
      for more details.
    </p>
  </section>
);

export default GitHubContainer;
