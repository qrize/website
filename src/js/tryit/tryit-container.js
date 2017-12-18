import { h, Component } from "preact";
import TryItForm from "./tryit-form";

const TryItContainer = () => (
  <section className="try-it">
    <h1>
      <strong>QR code</strong> and <strong>URL shortener</strong> got married.
    </h1>
    <p>
      Generate <strong>tiny QR codes</strong> for your web-pages. Check it out:
    </p>
    <TryItForm />
  </section>
);

export default TryItContainer;
