import { h, render } from "preact";
import "./footer-container.scss";
import iconHtml from "../utils/icon";

const FooterContainer = () => (
  <footer class="footer">
    <section className="section">
      <p>
        Copyright © {new Date().getFullYear()}{" "}
        <a href="https://goliney.com" target="_blank" rel="noopener noreferrer">
          Sergey Goliney
        </a>
      </p>
      <p>
        QR Code is a registered trademark of{" "}
        <a
          href="https://www.qrcode.com/en/faq.html#patentH2Title"
          target="_blank"
          rel="noopener noreferrer"
        >
          DENSO WAVE INCORPORATED
        </a>.
      </p>
    </section>
  </footer>
);

export default FooterContainer;
