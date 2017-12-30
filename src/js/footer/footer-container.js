import { h, render } from "preact";
import iconHtml from "../icon";

const FooterContainer = () => (
  <footer class="footer">
    <section className="section">
      <p>
        Copyright © {new Date().getFullYear()}{" "}
        <a href="http://goliney.com" target="_blank" rel="noopener noreferrer">
          Sergey Goliney
        </a>
      </p>
      <p>QR Code is a registered trademark of DENSO WAVE INCORPORATED.</p>
      <p>
        <a
          href="http://www.qrcode.com/en/faq.html#patentH2Title"
          target="_blank"
          rel="noopener noreferrer"
        >
          http://www.qrcode.com/en/faq.html#patentH2Title
        </a>
      </p>
    </section>
  </footer>
);

export default FooterContainer;
