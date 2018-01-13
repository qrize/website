import { h, render } from 'preact';
import PrismCode from '../utils/prism-code';
import iconHtml from '../utils/icon';

const HowToUseContainer = () => (
  <section className="section how-to">
    <h2>How to use?</h2>

    <p>First, include qrize in your application. Qrize is available on npm:</p>
    <PrismCode className="language-sh">
      {`
        npm install --save qrize
      `}
    </PrismCode>

    <p>and CDN:</p>
    <PrismCode className="language-markup">
      {`
        <script src="https://unpkg.com/qrize/dist/qrize.umd.js"></script>
      `}
    </PrismCode>

    <p>Then include following script somewhere:</p>
    <PrismCode className="language-javascript">
      {`
        import Qrize from "qrize";

        const qrize = new Qrize({
          element: document.getElementById("qr-target")
        });
        qrize.createImg({ url: "http://example.com" });
      `}
    </PrismCode>

    <p>
      That's it. Now an element wih "qr-target" id contains tiny QR code that leads to the url you
      specified.
    </p>
  </section>
);

export default HowToUseContainer;
