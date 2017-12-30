import { h, render } from "preact";
import iconHtml from "../icon";

const iconOptions = {
  width: 100,
  height: 100,
  "stroke-width": 1
};

const WhyQrizeContainer = () => (
  <section className="section why-qrize">
    <h2>Why qrize?</h2>
    <ul>
      <li>
        <header>
          <span
            className="glyph"
            aria-hidden="true"
            dangerouslySetInnerHTML={iconHtml("minimize", iconOptions)}
          />
          <h3>Less space</h3>
        </header>
        <p>
          With QR codes taking less space on a page you are able to accomodate
          more useful information
        </p>
      </li>
      <li>
        <header>
          <span
            className="glyph"
            aria-hidden="true"
            dangerouslySetInnerHTML={iconHtml("smartphone", iconOptions)}
          />
          <h3>Readers friendly</h3>
        </header>
        <p>
          Qrize produces QR codes with constanly low density of dots (modules)
          making them more readable by mobile devices
        </p>
      </li>
      <li>
        <header>
          <span
            className="glyph"
            aria-hidden="true"
            dangerouslySetInnerHTML={iconHtml("star", iconOptions)}
          />
          <h3>Simply awesome</h3>
        </header>
        <p>
          Given the possibility to make QR codes smaller, why would you keep
          them originaly sized?
        </p>
      </li>
    </ul>
  </section>
);

export default WhyQrizeContainer;
