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
      Go to{" "}
      <a
        href="https://github.com/qrize/qrize"
        target="_blank"
        rel="noopener noreferrer"
      >
        https://github.com/qrize/qrize
      </a>{" "}
      if you need more details or have a question.
    </p>
  </section>
);

export default GitHubContainer;
